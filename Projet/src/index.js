import 'regenerator-runtime/runtime.js';

import {
  createBarChartData,
  createLineChartData,
  createDataset,
} from './scripts/preprocess';
import * as mapViz from './scripts/mapViz';
import * as year_button from './scripts/year_button.js';

import { getMontrealData, getProjection, getPath } from './scripts/geography';

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625,
  };

  const montreal = await getMontrealData();
  const projection = getProjection();
  const path = getPath(projection);

  // mapViz.mapBackground(montreal, path);
  // mapViz.setCanvasSize(svgSize.width, svgSize.height);
  // mapViz.generateMapG(svgSize.width, svgSize.height);

  const dataset = await createDataset();
  const barChartData = createBarChartData(dataset);
  const lineChartData = createLineChartData(dataset, montreal);
  console.log(lineChartData);

  // year_button.drawButton('#graph-g', 2009, svgSize.width);
  // year_button.yearSelection(2009);
})(d3);
