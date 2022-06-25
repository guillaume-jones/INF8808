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
    .attr('fill', '#d8dbe3')
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

function radiusScale(data) {
  const maxCounts = d3.max(data.map((data) => data.counts));
  return d3.scaleLinear().domain([0, maxCounts]).range([4, 10]);
}

/**
 * Draws the counter
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */
export function drawCircles(data, callback) {
  const scale = radiusScale(data);

  d3.select('#map-circles-g').selectAll('circle').remove();

  d3.select('#map-circles-g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('r', (d) => scale(d.counts))
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('fill', '#0461cc')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1)
    .on('click', callback);
}
