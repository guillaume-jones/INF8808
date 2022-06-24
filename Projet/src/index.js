import { createDataset } from './scripts/preprocess';
import 'regenerator-runtime/runtime.js';
import * as mapViz from './scripts/mapViz';

import { getMontrealData, getProjection, getPath } from './scripts/geography';

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625,
  };

  const montreal = getMontrealData();
  const projection = getProjection();
  const path = getPath(projection);

  mapViz.mapBackground(montreal, path);
  mapViz.setCanvasSize(svgSize.width, svgSize.height);
  mapViz.generateMapG(svgSize.width, svgSize.height);

  const dataset = createDataset();
  console.log(dataset);
})(d3);
