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
    .attr('y', height + 30)

  // Position y axis label
  g.select('.y.axis-text')
    .attr('x', -30)
    .attr('y', height / 2)
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
    .attr('r', (data) => rScale(data.Population))
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
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
  d3.selectAll('.circles')
    .transition()
    .duration(transitionDuration).ease(d3.easePoly)
    .attr('cx', (data) => xScale(data.GDP))
    .attr('cy', (data) => yScale(data.CO2))
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
