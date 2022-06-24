/**
 * Generates the SVG element g which will contain the map base.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG(width, height) {
  return d3
    .select('#map-svg')
    .append('g')
    .attr('id', 'line-svg')
    .attr('width', width)
    .attr('height', height);
}

/**
 * Appends an SVG g element which will contain the x axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendXAxis(g) {
  g.append('g').attr('class', 'x axis');
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendYAxis(g) {
  g.append('g').attr('class', 'y axis');
}
/**
 * Appends the labels for the x axis, the y axis and the title of the scatter graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels(g) {
  g.append('text').text("Jours de l'année").attr('class', 'x axis-text');

  g.append('text')
    .text('Comptes')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)');
}

/**
 * Creates a linear scale to map the input domain to a position in x.
 *
 * @param {number} width The width of the graph
 * @returns {*} The x scale
 */
export function updateXScale(width) {
  return d3.scaleLinear().domain([0, 100]).range([0, width]);
}

/**
 * Creates a linear scale to map the input domain to a position in y.
 *
 * @param {number} height The height of the graph
 * @returns {*} The y scale
 */
export function updateYScale(height) {
  return d3.scaleLinear().domain([0, 100]).range([height, 0]);
}

/**
 * Draws the x axis at the bottom of the line Chart.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis(xScale, height) {
  d3.select('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale).ticks(5));
}

/**
 * Draws the y axis at the left of the line chart.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis(yScale) {
  d3.select('.y.axis').call(d3.axisLeft(yScale).ticks(5));
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels(g, width, height) {
  g.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + 50);

  g.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', height / 2);

  g.select('.title')
    .attr('x', width / 2)
    .attr('y', -35);
}

/**
 * Binds the data to the line chart.
 *
 * @param {*} g  The d3 Selection of the graph's g SVG element
 * @param {object[]} data The data to use to generate the scatter plot
 */
export function drawLineChart(g, data, year, xScale, yScale) {
  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      d3
        .line()
        .x(function (d) {
          return xScale(d[year]);
        })
        .y(function (d) {
          return yScale(d[year].counts);
        }),
    );
}
