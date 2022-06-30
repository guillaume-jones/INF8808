import d3Legend from 'd3-svg-legend';

function addTitle(g, width) {
  g.append('text')
    .attr('class', 'graph-title')
    .attr('x', width / 2 + 30)
    .attr('y', 15)
    .text("Comptes avant et après l'introduction de Bixis électriques");
}

function addLabels(g, width, height) {
  // X label
  g.append('g')
    .append('text')
    .attr('class', 'axis-label')
    .text('Années')
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

function generateXScale(width, years) {
  return d3.scaleBand().padding(0.2).domain(years).range([0, width]);
}

function generateXSubScale(xScale) {
  return d3
    .scaleBand()
    .padding(0.02)
    .domain(['Average', 'Counter'])
    .range([0, xScale.bandwidth()]);
}

function generateYScale(height) {
  return d3
    .scaleLinear()
    .domain([0, 1600000]) // Highest value observed in entire dataset
    .range([height, 0])
    .nice();
}

function generateColorScale() {
  return d3
    .scaleOrdinal()
    .domain([
      'Moyenne avant BIXI',
      'Moyenne après BIXI',
      'Borne avant BIXI',
      'Borne après BIXI',
    ])
    .range(['#c9c9c9', '#9a9a9a', '#f7ad63', '#f58516']);
}

function addAxes(g, height, xScale, yScale) {
  g.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(59,' + height + ')')
    .call(d3.axisBottom(xScale));
  g.attr('class', 'axis')
    .append('g')
    .attr('transform', 'translate(59,0)')
    .call(d3.axisLeft(yScale));
}

export function setupBarSVG(width, height) {
  const svg = d3
    .select('#bar-svg')
    .attr('width', width + 80)
    .attr('height', height + 80);

  addTitle(svg, width);
}

export function drawBarChart(
  width,
  height,
  bixiYear,
  averageData,
  counterData,
) {
  const svg = d3.select('#bar-svg');

  // Reset bar chart svg
  svg.selectAll('g').remove();

  // Add labels
  addLabels(svg, width + 80, height + 70, counterData && counterData.name);

  const outerG = svg
    .append('g')
    .attr('width', width + 30)
    .attr('height', height + 20)
    .attr('transform', 'translate(10, 30)');

  // Generate scales
  const xScale = generateXScale(
    width,
    averageData.map((d) => d.year),
  );
  const xSubScale = generateXSubScale(xScale);
  const yScale = generateYScale(height, [
    ...averageData.map((v) => v.counts),
    ...(counterData ? counterData.map((v) => v.counts) : []),
  ]);

  const colorScale = generateColorScale();

  // Add axes
  addAxes(outerG, height, xScale, yScale);

  // Draw the legend
  const legend = d3Legend.legendColor().scale(colorScale).shape('rect');

  outerG.append('g').attr('transform', 'translate(740, -30)').call(legend);

  const innerG = outerG
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(60, 0)');

  // Draw chart
  innerG
    .append('g')
    .attr('id', 'average-bars')
    .selectAll('rect')
    .data(averageData)
    .enter()
    .append('rect')
    .attr('fill', (d) =>
      d.year < bixiYear
        ? colorScale('Moyenne avant BIXI')
        : colorScale('Moyenne après BIXI'),
    )
    .attr('x', (d) => xScale(d.year) + xSubScale('Average'))
    .attr('y', (d) => yScale(d.counts))
    .attr('width', xSubScale.bandwidth())
    .attr('height', (d) => height - yScale(d.counts));

  if (counterData) {
    innerG
      .append('g')
      .attr('id', 'counter-bars')
      .selectAll('rect')
      .data(counterData)
      .enter()
      .append('rect')
      .attr('fill', (d) =>
        d.year < bixiYear
          ? colorScale('Borne avant BIXI')
          : colorScale('Borne après BIXI'),
      )
      .attr('x', (d) => xScale(d.year) + xSubScale('Counter'))
      .attr('y', (d) => yScale(d.counts))
      .attr('width', xSubScale.bandwidth())
      .attr('height', (d) => height - yScale(d.counts));
  }
}
