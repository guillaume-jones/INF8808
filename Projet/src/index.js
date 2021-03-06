import 'regenerator-runtime/runtime.js';
import d3Tip from 'd3-tip';

import {
  getLocationData,
  getCounterData,
  createBarChartData,
  createLineChartData,
  createDataset,
  createAreaChartData,
  createMapCircleData,
  createNeighborhoodData,
} from './scripts/preprocess';
import {
  getMontrealData,
  getProjection,
  getPath,
  getBikePaths,
} from './scripts/geography';
import {
  generateMapGroups,
  drawMapBackground,
  drawCircles,
} from './scripts/mapViz';
import { setupLineGroup, drawLineChart } from './scripts/lineChart';
import {
  drawAreaChart,
  hideAreaChart,
  setupAreaSVG,
} from './scripts/areaChart';
import { setupBarSVG, drawBarChart } from './scripts/barChartViz.js';
import { drawDropdown } from './scripts/dropdown.js';
import {
  dropDownClickHandler,
  circleClickHandler,
  setSubtitle,
} from './scripts/clickHandlers';
import { changeLocale } from './scripts/changeLocale';
import { showViz } from './scripts/spinner';
import { renderTooltip } from './scripts/tooltip';

(async function () {
  changeLocale();

  const mapsize = {
    width: 800,
    height: 700,
  };
  const lineSize = {
    width: 400,
    height: 250,
  };
  const areaSize = {
    width: 800,
    height: 350,
  };
  const barSize = areaSize;

  // Get all raw data
  const years = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021,
  ];
  const bixiYear = 2019;
  const montreal = await getMontrealData();
  const bikePaths = await getBikePaths();
  const locationData = await getLocationData();
  const counterData = await getCounterData(years);

  // Generate tooltip and SVG groups
  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      return renderTooltip(d);
    });
  generateMapGroups(mapsize.width, mapsize.height, tip);
  setupAreaSVG(areaSize.width, areaSize.height);
  setupLineGroup(lineSize.width, lineSize.height);
  setupBarSVG(barSize.width, barSize.height);

  // Render map
  const projection = getProjection();
  const path = getPath(projection);

  // Get all processed data
  const dataset = createDataset(locationData, counterData, years, montreal);
  const mapData = createMapCircleData(dataset, projection);
  const neighborhoodData = createNeighborhoodData(montreal, mapData);
  const lineChartData = createLineChartData(dataset);
  const areaChartData = createAreaChartData(dataset);
  const barChartData = createBarChartData(dataset);

  // Used to redraw all viz when year changes
  // Reverts to default visualizations
  function redrawVizForYear(year) {
    setSubtitle('Moyenne du r??seau en ' + year.toString());
    drawMapBackground(
      neighborhoodData[year],
      bikePaths,
      path,
      circleClickHandler(redrawVizForCounter),
      tip,
    );
    drawCircles(mapData[year], circleClickHandler(redrawVizForCounter), tip);
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
    drawBarChart(
      barSize.width,
      barSize.height,
      bixiYear,
      barChartData['Average'],
    );
  }
  // Used to redraw viz for each counter clicked
  function redrawVizForCounter(year, name, neighborhood) {
    setSubtitle(name, neighborhood);
    drawLineChart(
      lineSize.width,
      lineSize.height,
      lineChartData[year]['Average'],
      lineChartData[year][name],
      neighborhood === undefined,
    );
    if (year > 2018) {
      drawAreaChart(
        areaSize.width,
        areaSize.height,
        areaChartData[year]['Average'],
        areaChartData[year][name],
        neighborhood === undefined,
      );
    } else {
      hideAreaChart(areaSize.width);
    }
    drawBarChart(
      barSize.width,
      barSize.height,
      bixiYear,
      barChartData['Average'],
      barChartData[name],
      neighborhood === undefined,
    );
  }

  const year = drawDropdown(years);
  dropDownClickHandler(redrawVizForYear);

  // Show viz, hide spinner, draw graphs for first time
  showViz();
  redrawVizForYear(year);
})(d3);
