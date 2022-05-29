
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, data) {
  const min = Math.min(...data.map((item) => item.Comptes))
  const max = Math.max(...data.map((item) => item.Comptes))

  colorScale.domain([min, max])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects (data) {
  d3.select('#graph-g')
    .selectAll('.boxes')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'boxes')
    .append('rect')
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale (xScale, data, width, range) {
  const min = Math.min(...data.map((item) => item.Plantation_Year))
  const max = Math.max(...data.map((item) => item.Plantation_Year))
  xScale.domain(range(min, max)).range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, neighborhoodNames, height) {
  yScale.domain(neighborhoodNames.sort()).range([0, height])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale) {
  d3.select('.x.axis')
    .call(d3.axisTop(xScale)
      .tickFormat(year => `${year}`))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  d3.select('.y.axis')
    .attr('transform', 'translate(' + width + ', 0)')
    .call(d3.axisRight(yScale)
      .tickFormat(neighborhood => `${neighborhood}`))
}

/**
 * Rotates the ticks on the X axis 45 degrees towards the left.
 */
export function rotateXTicks () {
  d3.select('.x.axis')
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects (xScale, yScale, colorScale) {
  d3.selectAll('.boxes')
    .selectAll('rect')
    .attr('fill', (data) => colorScale(data.Comptes))
    .attr('x', (data) => xScale(data.Plantation_Year))
    .attr('y', (data) => yScale(data.Arrond_Nom))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
}
