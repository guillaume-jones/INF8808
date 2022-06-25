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
import { drawDropdown } from './scripts/yearButton.js';
import {
  dropDownClickHandler,
  circleClickHandler,
} from './scripts/clickHandlers';
import {
  getMontrealData,
  getProjection,
  getPath,
  getBikePaths,
} from './scripts/geography';
import { drawLineChart } from './scripts/lineChart';
import { drawAreaChart } from './scripts/areaChart';
import { buildBarChart } from './scripts/barChartViz.js';

(async function (d3) {
  const mapsize = {
    width: 800,
    height: 625,
  };
  const areaSize = {
    width: 800,
    height: 350,
  };
  const lineSize = {
    width: 400,
    height: 250,
  };

  // Get all raw data
  const years = [
    // 2009, 2010,
    // 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2019,
  ];
  const montreal = await getMontrealData();
  const bikePaths = await getBikePaths();
  const locationData = await getLocationData();
  const counterData = await getCounterData(years);

  // Generate SVG groups
  generateMapGroups(mapsize.width, mapsize.height);

  // Render map
  const projection = getProjection();
  const path = getPath(projection);
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
    drawAreaChart(
      areaSize.width,
      areaSize.height,
      areaChartData[year]['Average'],
      areaChartData[year][counter],
    );
    drawLineChart(
      lineSize.width,
      lineSize.height,
      lineChartData[year]['Average'],
      lineChartData[year][counter],
    );
    // buildBarChart(barChartData, '#bar-svg'); WITH COUNTER
  }
  function redrawVizForYear(year) {
    drawCircles(mapData[year], circleClickHandler(redrawVizForCounter));
    drawAreaChart(
      areaSize.width,
      areaSize.height,
      areaChartData[year]['Average'],
    );
    drawLineChart(
      lineSize.width,
      lineSize.height,
      lineChartData[year]['Average'],
    );
    // buildBarChart(barChartData, '#bar-svg'); WITH NO COUNTER
  }

  const year = drawDropdown(years, mapsize.width);
  dropDownClickHandler(redrawVizForYear);

  // Call draw graphs
  redrawVizForYear(year);
})(d3);
