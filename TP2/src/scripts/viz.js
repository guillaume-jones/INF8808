/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  scale.domain(data.map(d => d.Act)).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  const min = d3.min(data.map(d => d.Players.map(p => p.Count)), m => d3.min(m))
  const max = d3.max(data.map(d => d.Players.map(p => p.Count)), m => d3.max(m))
  scale.domain([max, min]).range([0, height])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  const act = d3.values(data).map(d => d.Act)
  d3.select('#graph-g').append('svg').append('g').attr('x', x(act))
}
/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  d3.select('#graph-g')
    .join('rect')
    .append('text')
    .text(players)
    .attr('x', xSubgroup)
    .attr('y', y)
    .attr('height', height)
    .attr('fill', color)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}
