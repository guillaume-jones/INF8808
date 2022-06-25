function generateXScale(width, days) {
  return d3.scaleLinear().domain([0, days]).range([0, width]);
}

function generateXTimescale(width) {
  return d3
    .scaleTime()
    .domain([new Date(2019, 12, 15, 0, 0), new Date(2020, 11, 1, 0, 0)])
    .range([0, width])
    .nice();
}

function generateYScale(height, counts) {
  return d3
    .scaleLinear()
    .domain([0, d3.max(counts)])
    .range([height, 0]);
}

function addLabels(g, width, height, name, neighborhood) {
  // X label
  g.append('text')
    .text("Jours de l'année")
    .attr('x', width / 3)
    .attr('y', height + 30);
  // Y label
  g.append('text')
    .text('Comptes')
    .attr('x', 10)
    .attr('y', height / 2)
    .attr('transform', 'rotate(-90)');
  // Title
  if (name) {
    g.append('text')
      .text(name + ' - ' + neighborhood)
      .attr('x', width / 4)
      .attr('y', 10);
  } else {
    g.append('text')
      .text('Moyenne de tous les compteurs')
      .attr('x', width / 4)
      .attr('y', 10);
  }
}

function addAxes(g, width, height, yScale) {
  // Add axes, including special time axis on X
  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(generateXTimescale(width)).ticks(6));
  g.append('g').call(d3.axisLeft(yScale));
}

/**
 * Draws the line chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */
export function drawLineChart(width, height, averageData, counterData) {
  // Reset line chart svg
  d3.select('#line-g').remove();

  const group = d3
    .select('#map-svg')
    .append('g')
    .attr('id', 'line-g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(40, 0)');

  // Generate scales
  const xScale = generateXScale(width, averageData.counts.length);
  const yScale = generateYScale(height, [
    ...averageData.counts.map((v) => v.value),
    ...(counterData ? counterData.counts.map((v) => v.value) : []),
  ]);

  addAxes(group, width, height, yScale);
  addLabels(
    group,
    width,
    height,
    counterData && counterData.name,
    counterData && counterData.neighborhood,
  );

  group
    .append('path')
    .datum(averageData.counts)
    .attr('fill', 'rgba(0, 0, 0, 0)')
    .attr('stroke', '#9a9a9a')
    .attr('stroke-width', 1.5)
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
    group
      .append('path')
      .datum(counterData.counts)
      .attr('fill', 'rgba(0, 0, 0, 0)')
      .attr('stroke', 'rgba(18, 81, 153, 1)')
      .attr('stroke-width', 1.5)
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
