import {
  createBarChartData,
  createLineChartData,
  createDataset,
} from './scripts/preprocess';
import 'regenerator-runtime/runtime.js';

import { getMontrealData, getProjection, getPath } from './scripts/geography';

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625,
  };

  const montreal = await getMontrealData();
  const projection = getProjection();
  const path = getPath(projection);

  const dataset = await createDataset();
  console.log(dataset);
  // const barChartData = createBarChartData(dataset);
  const lineChartData = createLineChartData(dataset);
  console.log(lineChartData);
})(d3);
