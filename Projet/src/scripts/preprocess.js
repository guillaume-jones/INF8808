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

  years.forEach(async (year) => {
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

      dataset[year][name] = {
        name: counter.Nom,
        longitude: counter.Longitude,
        latitude: counter.Latitude,
        count: [],
      };
    });

    // Iterates through year's dataset to add counts to each counter
    countData.forEach((timestep) => {
      Object.entries(timestep)
        .filter(([name]) => acceptedCounters.includes(name))
        .forEach(([name, count]) => {
          dataset[year][name].count.push(count);
        });
    });
  });

  return dataset;
}

/**
 * Determines the Neighborhood of a specific counter based on its coordinates
 *
 * Inputs : x and y coordinates
 *          montreal.json
 *
 * Process :
 *  -
 *  - Transforms the coordinates in pixels
 *
 * Output : The Neighborhood in which the counter is located (string)
 *          The transformed coordinates
 */

/**
 * Transforms the coordinates of the bicycle lanes network in pixels
 *
 * Inputs : reseau_cyclable.geojson
 *
 * Process :
 *  - For each bicyle lane : Get the coordinates
 *                           Convert in pixels
 *  - Generate a map of the network
 *
 * Output : The bicyle lanes network converted in pixels
 */

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
