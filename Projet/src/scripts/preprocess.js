import { determineNeighborhood } from './geography';

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

      // Initialize averageDayCounts with correct length (leap years)
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
        counts: newCounts,
      };
    });

    const totalCounters = Object.keys(yearData).length;

    lineChartData[year]['Average'] = {
      name: 'All',
      neighborhood: '',
      counts: averageDayCounts.map((counts) =>
        Math.round(counts / totalCounters),
      ),
    };
  });

  return lineChartData;
}

/**
 * Generates the data for the map
 *
 * Inputs : Filtered Dataset
 *
 * Process :
 *  - Filters data for the selected year
 *  - Computes the sum of each counter for the given year
 *  - Extracts the x and y position of each counter
 *  - Determines the Neighborhood of each counter based on coordinates (calls determine neighborhood)
 *  - Extracts the name of the counter
 *
 * Output : Returns a list containing all the information for each counter on the given year
 */
