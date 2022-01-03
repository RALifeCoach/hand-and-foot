import { IGamePlay, IPlayer } from '../models/game'
import { ITeam } from '../../../models/game'
import { IGameController } from './socketManager'
import logger from '../util/logger'

const sendQuestion = (
  gameId: number,
  gamePlay: IGamePlay,
  players: IPlayer[],
  currentPlayer: IPlayer,
  gameController: IGameController
) => {
  if (gamePlay.gameState === 'askRoundEnd') {
    try {
      const team = gamePlay.teams[currentPlayer.teamId]
      players.forEach((player) => {
        const playerTeam = gamePlay.teams[player.teamId]
        const otherTeam = Object.values(gamePlay.teams).find(
          (team: ITeam) => team.teamId !== player.teamId
        )
        const message =
          `${currentPlayer.playerId === player.playerId ? 'You have' : currentPlayer.playerName + ' has'}
              asked to end this round.
              If ended ${playerTeam.teamId} will score ${playerTeam.scoreBase} base points
              and ${otherTeam?.teamId} will score ${otherTeam?.scoreBase} base points.`
        const buttons =
          player.playerId === currentPlayer.playerId || player.teamId !== team.teamId
            ? []
            : [
              {
                text: 'Accept',
                color: 'primary',
                sendType: 'endRound',
                sendValue: true,
              },
              {
                text: 'Reject',
                color: 'info',
                sendType: 'endRound',
                sendValue: false,
              },
            ]
        if (gameController[gameId].players[player.playerId]) {
          const send = JSON.stringify({
            type: 'serverQuestion',
            value: { title: 'End of round', message, buttons }
          })
          gameController[gameId].players[player.playerId].send(send)
        }
      })
    }
    catch (ex) {
      logger.error(
        `sendResponse: failed to send response ${JSON.stringify(ex)}`
      )
    }
    return
  }
  if (gamePlay.gameState === 'finished') {
    try {
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
          gameController[gameId].players[player.playerId].send(message)
        }
      })
    }
    catch (ex) {
      logger.error(
        `sendResponse: failed to send response ${JSON.stringify(ex)}`
      )
    }
    return
  }
}

export default sendQuestion
