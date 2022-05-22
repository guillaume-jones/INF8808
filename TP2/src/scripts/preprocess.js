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

  // Count lines across all players
  data.forEach((line) => {
    const currentLines = playerLines[line.Player]

    if (currentLines === undefined) {
      playerLines[line.Player] = 1
    } else {
      playerLines[line.Player] = currentLines + 1
    }
  })

  // Sort and determine top 5 players
  const sortedPlayers = Object.entries(playerLines)
    .sort((a, b) => b[1] - a[1])
    .map((playerLine) => playerLine[0])

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
  const lineSummary = []

  // Split lines up according to their act
  const linesByAct = {}
  data.forEach((line) => {
    if (!linesByAct[line.Act]) {
      linesByAct[line.Act] = [line]
    } else {
      linesByAct[line.Act] = [...linesByAct[line.Act], line]
    }
  })

  // Iterate through each act's lines
  Object.entries(linesByAct).forEach(([act, actLines]) => {
    const players = {}

    // Count lines of each player in the Act
    actLines.forEach((line) => {
      if (!players[line.Player]) {
        players[line.Player] = 1
      } else {
        players[line.Player] += 1
      }
    })

    // Convert to final format for D3
    const playersFormatted = Object.entries(players).map(([player, count]) => {
      return {
        Player: player,
        Count: count
      }
    })

    // Add Players and their lines for an entire act
    lineSummary.push({
      Act: act,
      Players: playersFormatted
    })
  })

  return lineSummary
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
  data.forEach((actData) => {
    let othersLineCount = 0

    // Count all lines of non-top players
    actData.Players = actData.Players.filter((playerObject) => {
      const isTopPlayer = top.includes(playerObject.Player)
      if (!isTopPlayer) {
        othersLineCount += playerObject.Count
      }

      return isTopPlayer
    })

    // Save to each Act in correct format
    actData.Players.push({
      Player: 'Other',
      Count: othersLineCount
    })
  })

  return data
}
