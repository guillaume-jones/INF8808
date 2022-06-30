/** Appends a callback to redraw graphs to the year dropdown
 *
 * @param {*} callback Redraw function to call on click
 */
export function dropDownClickHandler(callback) {
  d3.select('#dropdown').on('change', () => {
    const year = d3.select('#dropdown').property('value');
    callback(year);
  });
}

/** To be passed to circles to redraw charts on circle click
 *
 * @param {*} callback Callback to call on click
 */
export function circleClickHandler(callback) {
  return (d) => {
    const year = d3.select('#dropdown').property('value');
    const name = d.name;
    const neighborhood = d.neighborhood;
    callback(year, name, neighborhood);
  };
}

export function setSubtitle(counter, neighborhood) {
  d3.select('#counter-name').text(counter);
  d3.select('#neighborhood').text(neighborhood);
}
