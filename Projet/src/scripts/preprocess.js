import { convertCoordinatesToXY, determineNeighborhood } from './geography';

/** Computes the sum of an input array, using an optional key to get values
 *
 * @param {number[]} a The array
 * @param {*} key Empty values in the input array
 * @returns
 */
function sum(a, key = '') {
  if (key) {
    a = a.map((a) => a[key]);
  }
  return a.reduce((b, c) => b + (isNaN(c) ? 0 : c), 0);
}

/** Sums an array by grouping according to the given key.
 * Accepts a second key as the property that should be summed.
 *
 * @param {number[]} a The array
 * @param {*} key
 * @param {*} key2
 * @returns
 */
function groupSum(a, key, key2) {
  return a.reduce((b, c) => {
    b[c[key]] = (b[c[key]] || 0) + (isNaN(c[key2]) ? 0 : c[key2]);
    return b;
  }, {});
}

/** Load counter CSVs
 *
 * @param {number[]} years Array of years to load
 *
 * @returns {object[]} Array of data by year
 */
export async function getCounterData(years) {
  const counterData = {};
  // Required due to asynchronous loop
  await Promise.all(
    years.map(async (year) => {
      counterData[year] = await d3.csv('comptage_velo_' + year + '.csv');
    }),
  );

  return counterData;
}

/** Load location CSV
 *
 * @returns {object} Location data
 */
export async function getLocationData() {
  return await d3.csv('localisation_des_compteurs_velo.csv');
}

/** Convert location and counter data into usable dataset
 *
 * Filters out partial data
 * Harmonizes IDs and names
 * Organizes by year, counter name, date and time
 *
 * @param {object} locations Location data from CSV
 * @param {object[]} counters Counter data from CSV
 * @param {object} years Years of data loaded into counters
 *
 * @returns {object[]} The filtered and combined dataset
 */
export function createDataset(locations, counters, years, montreal) {
  const dataset = {};

  years.forEach((year) => {
    const counterData = counters[year];
    dataset[year] = {};

    // Keeps only data columns
    const acceptedCounters = Object.keys(counterData[0]).filter((name) => {
      return name !== 'Date' && name !== '';
    });

    // Gets relevant data for each counter from location dataset
    acceptedCounters.forEach((name) => {
      const counter = locations.find((t) => {
        if (name.includes('compteur')) {
          // Finds via ID, for 2019-2021 datasets
          return name.includes(t.ID);
        } else {
          // Finds via name, for 2009-2018 datasets
          return t.Nom === name;
        }
      });

      dataset[year][counter.Nom] = {
        name: counter.Nom,
        longitude: counter.Longitude,
        latitude: counter.Latitude,
        neighborhood: determineNeighborhood(
          counter.Longitude,
          counter.Latitude,
          montreal,
        ),
        counts: [],
      };
    });

    // Iterates through counterData to add counts to each counter
    counterData.forEach((timestep) => {
      let date = undefined;
      let time = '00:00';

      Object.entries(timestep)
        .map(([key, value]) => {
          if (key === 'Date') {
            const dateTime = value.split(' ');
            date = dateTime[0];
            // Gets time as well for datasets after 2018
            if (dateTime.length > 1) {
              time = dateTime[1];
            }
          }
          return [key, value];
        })
        .filter(([name]) => acceptedCounters.includes(name))
        .forEach(([name, count]) => {
          if (parseInt(year) > 2018) {
            name = locations.find((t) => name.includes(t.ID)).Nom;
          }
          dataset[year][name].counts.push({
            date: date,
            time: time,
            count: parseInt(count),
          });
        });
    });
  });

  return dataset;
}

/** Generates data in format for the map
 *
 * @param {object} dataset Dataset created by createDataset
 * @param {*} montreal Pre-loaded JSON of Montreal data
 * @param {*} projection Projection used for the map
 *
 * @returns {object} Data for map
 */
export function createMapCircleData(dataset, projection) {
  const mapData = {};

  Object.entries(dataset).forEach(([year, yearData]) => {
    mapData[year] = Object.entries(yearData).map(([counter, counterData]) => {
      return {
        name: counter,
        neighborhood: counterData.neighborhood,
        counts: sum(counterData.counts, 'count'),
        ...convertCoordinatesToXY(
          counterData.longitude,
          counterData.latitude,
          projection,
        ),
      };
    });
  });

  return mapData;
}

/**
 * Creates a dataset specific to neighborhoods
 * @param {*} montreal Pre-loaded JSON of Montreal data
 * @param {object[]} mapData The data created by createMapCircleData
 * @returns {object} Neighborhodd data
 */
export function createNeighborhoodData(montreal, mapData) {
  const neighborhoodCounts = {};
  Object.entries(mapData).forEach(([year, counterList]) => {
    // Assemble counts by neighborhood
    const counts = {};
    const numCounters = {};
    counterList.forEach((counter) => {
      counts[counter.neighborhood] =
        (counts[counter.neighborhood] ?? 0) + counter.counts;
      numCounters[counter.neighborhood] =
        (numCounters[counter.neighborhood] ?? 0) + 1;
    });

    // Place into new data object with GEOJSON data
    neighborhoodCounts[year] = montreal.map((feature) => {
      const name = feature.properties.NOM;
      return {
        type: 'Feature',
        geometry: feature.geometry,
        name: name,
        averageCounts: Math.round(counts[name] / numCounters[name]) || 0,
      };
    });
  });
  return neighborhoodCounts;
}

/** Generates data in format for line chart
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 *
 * @returns {object} Data for line chart
 */
