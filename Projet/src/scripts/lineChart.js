function addLabels(g, width, height, name, neighborhood) {
  // X label
  g.append('g')
    .append('text')
    .attr('class', 'axis-label')
    .text("Jours de l'année")
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
  // Title
  const title = g
    .append('g')
    .append('text')
    .attr('class', 'graph-title')
    .attr('x', width / 2 + 30)
    .attr('y', 15);
  if (name) {
    title.text(name + ' - ' + neighborhood);
  } else {
    title.text('Moyenne de tous les compteurs');
  }
}

function generateXScale(width, days) {
  return d3.scaleLinear().domain([0, days]).range([0, width]);
}

function generateYScale(height, counts) {
  return d3
    .scaleLinear()
    .domain([0, d3.max(counts)])
    .range([height, 0])
    .nice();
}

function addAxes(g, width, height, yScale) {
  // Create X axis with 24 hr time
  const xAxis = d3
    .axisBottom(
      d3
        .scaleTime()
        .domain([new Date(2000, 0, 0), new Date(2000, 12, 31)])
        .range([0, width])
        .nice(),
    )
    .ticks(6)
    .tickFormat(d3.timeFormat('%B'));

  // Add axes, pixel-perfect positioning
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
 * Draws the line chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */
export function drawLineChart(width, height, averageData, counterData) {
  const svg = d3
    .select('#line-svg')
    .attr('width', width + 80)
    .attr('height', height + 80);

  // Reset line chart svg
  svg.selectAll('g').remove();

  // Add labels
  addLabels(
    svg,
    width + 80,
    height + 70,
    counterData && counterData.name,
    counterData && counterData.neighborhood,
  );

  const outerG = svg
    .append('g')
    .attr('width', width + 30)
    .attr('height', height + 20)
    .attr('transform', 'translate(10, 30)');

  // Generate scales
  const xScale = generateXScale(width, averageData.counts.length);
  const yScale = generateYScale(height, [
    ...averageData.counts.map((v) => v.value),
    ...(counterData ? counterData.counts.map((v) => v.value) : []),
  ]);

  // Add axes
  addAxes(outerG, width, height, yScale);

  const innerG = outerG
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(60, 0)');

  // Draw chart
  innerG
    .append('path')
    .datum(averageData.counts)
    .attr('fill', 'rgba(0, 0, 0, 0)')
    .attr('stroke', '#9a9a9a')
    .attr('stroke-width', 1)
    .attr(
      'd',
      d3
        .line()
        .x(function (d) {
          return xScale(d.index);
        })
        .y(function (d) {
          return yScale(d.value);
        }),
    );

  if (counterData) {
    innerG
      .append('path')
      .datum(counterData.counts)
      .attr('fill', 'rgba(0, 0, 0, 0)')
      .attr('stroke', 'rgba(18, 81, 153, 1)')
      .attr('stroke-width', 1)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return xScale(d.index);
          })
          .y(function (d) {
            return yScale(d.value);
          }),
      );
  }
}
