/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  const minPopulation = d3.min(
    [...data['2000'].map(d => d.Population), ...data['2015'].map(d => d.Population)])
  const maxPopulation = d3.max(
    [...data['2000'].map(d => d.Population), ...data['2015'].map(d => d.Population)])

  return d3.scaleLinear().domain([minPopulation, maxPopulation]).range([5, 20])
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  return d3.scaleOrdinal(d3.schemeCategory10).domain(data['2000'].map(d => d.Continent).sort())
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  const minGDP = d3.min(
    [...data['2000'].map(d => d.GDP), ...data['2015'].map(d => d.GDP)])
  const maxGDP = d3.max(
    [...data['2000'].map(d => d.GDP), ...data['2015'].map(d => d.GDP)])

  return d3.scaleLog().domain([minGDP, maxGDP]).range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  const minCO2 = d3.min(
    [...data['2000'].map(d => d.CO2), ...data['2015'].map(d => d.CO2)])
  const maxCO2 = d3.max(
    [...data['2000'].map(d => d.CO2), ...data['2015'].map(d => d.CO2)])

  return d3.scaleLog().domain([minCO2, maxCO2]).range([height, 0])
}
