import 'regenerator-runtime/runtime.js';
import {
  createBarChartData,
  createLineChartData,
  createDataset,
  getLocationData,
  getCounterData,
  createAreaChartData,
  createMapData,
} from './scripts/preprocess';
import {
  generateMapGroups,
  generateBlurMap,
  drawMapBackground,
  drawBikePaths,
  drawCircles,
} from './scripts/mapViz';
import { drawDropdown } from './scripts/dropdown.js';
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
import {
  addLineGroup,
  drawLineChart,
  generateBlurLineChart,
} from './scripts/lineChart';
import {
  drawAreaChart,
  hideAreaChart,
  setupAreaSVG,
  generateBlurAreaChart,
} from './scripts/areaChart';
import { buildBarChart } from './scripts/barChartViz.js';
import { changeLocale } from './scripts/changeLocale';
import { showViz } from './scripts/spinner';

(async function () {
  changeLocale();

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
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021,
  ];
  const montreal = await getMontrealData();
  const bikePaths = await getBikePaths();
  const locationData = await getLocationData();
  const counterData = await getCounterData(years);

  // Generate SVG groups
  generateMapGroups(mapsize.width, mapsize.height);
  setupAreaSVG(areaSize.width, areaSize.height);
  addLineGroup();

  // Render map
  const projection = getProjection();
  const path = getPath(projection);
  generateBlurMap();
  drawMapBackground(montreal, path);
  drawBikePaths(bikePaths, path);

  // Add Gaussian Blur
  generateBlurLineChart();
  generateBlurAreaChart();

  // Get all processed data
  const dataset = createDataset(locationData, counterData, years);
  const mapData = createMapData(dataset, montreal, projection);
  const lineChartData = createLineChartData(dataset, montreal);
  const areaChartData = createAreaChartData(dataset);
  const barChartData = createBarChartData(dataset);

  // Interactivity and re-drawing
  function redrawVizForCounter(year, counter) {
    drawLineChart(
      lineSize.width,
      lineSize.height,
      lineChartData[year]['Average'],
      lineChartData[year][counter],
    );
    if (year > 2018) {
      drawAreaChart(
        areaSize.width,
        areaSize.height,
        areaChartData[year]['Average'],
        areaChartData[year][counter],
      );
    } else {
      hideAreaChart();
    }
    // buildBarChart(barChartData, '#bar-svg'); WITH COUNTER
  }
  function redrawVizForYear(year) {
    drawCircles(mapData[year], circleClickHandler(redrawVizForCounter));
    drawLineChart(
      lineSize.width,
      lineSize.height,
      lineChartData[year]['Average'],
    );
    if (year > 2018) {
      drawAreaChart(
        areaSize.width,
        areaSize.height,
        areaChartData[year]['Average'],
      );
    } else {
      hideAreaChart(areaSize.width);
    }
    // buildBarChart(barChartData, '#bar-svg'); WITH NO COUNTER
  }

  const year = drawDropdown(years);
  dropDownClickHandler(redrawVizForYear);

  // Show viz, hide spinner, draw graphs for first time
  showViz();
  redrawVizForYear(year);
})(d3);
