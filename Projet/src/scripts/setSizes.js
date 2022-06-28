export function setGroupSizes(name, width, height) {
  const svg = d3.select(name);

  // Reset chart svg
  svg.selectAll('g').remove();

  const outerG = svg
    .append('g')
    .attr('width', width + 30)
    .attr('height', height + 20)
    .attr('transform', 'translate(10, 30)');

  const innerG = outerG
    .append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(60, 0)');

  return [svg, outerG, innerG];
}

export function setSVGSize(name, width, height, callback) {
  const svg = d3
    .select(name)
    .attr('width', width + 80)
    .attr('height', height + 80);

  callback && callback(svg, width, height);
}
