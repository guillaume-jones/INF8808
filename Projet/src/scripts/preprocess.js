import { convertCoordinatesToXY, determineNeighborhood } from './geography';

function sum(a, key = '') {
  if (key) {
    a = a.map((a) => a[key]);
  }
  return a.reduce((b, c) => b + (isNaN(c) ? 0 : c), 0);
}

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
export function createDataset(locations, counters, years) {
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

/** Generates data in format for map
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 * @param projection Projection used for the map
 *
 * @returns {object} Data for Area chart
 */
export function createMapData(dataset, montreal, projection) {
  const mapData = {};

  Object.entries(dataset).forEach(([year, yearData]) => {
    mapData[year] = Object.entries(yearData).map(([counter, counterData]) => {
      return {
        name: counter,
        neighborhood: determineNeighborhood(
          counterData.longitude,
          counterData.latitude,
          montreal,
        ),
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

/** Generates data in format for line chart
 *
 * @param {object} dataset Dataset created by createDataset
 * @param montreal Pre-loaded JSON of Montreal data
 */
export function createLineChartData(dataset, montreal) {
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
        newCounts = counterData.counts.map((data) => data.count);
      }

      // Save this counter's data to averageDayCounts
      if (!averageDayCounts) {
        averageDayCounts = newCounts;
      } else {
        newCounts.map((count, i) => {
          averageDayCounts[i] += count;
        });
      }

      lineChartData[year][counter] = {
        name: counter,
        neighborhood: determineNeighborhood(
          counterData.longitude,
          counterData.latitude,
          montreal,
        ),
        counts: newCounts.map((v, i) => {
          return {
            index: i,
            value: v,
          };
        }),
      };
    });

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
