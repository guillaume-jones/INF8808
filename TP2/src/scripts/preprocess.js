/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  return data.map((line) => {
    line.Player = line.Player.slice(0, 1).toUpperCase() + line.Player.slice(1).toLowerCase()
    return line
  })
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  const playerLines = {}
  data.forEach((line) => {
    const currentLines = playerLines[line.Player]

    if (currentLines === undefined) {
      playerLines[line.Player] = 1
    } else {
      playerLines[line.Player] = currentLines + 1
    }
  })

  const sortedPlayers = Object.entries(playerLines).sort((a, b) => b[1] - a[1]).map((playerLine) => playerLine[0])

  return sortedPlayers.slice(0, 5)
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  const nestedData = []
  const players = []
  let lineCount = 0

  data.forEach(actInfo => {
    nestedData.push({ Act: actInfo.Act, Players: players })
    const player = players.map(p => p.Player).indexOf(actInfo.Player)

    if (player === -1) {
      players.push({ Player: actInfo.Player, Count: lineCount++ })
    }
  })

  return nestedData
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  // data.forEach((act) => {
  //   let othersLineCount = 0

  //   act.forEach((player) => {
  //     if (top.includes(player.key) === false) {
  //       othersLineCount += player.value
  //       act.remove(player)
  //     }
  //   })
  //   //act.append un nouveau player ayant pour key «Others» et pour value othersLineCount
  // })
  return data
}
