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
import {
  generateMapGroups,
  drawMapBackground,
  drawBikePaths,
  drawCircles,
} from './scripts/mapViz';
import * as year_button from './scripts/year_button.js';

import {
  getMontrealData,
  getProjection,
  getPath,
  getBikePaths,
} from './scripts/geography';
import {
  dropDownClickHandler,
  circleClickHandler,
} from './scripts/clickHandlers';

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
  const bikePaths = await getBikePaths();
  const locationData = await getLocationData();
  const counterData = await getCounterData(years);

  // Render map
  const projection = getProjection();
  const path = getPath(projection);
  generateMapGroups(svgSize.width, svgSize.height);
  drawMapBackground(montreal, path);
  drawBikePaths(bikePaths, path);

  // Get all processed data
  const dataset = createDataset(locationData, counterData, years);
  const mapData = createMapData(dataset, montreal, projection);
  const lineChartData = createLineChartData(dataset, montreal);
  const areaChartData = createAreaChartData(dataset);
  const barChartData = createBarChartData(dataset);

  // Interactivity and re-drawing
  function redrawVizForCounter(year, counter) {
    // Add barchart, areachart and linechart here
    // Called on counter click
  }
  function redrawVizForYear(year) {
    // Add all viz here, with defaults (ex. averages for areachar and linechart)
    // Called on dropdown change
    drawCircles(mapData[year], circleClickHandler(redrawVizForCounter));
  }

  const year = year_button.drawDropdown(years, svgSize.width);
  dropDownClickHandler(redrawVizForYear);

  // Draw visualizations
  redrawVizForYear(year);
})(d3);
