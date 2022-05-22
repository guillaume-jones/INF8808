/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  const legendElement = d3.select('.legend')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'legend-element')

  legendElement
    .append('svg')
    .attr('width', 15)
    .attr('height', 15)
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', color)
    .attr('stroke', '#000000')
    .attr('stroke-width', '1')

  legendElement.append('p')
    .attr('class', 'legend-text')
    .text((actor) => {
      return actor
    })
}
