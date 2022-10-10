import {ITeam} from "../../models/game";
import logger from "../util/logger";
import {IGamePlay, IPlayer} from "../models/game";
import {IGameController} from "./socketManager";

const askRoundEnd = (
  gamePlay: IGamePlay,
  currentPlayer: IPlayer,
  players: IPlayer[],
  gameController: IGameController,
  gameId: number
) => {
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
        value: {title: 'End of round', message, buttons}
      })
      try {
        gameController[gameId].players[player.playerId].send(send)
      } catch (ex) {
        logger.error(
          `sendResponse: failed to send response ${JSON.stringify(ex)}`
        )
      }
    }
  })

}

export default askRoundEnd
