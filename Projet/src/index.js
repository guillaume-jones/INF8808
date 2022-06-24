import { filterData } from './scripts/preprocess';
import 'regenerator-runtime/runtime.js';
import * as mapViz from './scripts/mapViz';

import {
  getMontrealData,
  getProjection,
  getPath,
  determineNeighborhood,
} from './scripts/geography';

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

  const years = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021,
  ];

  await d3.csv('./localisation_des_compteurs_velo.csv', (counterData) => {
    years.forEach((year) => {
      d3.csv('./comptage_velo_' + year + '.csv', (bikeData) => {
        filterData(bikeData, counterData);
      });
    });
  });
})(d3);
