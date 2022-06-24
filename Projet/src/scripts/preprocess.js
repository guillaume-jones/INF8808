/**
 * Load the CSVs and filters unecessary IDs and empty counters
 *
 * @returns {object[]} The filtered and combined dataset
 */
export async function createDataset() {
  // bikeData.map(rows => {
  //   rows = rows.filter(row => row.length !== 0)
  // })

  const years = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021,
  ];

  const dataset = {};

  const locations = await d3.csv('localisation_des_compteurs_velo.csv');

  console.log(locations);

  years.forEach(async (year) => {
    dataset[year] = {};
    const countData = await d3.csv('comptage_velo_' + year + '.csv');
    // console.log(countData);

    Object.keys(countData[0])
      // Removes non-counter columns
      .filter((name) => name !== 'Date' && name !== '')
      .forEach((name) => {
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
        };
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
