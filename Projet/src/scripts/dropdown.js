/**
 * Draws the dropdown menu to select the desired year
 *
 * @param {number} years The years to display
 * @param {number} width The width of the graph, used to place the button
 *
 * @returns Initial year in dropdown
 */
export function drawDropdown(years) {
  d3.select('#dropdown')
    .selectAll('myOptions')
    .data(years)
    .enter()
    .append('option')
    .text(function (d) {
      return d;
    })
    .attr('value', function (d) {
      return d;
    });

  return years[0];
}
