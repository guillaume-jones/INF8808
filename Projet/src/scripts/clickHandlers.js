/** Appends a callback to redraw graphs to the year dropdown
 *
 * @param callback Redraw function to call on click
 */
export function dropDownClickHandler(callback) {
  d3.select('#dropdown').on('change', () => {
    const year = d3.select('#dropdown').property('value');
    console.log(year);
    callback(year);
    // Pass year to drawBarChart, drawMapCircles and drawAreaChart to redraw
    // Rerun drawLineChart with no name specified (default data)
  });
}

/** To be passed to circles to redraw charts on circle click
 *
 * @param callback Callback to call on click
 */
export function circleClickHandler(callback) {
  return (d) => {
    const year = d3.select('#dropdown').property('value');
    const name = d.name;
    console.log(name);
    callback(year, name);
    // Pass d.name, d.neighborhood and lineChartData[year][name] to drawLinechart
  };
}
