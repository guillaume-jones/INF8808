/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */
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
