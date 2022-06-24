import { filterData } from './scripts/preprocess'
import 'regenerator-runtime/runtime.js'

(async function (d3) {
  const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]

  await d3.csv('./localisation_des_compteurs_velo.csv', (counterData) => {
    years.forEach(year => {
      d3.csv('./comptage_velo_' + year + '.csv', (bikeData) => {
        filterData(bikeData, counterData)
      })
    })
  })
})(d3)
