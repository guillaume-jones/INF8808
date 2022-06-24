/**
 * Draws the dropdown menu to select the desired year
 * 
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} year The year to display
 * @param {number} width The width of the graph, used to place the button
 */
 export function drawDropdown (g, years, width) {
  d3.select(g)
    .attr('transform', 'translate(' + width + ', 140)')
    .attr('width', 130)
    .attr('height', 25)
    .selectAll('myOptions')
      .data(years)
    .enter()
      .append('option')
    .text(function (d) {return d;})
    .attr('value', function (d) {return d;})
  }