export function createLineChartData(dataset) {
  const lineChartData = {};

  Object.entries(dataset).forEach(([year, yearData]) => {
    lineChartData[year] = {};
    let averageDayCounts;

    // Sums counts across each day for each counter
    // Also adds neighborhood
    Object.entries(yearData).forEach(([counter, counterData]) => {
      let newCounts = [];

      // Years 2019-2021 need to group the data by day
      if (counterData.counts.length > 366) {
        newCounts = Object.values(
          groupSum(counterData.counts, 'date', 'count'),
        );
      } else {
        newCounts = counterData.counts.map((data) => {
          return isNaN(data.count) ? 0 : data.count;
        });
      }

      // Save this counter's data to averageDayCounts for average of year
      if (!averageDayCounts) {
        averageDayCounts = newCounts;
      } else {
        newCounts.map((count, i) => {
          averageDayCounts[i] += count;
        });
      }

      const neighborhood = counterData.neighborhood;

      // Add counts to dataset under counter
      lineChartData[year][counter] = {
        name: counter,
        neighborhood: neighborhood,
        counts: newCounts.map((v, i) => {
          return {
            index: i,
            value: v,
          };
        }),
      };

      // Add counts to corresponding neighborhood count
      const neighborhoodCounts = lineChartData[year][neighborhood];
      lineChartData[year][neighborhood] = {
        name: neighborhood,
        counts: newCounts.map((v, i) => {
          return {
            index: i,
            value:
              (neighborhoodCounts ? neighborhoodCounts.counts[i].value : 0) + v,
          };
        }),
      };
    });

    // Add average for year to dataset
    const totalCounters = Object.keys(yearData).length;

    lineChartData[year]['Average'] = {
      name: 'All',
      neighborhood: '',
      counts: averageDayCounts.map((counts, i) => {
        return { index: i, value: Math.round(counts / totalCounters) };
      }),
    };
  });

  return lineChartData;
}

/** Generates data in format for area chart
 *
 * @param {object} dataset Dataset created by createDataset
 *
 * @returns {object} Data for Area chart
 */
export function createAreaChartData(dataset) {
  const areaChartData = {};

  Object.entries(dataset).forEach(([year, yearData]) => {
    // Time data not available for years before 2019
    if (parseInt(year) < 2019) {
      return;
    }

    areaChartData[year] = {};
    let averageTimeCounts;

    // Sums counts across each day for each counter
    // Also adds neighborhood
    Object.entries(yearData).forEach(([counter, counterData]) => {
      let newCounts = Object.values(
        groupSum(counterData.counts, 'time', 'count'),
      );

      // Save this counter's data to averageTimeCounts
      if (!averageTimeCounts) {
        averageTimeCounts = newCounts;
      } else {
        newCounts.map((count, i) => {
          averageTimeCounts[i] += count;
        });
      }

      areaChartData[year][counter] = {
        name: counter,
        counts: newCounts.map((v, i) => {
          return {
            index: i,
            value: v,
          };
        }),
      };

      // Add counts to corresponding neighborhood count
      const neighborhood = counterData.neighborhood;
      const neighborhoodCounts = areaChartData[year][neighborhood];
      areaChartData[year][neighborhood] = {
        name: neighborhood,
        counts: newCounts.map((v, i) => {
          return {
            index: i,
            value:
              (neighborhoodCounts ? neighborhoodCounts.counts[i].value : 0) + v,
          };
        }),
      };
    });

    const totalCounters = Object.keys(yearData).length;

    areaChartData[year]['Average'] = {
      name: 'All',
      counts: averageTimeCounts.map((counts, i) => {
        return { index: i, value: Math.round(counts / totalCounters) };
      }),
    };
  });

  return areaChartData;
}

/** Generates data in format for bar chart
 *
 * @param {object} dataset Dataset created by createDataset
 *
 * @returns {object} Data for bar chart
 */
export function createBarChartData(dataset) {
  const barChartData = {};

  Object.entries(dataset).forEach(([year, yearData]) => {
    let allCounts = 0;

    // Sums counts across entire year for each counter
    Object.entries(yearData).forEach(([counter, counterData]) => {
      const counterSum = {
        year: year,
        counts: sum(counterData.counts, 'count'),
      };

      allCounts += counterSum.counts;

      barChartData[counter]
        ? barChartData[counter].push(counterSum)
        : (barChartData[counter] = [counterSum]);

      // Add counts per neighborhood as well
      const neighborhood = counterData.neighborhood;

      const neighborhoodDataForYear =
        barChartData[neighborhood] &&
        barChartData[neighborhood].find((d) => d.year === year);

      if (neighborhoodDataForYear) {
        neighborhoodDataForYear.counts *= neighborhoodDataForYear.total;
        neighborhoodDataForYear.counts += counterSum.counts;
        neighborhoodDataForYear.total += 1;
        neighborhoodDataForYear.counts /= neighborhoodDataForYear.total;
      } else {
        const neighborhoodSum = {
          year: year,
          counts: counterSum.counts,
          total: 1,
        };
        barChartData[neighborhood]
          ? barChartData[neighborhood].push(neighborhoodSum)
          : (barChartData[neighborhood] = [neighborhoodSum]);
      }
    });

    // Adds average of all sensors for year for default view
    const average = {
      year: year,
      counts: Math.round(allCounts / Object.keys(yearData).length),
    };

    barChartData['Average']
      ? barChartData['Average'].push(average)
      : (barChartData['Average'] = [average]);
  });

  return barChartData;
}
