const pointInPolygon = require('point-in-polygon');

/**
 * Determines the Neighborhood of a specific counter based on its coordinates
 * 
 * Inputs : x and y coordinates
 *          montreal.json
 * 
 * Process :
 *  - 
 *  - Transforms the coordinates in pixels
 * 
 * Output : The Neighborhood in which the counter is located (string)
 *          The transformed coordinates
 */
export async function determineNeighborhood(x, y)  {
    const raw_montreal = await d3.json('montreal.json')
    let return_name
    
    raw_montreal.features.forEach((feature) => {
        if (pointInPolygon([x, y], feature.geometry.coordinates[0][0])) {
            return_name = feature.properties.NOM
        } 
    })

    return return_name
}

/**
 * Transforms the coordinates of the bicycle lanes network in pixels
 * 
 * Inputs : reseau_cyclable.geojson
 * 
 * Process :
 *  - For each bicyle lane : Get the coordinates
 *                           Convert in pixels
 *  - Generate a map of the network
 * 
 * Output : The bicyle lanes network converted in pixels
 */
