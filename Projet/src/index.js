import { createDataset } from './scripts/preprocess';
import 'regenerator-runtime/runtime.js';
import * as mapViz from './scripts/mapViz';
import * as year_button from './scripts/year_button.js'

import { getMontrealData, getProjection, getPath } from './scripts/geography';

(async function (d3) {
  const svgSize = {
    width: 800,
    height: 625,
  };

  const montreal = getMontrealData();
  const projection = getProjection();
  const path = getPath(projection);

  // mapViz.mapBackground(montreal, path);
  // mapViz.setCanvasSize(svgSize.width, svgSize.height);
  // mapViz.generateMapG(svgSize.width, svgSize.height);

  const dataset = createDataset();
  console.log(dataset);

  let currentYear = 2009
  year_button.drawButton('main-svg', 2009, svgSize.width)

  /**
   * Handles the selection of the year by the user by clicking
   */
   function yearSelection () {
    d3.select('.button')
      .on('click', () => {
        const previousYear = currentYear
        currentYear = (currentYear === 2009 ? 2022 : 2009)
        // build() // Update quand on va avoir la carte
        d3.select('.button').select('.button-text').text('Data for year ' + previousYear)
      })
  }

  yearSelection()

})(d3);
