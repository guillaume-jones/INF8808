/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  color.domain(data.features.map(
    (feature) => feature.properties.TYPE_SITE_INTERVENTION).sort())
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  d3.select('#map-g')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#ced1c5')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 1.5)
    .on('mouseover', (d) => showMapLabel(d, path))
    .on('mouseout', () => d3.select('.hover').remove())
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  const centroid = path.centroid(d)
  d3.select('.main-svg')
    .append('text')
    .attr('class', 'hover')
    .text(d.properties.NOM)
    .attr('x', centroid[0])
    .attr('y', centroid[1])
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.
}
