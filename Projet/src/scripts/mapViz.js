/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize(width, height) {
  d3.select('#map').select('svg').attr('width', width).attr('height', height);
}

/**
 * Generates the SVG element g which will contain the map base.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateMapG(width, height) {
  return d3
    .select('.graph')
    .select('svg')
    .append('g')
    .attr('id', 'map-g')
    .attr('width', width)
    .attr('height', height);
}

/**
 * Draws the map base of Montreal.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 */
export function mapBackground(data, path) {
  d3.select('#map-g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#ced1c5')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1);
}
