import { determineNeighborhood } from './geography';

function sum(a) {
  return a.reduce((b, c) => b + (isNaN(c) ? 0 : c));
}

/** Load the CSV data and augments with location data
 *
 * Filters out partial data
 * Organizes into a reusable object
 *
 * @returns {object[]} The filtered and combined dataset
 */
export async function createDataset() {
  const years = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021,
  ];

  const dataset = {};

  const locations = await d3.csv('localisation_des_compteurs_velo.csv');

  // Required to load all the data before returning
  await Promise.all(
    years.map(async (year) => {
      dataset[year] = {};
      const countData = await d3.csv('comptage_velo_' + year + '.csv');

      // Removes non-counter columns and columns with missing data
      const acceptedCounters = Object.keys(countData[0]).filter((name) => {
        return name !== 'Date' && name !== '' && countData[0][name] !== '';
      });

      // Creates counter objects per-year
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

      // Iterates through year's dataset to add counts to each counter
      countData.forEach((timestep) => {
        Object.entries(timestep)
          .filter(([name]) => acceptedCounters.includes(name))
          .forEach(([name, count]) => {
            if (year > 2018) {
              name = locations.find((t) => name.includes(t.ID)).Nom;
            }
            dataset[year][name].counts.push(parseInt(count));
          });
      });
    }),
  );

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
        counts: sum(counterData.counts),
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
