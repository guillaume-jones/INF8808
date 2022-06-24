import "regenerator-runtime/runtime.js";

import { determineNeighborhood, getMontrealData, getProjection, getPath, convertCoordinatesToXY } from "./scripts/geography";

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625
  }

  const montreal = await getMontrealData();
  const projection = getProjection();
  const path = getPath(projection);
})(d3)
