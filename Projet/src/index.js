import 'regenerator-runtime/runtime.js';
import {
  createBarChartData,
  createLineChartData,
  createDataset,
  getLocationData,
  getCounterData,
  group,
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
    // 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021,
  ];
  const montreal = await getMontrealData();
  const locationData = await getLocationData();
  const counterData = await getCounterData(years);

  // Get all processed data
  const dataset = createDataset(locationData, counterData, years);
  const barChartData = createBarChartData(dataset);
  const lineChartData = createLineChartData(dataset, montreal);
  console.log(dataset);
  console.log(lineChartData);

  // Render map
  const projection = getProjection();
  const path = getPath(projection);
  mapViz.setCanvasSize(svgSize.width, svgSize.height);
  mapViz.generateMapG(svgSize.width, svgSize.height);
  mapViz.mapBackground(montreal, path);

  year_button.drawDropdown('dropdownButton', years[0], svgSize.width);
})(d3);
