/**
 * Adds SVG groups for the map base, bike paths and circles
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {*} tooltip Tip to place in graph
 */
export function generateMapGroups(width, height, tooltip) {
  d3.select('#map-svg')
    .call(tooltip)
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
 * Generates the color scale for the map
 * @param {object[]} data The data used for the map
 * @returns {*} The generated color scale
 */
function generateColorScale(data) {
  const maxCounts = d3.max(data.map((d) => d.averageCounts));
  return d3
    .scaleLinear()
    .domain([0, maxCounts + 100000]) // + 100000 used for mouseover animation
    .range(['rgba(0,0,0,0)', '#063fc4']);
}

/**
 * Draws the map base of Montreal.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 */
export function drawMapBackground(mapData, cycleData, path, callback, tip) {
  const mapBase = d3.select('#map-base-g');
  const colorScale = generateColorScale(mapData);

  mapBase.selectAll('path').remove();

  mapBase
    .selectAll('path')
    .data(mapData)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', (d) => colorScale(d.averageCounts))
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1)
    .on('click', callback)
    .on('mouseover', function () {
      d3.select(this)
        .each(tip.show)
        .transition(1000)
        .ease(d3.easeCubicInOut)
        .attr('fill', (d) => colorScale(d.averageCounts + 100000))
        .attr('stroke-width', 3);
    })
    .on('mouseout', function () {
      d3.select(this)
        .each(tip.hide)
        .transition(1000)
        .ease(d3.easeCubicInOut)
        .attr('fill', (d) => colorScale(d.averageCounts))

        .attr('stroke-width', 1);
    });

  drawBikePaths(cycleData, path);
}

/**
 * Draws the cycle lanes of Montreal
 *
 * @param {object[]} data The data for the cycle lanes
 * @param {*} path The path associated with the current projection
 */
function drawBikePaths(data, path) {
  d3.select('#map-lanes-g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', 'rgba(0,0,0,0)')
    .attr('stroke', '#1ac96c')
    .attr('stroke-width', 1)
    .attr('pointer-events', 'none');
}

function generateRadiusScale(data) {
  const maxCounts = d3.max(data.map((data) => data.counts));
  return d3.scaleLinear().domain([0, maxCounts]).range([3, 9]);
}

function mouseout(scale, tip) {
  d3.select('#map-circles-g')
    .selectAll('circle')
    .filter(function () {
      return !d3.select(this).attr('clicked');
    })
    .each(tip.hide)
    .transition(500)
    .ease(d3.easeCubicInOut)
    .attr('r', (d) => scale(d.counts))
    .attr('stroke-width', 1);
}

/**
 * Draws the counter
 *
 * @param {object[]} data The data for the map
 * @param {*} callback The callback to call on circle click
 */
export function drawCircles(data, callback, tip) {
  const scale = generateRadiusScale(data);

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
    .attr('fill', '#f58516')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1)
    .on('click', function (d) {
      callback(d);

      d3.select('#map-circles-g').selectAll('circle').attr('clicked', null);
      d3.select(this).attr('clicked', true);

      mouseout(scale, tip);
    })
    .on('mouseover', function () {
      d3.select(this)
        .each(tip.show)

        .transition(500)
        .ease(d3.easeCubicInOut)
        .attr('r', (d) => scale(d.counts) * 1.5)
        .attr('stroke-width', 2);
    })
    .on('mouseout', function () {
      mouseout(scale, tip);
    });
}
