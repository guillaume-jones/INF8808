/**
 * Adds SVG groups for the map base, bike paths and circles
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function generateMapGroups(width, height) {
  d3.select('#map-svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('id', 'map-base-g')
    .attr('width', width)
    .attr('height', height)
    .select(function () {
      return this.parentNode;
    })
    .append('g')
    .attr('id', 'map-lanes-g')
    .attr('width', width)
    .attr('height', height)
    .select(function () {
      return this.parentNode;
    })
    .append('g')
    .attr('id', 'map-circles-g')
    .attr('width', width)
    .attr('height', height);
}

/**
 * Draws the map base of Montreal.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 */
export function drawMapBackground(data, path) {
  d3.select('#map-base-g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#ced1c5')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1);
}

/**
 * Draws the cycle lanes of Montreal
 *
 * @param {object[]} data The data for the cycle lanes
 * @param {*} path The path associated with the current projection
 */
export function drawBikePaths(data, path) {
  d3.select('#map-lanes-g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', 'rgba(0,0,0,0)')
    .attr('stroke', '#0bb52d')
    .attr('stroke-width', 1.5);
}
