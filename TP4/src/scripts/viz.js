/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  // Position x axis label
  g.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height)
    .style('text-anchor', 'middle')

  // Position y axis label
  g.select('.y.axis-text')
    .attr('x', 0)
    .attr('y', height / 2)
    .style('text-anchor', 'middle')
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, rScale, colorScale) {
  d3.select('#graph-g')
    .selectAll('.circles')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'circles')
    .attr('fill', (data) => colorScale(data.Continent))
    .attr('cx', (data) => data.CO2 * 10)
    .attr('cy', (data) => data.CO2 * 10)
    .attr('r', (data) => rScale(data.Population))
    .style('opacity', 0.7)
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  d3.selectAll('.circles')
    .on('mouseover', function () {
      d3.select(this).style('opacity', 1).each(tip.show)
    })
    .on('mouseout', function () {
      d3.select(this).style('opacity', 0.7).each(tip.hide)
    })
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCircles (xScale, yScale, transitionDuration) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
  d3.select('#graph-g')
    .select('.title')
    .text('Data for year : ' + year)
}
