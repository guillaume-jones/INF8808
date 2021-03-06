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
    const neighborhood = line.Arrond_Nom
    const year = line.Date_Plantation.getFullYear()

    // Attempts to add to an existing count
    const yearAndArrond = JSON.stringify([neighborhood, year])
    if (countsObject[yearAndArrond]) {
      countsObject[yearAndArrond].Comptes += 1
    } else {
    // Otherwise, creates a new object for that neighborhood and year
      countsObject[yearAndArrond] = {
        Arrond_Nom: neighborhood,
        Plantation_Year: year,
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
  const allPossibleData = neighborhoods.flatMap((neighborhood) => {
    return range(start, end).map((year) => [neighborhood, year])
  })

  allPossibleData.forEach(([neighborhood, year]) => {
    // Adds 0 count if it cannot find the item in existing dataset
    if (!data.find((item) => item.Plantation_Year === year && item.Arrond_Nom === neighborhood)) {
      data.push({
        Arrond_Nom: neighborhood,
        Plantation_Year: year,
        Comptes: 0
      })
    }
  })

  return data
}
