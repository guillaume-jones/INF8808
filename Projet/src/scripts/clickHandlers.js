export function dropDownClickHandler() {
  d3.select('#dropdownButton').on('change', () => {
    const year = d3.select('#dropdownButton').property('value');
    console.log(year);
    // Pass year to drawBarChart, drawMapCircles and drawAreaChart to redraw
    // Rerun drawLineChart with no name specified (default data)
  });
}

export function circleClickHandler() {
  d3.selectAll('.circles').on('click', (d) => {
    const year = d3.select('#dropdownButton').property('value');
    const name = d.name;
    console.log(name);
    // Pass d.name, d.neighborhood and lineChartData[year][name] to drawLinechart
  });
}
