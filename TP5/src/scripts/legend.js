import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  const legend = d3Legend.legendColor()
    .scale(colorScale)
    .shape('circle')
    .title('Légende')

  g.append('g')
    .attr('transform', 'translate(50, 125)')
    .call(legend)
}
