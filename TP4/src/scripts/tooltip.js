/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  const gdp = d.GDP.toFixed(2) + ' $ (USD)'
  const CO2 = d.CO2.toFixed(2) + ' metric tonnes'

  return (
    `<div>
    <p class="tooltip-value"><b>Country :</b> ${d['Country Name']}</p>
    <p class="tooltip-value"><b>Population :</b> ${d.Population}</p>
    <p class="tooltip-value"><b>GDP :</b> ${gdp}</p>
    <p class="tooltip-value"><b>CO2 emissions :</b> ${CO2}</p>
    </div>`
  )
}
