/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
 export function getNeighborhoodNames (data) {
   return Array.from(new Set(data.map((line) => line.Arrond_Nom)))
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  return data.filter((neighborhoods) => { 
    return (
      neighborhoods.Date_Plantation.getFullYear() >= start && 
      neighborhoods.Date_Plantation.getFullYear() <= end)
  })
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  const countsObject = {}
  data.forEach((line) => {
    const arrondNom = line.Arrond_Nom
    const datePlantation = line.Date_Plantation.getFullYear()

    // Attempts to add to existing count
    const yearAndArrond = JSON.stringify([arrondNom, datePlantation])
    if (countsObject[yearAndArrond]) {
      countsObject[yearAndArrond].Comptes += 1
    } 
    // Otherwise, creates a new object for that arrondissement and year
    else {
      countsObject[yearAndArrond] = {
        Arrond_Nom: arrondNom,
        Plantation_Year: datePlantation,
        Comptes: 1
      }
    }
  })

  return Object.values(countsObject)
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  // TODO : Find missing data and fill with 0
  return []
}
