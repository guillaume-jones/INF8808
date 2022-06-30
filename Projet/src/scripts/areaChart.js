import d3Legend from 'd3-svg-legend';

export function setupAreaSVG(width, height) {
  const svg = d3
    .select('#area-svg')
    .attr('width', width + 80)
    .attr('height', height + 80);

  addTitle(svg, width);
}

function addTitle(g, width) {
  g.append('text')
    .attr('class', 'graph-title')
    .attr('x', width / 2 + 30)
    .attr('y', 15)
    .text('Comptes pendant la journée');
}

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

function generateXScale(width) {
  return d3.scaleLinear().domain([0, 96]).range([0, width]);
}

function generateYScale(height, counts) {
  return d3
    .scaleLinear()
    .domain([0, d3.max(counts)])
    .range([height, 0])
    .nice();
}

function generateColorScale(counterData) {
  return d3
    .scaleOrdinal()
    .domain(['Moyenne des bornes', 'Moyenne de ' + counterData.name])
    .range(['#9a9a9a', '#f7ad63']);
}

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
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
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
