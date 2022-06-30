import d3Legend from 'd3-svg-legend';

/**
 * Sets up the space where the area chart will be drawn
 * @param {number} width The width of the graph
 * @param {number} height The heigh of the graph
 */
export function setupAreaSVG(width, height) {
  const svg = d3
    .select('#area-svg')
    .attr('width', width + 80)
    .attr('height', height + 80);

  addTitle(svg, width);
}

/**
 * Adds a title to the area chart
 * @param {*} g The d3 selection of the graph's g SVG element
 * @param {number} width The width of the graph
 */
function addTitle(g, width) {
  g.append('text')
    .attr('class', 'graph-title')
    .attr('x', width / 2 + 30)
    .attr('y', 15)
    .text('Comptes pendant la journée');
}

/**
 * Adds the labels to the X and Y axes
 * @param {*} g The d3 selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
function addLabels(g, width, height) {
  // X label
  g.append('g')
    .append('text')
    .attr('class', 'axis-label')
    .text('Heures de la journée')
    .attr('x', width / 2 + 30)
    .attr('y', height);
  // Y label
  g.append('g')
    .append('text')
    .attr('class', 'axis-label')
    .text('Comptes')
    .attr('x', 10)
    .attr('y', height / 2)
    .attr('transform', 'rotate(-90)');
}

/**
 * Generates the X scale of the area chart based on the hours of the day
 * @param {number} width The width of the graph
 * @returns {*} The generated X scale
 */
function generateXScale(width) {
  return d3.scaleLinear().domain([0, 96]).range([0, width]);
}

/**
 * Generated the Y scale of the area chart based on the maximum value
 * @param {number} height The height of the graph
 * @param {number[]} counts List of counts for the hours of the day
 * @returns 
 */
function generateYScale(height, counts) {
  return d3
    .scaleLinear()
    .domain([0, d3.max(counts)])
    .range([height, 0])
    .nice();
}

/**
 * Generates a color scale to differenciate the average from the specific counter
 * @param {object[]} counterData The data of the selected counter
 * @returns {*} The generated color scale
 */
function generateColorScale(counterData) {
  return d3
    .scaleOrdinal()
    .domain(
      counterData
        ? ['Moyenne du réseau', counterData.name]
        : ['Moyenne du réseau'],
    )
    .range(counterData ? ['#9a9a9a', '#f7ad63'] : ['#9a9a9a']);
}

/**
 * Adds the axes to the graph
 * @param {*} g The d3 selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {*} yScale The Y scale to be used for the graph
 */
function addAxes(g, width, height, yScale) {
  // Create X axis with 24 hr time
  const xAxis = d3
    .axisBottom(
      d3
        .scaleTime()
        .range([0, width - 7])
        .nice(),
    )
    .ticks(20)
    .tickFormat(d3.timeFormat('%H:%M'));

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(59,' + height + ')')
    .call(xAxis);
  g.attr('class', 'axis')
    .append('g')
    .attr('transform', 'translate(59,0)')
    .call(d3.axisLeft(yScale));
}

/**
 * Draws the area chart
 *
 * @param {object[]} data The data for the area chart
 * @param {*} callback The callback to call on circle click
 */
export function drawAreaChart(width, height, averageData, counterData) {
  const svg = d3.select('#area-svg').attr('height', height + 80);

  // Reset area chart svg
  svg.selectAll('g').remove();

  // Add labels
  addLabels(svg, width + 80, height + 70, counterData && counterData.name);

  const outerG = svg
    .append('g')
    .attr('width', width + 30)
    .attr('height', height + 20)
    .attr('transform', 'translate(10, 30)');

  // Generate scales
  const xScale = generateXScale(width);
  const yScale = generateYScale(height, [
    ...averageData.counts.map((v) => v.value),
    ...(counterData ? counterData.counts.map((v) => v.value) : []),
  ]);

  // Add axes
  addAxes(outerG, width, height, yScale);

  // Draw the legend
  const colorScale = generateColorScale(counterData);
  const legend = d3Legend.legendColor().scale(colorScale).shape('rect');
  outerG.append('g').attr('transform', 'translate(640, -30)').call(legend);

  const innerG = outerG
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(60, 0)');

  // Draw chart
  innerG
    .append('path')
    .datum(averageData.counts)
    .attr('fill', '#c9c9c9')
    .attr('stroke', '#9a9a9a')
    .attr('stroke-width', 1)
    .attr(
      'd',
      d3
        .area()
        .x(function (d) {
          return xScale(d.index);
        })
        .y0(height)
        .y1(function (d) {
          return yScale(d.value);
        }),
    );

  if (counterData) {
    innerG
      .append('path')
      .datum(counterData.counts)
      .attr('fill', 'rgba(252, 189, 126, 0.5)')
      .attr('stroke', '#f58516')
      .attr('stroke-width', 1)
      .attr(
        'd',
        d3
          .area()
          .x(function (d) {
            return xScale(d.index);
          })
          .y0(height)
          .y1(function (d) {
            return yScale(d.value);
          }),
      );
  }
}

export function hideAreaChart(width) {
  const svg = d3.select('#area-svg').attr('height', 130);

  svg.selectAll('g').remove();

  svg
    .append('g')
    .append('text')
    .attr('class', 'empty-label')
    .text("Cette donnée n'est pas disponible pour l'année choisie.")
    .attr('x', width / 2 + 30)
    .attr('y', 80);
}
