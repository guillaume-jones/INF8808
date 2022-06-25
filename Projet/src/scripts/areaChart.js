function generateXScale(width) {
  return d3.scaleLinear().domain([0, 96]).range([0, width]);
}

function generateXTimescale(width) {
  return d3
    .scaleTime()
    .domain([new Date(2020, 1, 1, 0, 0), new Date(2020, 1, 2, 0, 0)])
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
    .text("Heures de la journée")
    .attr('x', width / 3)
    .attr('y', height + 20);
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
      .attr('x', width / 3)
      .attr('y', 10);
  } else {
    g.append('text')
      .text('Moyenne de tous les compteurs')
      .attr('x', width / 3)
      .attr('y', 10);
  }
}

/**
 * Draws the area chart
 *
 * @param {object[]} data The data for the map
 * @param callback The callback to call on circle click
 */
export function drawAreaChart(width, height, averageData, counterData) {
  // Reset area chart svg
  d3.select('#area-g').remove();

  const group = d3
    .select('#area-svg')
    .attr('width', width + 40)
    .attr('height', height + 20)
    .append('g')
    .attr('id', 'area-g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(40, 0)');

  // Generate scales
  const xScale = generateXScale(width);
  const yScale = generateYScale(height, [
    ...averageData.counts.map((v) => v.value),
    ...(counterData ? counterData.counts.map((v) => v.value) : []),
  ]);

  // Add axes, including special time axis on X
  group
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(generateXTimescale(width)));
  group.append('g').call(d3.axisLeft(yScale));

  // Add labels
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
    .attr('fill', '#c9c9c9')
    .attr('stroke', '#9a9a9a')
    .attr('stroke-width', 1.5)
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
    group
      .append('path')
      .datum(counterData.counts)
      .attr('fill', 'rgba(77, 149, 232, 0.5)')
      .attr('stroke', 'rgba(18, 81, 153, 0.5)')
      .attr('stroke-width', 1.5)
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
