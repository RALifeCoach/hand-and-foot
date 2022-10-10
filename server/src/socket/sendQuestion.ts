import { IGamePlay, IPlayer } from '../models/game'
import { IGameController } from './socketManager'
import logger from '../util/logger'
import askRoundEnd from "./askRoundEnd";
import askResign from "./askResign";

const sendQuestion = (
  gameId: number,
  gamePlay: IGamePlay,
  players: IPlayer[],
  currentPlayer: IPlayer,
  gameController: IGameController
) => {
  if (gamePlay.gameState === 'askRoundEnd') {
    askRoundEnd(gamePlay, currentPlayer, players, gameController, gameId)
    return
  }
  if (gamePlay.gameState === 'askResign') {
    askResign(gamePlay, currentPlayer, players, gameController, gameId)
    return
  }
  if (gamePlay.gameState === 'finished') {
    // find the winning team(s)
    const maxScore = Math.max(...Object.values(gamePlay.teams).map(team => team.scoreBase + team.scoreCards))
    const winners = Object.values(gamePlay.teams)
                          .filter(team => (team.scoreCards + team.scoreBase) === maxScore)
    players.forEach((player) => {
      const playerTeam = gamePlay.teams[player.teamId]
      const message = (playerTeam.scoreCards + playerTeam.scoreBase) === maxScore
        ? `Congratulations your team ${winners.length > 1 ? 'tied' : 'won'} with a score of ${maxScore}`
        : `Sorry your team lost with a score of ${playerTeam.scoreCards + playerTeam.scoreBase}`
      if (gameController[gameId].players[player.playerId]) {
        try {
          gameController[gameId].players[player.playerId].send(message)
        }
        catch (ex) {
          logger.error(
            `sendResponse: failed to send response ${JSON.stringify(ex)}`
          )
        }
      }
    })
    return
  }
}

export default sendQuestion
