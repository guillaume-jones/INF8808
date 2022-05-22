/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  console.log(d)
  // TODO : Replace with actual d
  d = {
    Player: 'Test',
    Count: 100
  }

  return (`<div>
  <p id="tooltip-title">Act 1</p>
  <p class="tooltip-value"><b>Player :</b> ${d.Player}</p>
  <p class="tooltip-value"><b>Count :</b> ${d.Count}</p>
  </div>`)
}
