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
import { drawAreaChart, generateAreaGroup } from './scripts/areaChart';
import * as lineChart from './scripts/lineChart';
import * as barChartViz from './scripts/barChartViz.js';

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625,
  };
  const areaSize = {
    width: 800,
    height: 350,
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
  generateMapGroups(svgSize.width, svgSize.height);
  generateAreaGroup(areaSize.width, areaSize.height);

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

  // Render line chart
  const g = lineChart.generateG(svgSize.width, svgSize.height);
  const xScale = lineChart.updateXScale(lineChartData, svgSize.width);
  const yScale = lineChart.updateYScale(lineChartData, svgSize.height);
  lineChart.drawXAxis(xScale, svgSize.height);
  lineChart.drawYAxis(yScale);
  lineChart.positionLabels(g, svgSize.width, svgSize.height);

  // Interactivity and re-drawing
  function redrawVizForCounter(year, counter) {
    barChartViz.buildBarChart(barChartData, '#bar-svg');
    // Add barchart, areachart and linechart here
    // Called on counter click
    drawAreaChart(
      areaSize.width,
      areaSize.height,
      areaChartData[year]['Average'],
      areaChartData[year][counter],
    );
  }
  function redrawVizForYear(year) {
    // Add all viz here, with defaults (ex. averages for areachar and linechart)
    // Called on dropdown change
    lineChart.drawLineChart(g, lineChartData[year], xScale, yScale);
    drawCircles(mapData[year], circleClickHandler(redrawVizForCounter));
    drawAreaChart(
      areaSize.width,
      areaSize.height,
      areaChartData[year]['Average'],
    );
  }

  const year = drawDropdown(years, svgSize.width);
  dropDownClickHandler(redrawVizForYear);

  // Call draw graphs
  redrawVizForYear(year);
})(d3);
