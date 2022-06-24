import pointInPolygon from 'point-in-polygon';

/** Gets the Montreal geographical data
 *
 * @returns {object[]} Montreal GEOJSON
 */
export async function getMontrealData() {
  return await d3.json('montreal.json');
}

/** Gets the Montreal geographical data
 *
 * @returns {object[]} Montreal's bike path GEOJSON
 */
export async function getBikePaths() {
  return await d3.json('reseau_cyclable.geojson');
}

/**
 * Determines the neighborhood based on coordinates
 *
 * @param lon Longitude of point (float)
 * @param lat Latitude of point (float)
 * @param montreal Pre-loaded JSON of Montreal data
 *
 * @returns {string} Neighborhood of point or empty if not found
 */
export function determineNeighborhood(lon, lat, montreal) {
  let returnName = '';

  montreal.forEach((feature) => {
    if (pointInPolygon([lon, lat], feature.geometry.coordinates[0][0])) {
      returnName = feature.properties.NOM;
    }
  });

  return returnName;
}

/** Gets the map projection function
 *
 * @returns Projection function in Mercator for Montreal
 */
export function getProjection() {
  return d3.geoMercator().center([-73.708879, 45.579611]).scale(70000);
}

/** Gets the path function
 *
 * @param projection Projection in Mercator for Montreal
 *
 * @returns Path function for Montreal
 */
export function getPath(projection) {
  return d3.geoPath().projection(projection);
}

/** Gets the XY positions on the map viz for a given set of coordinates
 * @param {number} longitude Longitude to convert
 * @param {number} latitude Latitude to convert
 * @param projection Projection in Mercator for Montreal
 *
 * @returns {x: number, y: number}
 */
export function convertCoordinatesToXY(longitude, latitude, projection) {
  const projected = projection([longitude, latitude]);
  return {
    x: projected[0],
    y: projected[1],
  };
}
