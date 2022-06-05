import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  const legend = d3Legend.legendColor()
    .scale(colorScale)
    .shape('circle')
    .title('Legend')

  g.append('g')
    .attr('transform', 'translate(' + width + ', -20)')
    .call(legend)
}
