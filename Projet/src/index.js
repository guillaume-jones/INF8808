import 'regenerator-runtime/runtime.js';
import {
  createBarChartData,
  createLineChartData,
  createDataset,
  getLocationData,
  getCounterData,
  group,
  createAreaChartData,
  createMapData,
} from './scripts/preprocess';
import * as mapViz from './scripts/mapViz';
import * as year_button from './scripts/year_button.js';

import { getMontrealData, getProjection, getPath } from './scripts/geography';

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625,
  };

  // Get all raw data
  const years = [
    // 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,2021,
    2009,
    2010,
  ];
  const montreal = await getMontrealData();
  const locationData = await getLocationData();
  const counterData = await getCounterData(years);

  // Render map
  const projection = getProjection();
  const path = getPath(projection);
  mapViz.setCanvasSize(svgSize.width, svgSize.height);
  mapViz.generateMapG(svgSize.width, svgSize.height);
  mapViz.mapBackground(montreal, path);

  // Get all processed data
  const dataset = createDataset(locationData, counterData, years);
  const mapData = createMapData(dataset, montreal, projection);
  const lineChartData = createLineChartData(dataset, montreal);
  const areaChartData = createAreaChartData(dataset);
  const barChartData = createBarChartData(dataset);

  year_button.drawDropdown('#dropdownButton', years, svgSize.width);
  var chosenYear = d3.select('#dropdownButton').property('value');

  function menuClickHandler() {
    d3.select('#dropdownButton').on('change', () => {
      const year = d3.select('#dropdownButton').property('value');
      // Pass year to drawBarChart and drawAreaChart to redraw
      // Rerun drawLineChart with no name specified (default data)
    });
  }

  function pointClickHandler() {
    d3.selectAll('.circles').on('click', (d) => {
      const year = d3.select('#dropdownButton').property('value');
      // Pass d.name, d.neighborhood and lineChartData[year][name] to LineChart
    });
  }

  menuClickHandler();
})(d3);
