/**
 * Draws the button leading to a dropdown menu to select the desired year
 * 
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} year The year to display
 * @param {number} width The width of the graph, used to place the button
 */
 export function drawButton (g, year, width) {
    const button = g.append('g')
      .attr('class', 'button')
      .attr('transform', 'translate(' + width + ', 140)')
      .attr('width', 130)
      .attr('height', 25)
  
    button.append('rect')
      .attr('width', 130)
      .attr('height', 30)
      .attr('fill', '#f4f6f4')
      .on('mouseenter', function () {
        d3.select(this).attr('stroke', '#362023')
      })
      .on('mouseleave', function () {
        d3.select(this).attr('stroke', '#f4f6f4')
      })
  
    button.append('text')
      .attr('x', 65)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'button-text')
      .text('Data for year ' + year)
      .attr('font-size', '10px')
      .attr('fill', '#362023')
  }