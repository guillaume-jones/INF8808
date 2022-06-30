/**
 * Hides the spinner loading symbol when the viz is ready to be shown
 */
export function showViz() {
  d3.select('#viz-container').style('visibility', 'visible');
  d3.select('#spinner').style('display', 'none');
}
