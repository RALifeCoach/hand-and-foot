import { IGamePlay, IPlayer } from '../models/game'
import { IGameBase } from '../../models/game'
import { IGameController } from './socketManager'
import Database from '../Database'
import undoTransaction from './undoTransaction'
import doTransaction from './doTransaction'
import sendResponse from './sendResponse'
import logger from '../util/logger'

const processMessages = (
  messageStack: any[],
  gameController: IGameController
) => {
  const data = messageStack[0]

  if (!gameController[data.value.gameId]) {
    gameController[data.value.gameId] = { players: {} }
  }
  gameController[data.value.gameId].players[data.value.playerId] = data.socket

  const gameId = data.value.gameId
  const playerId = data.value.playerId
  logger.info(`About to process ${data.type} for gameId ${data.value.gameId} and player ${data.value.playerId}`)

  Database.readGame(data.value.gameId, (game) => {
    const gamePlay: IGamePlay = game.gamePlay
    const gameRules: IGameBase = game.gameRules
    const players: IPlayer[] = game.players

    new Promise<{ newGamePlay: IGamePlay; newPlayers: IPlayer[]; message: string, isError: boolean }>((resolve) => {
      if (data.type === 'undo') {
        undoTransaction(gamePlay, players, data.value.override, resolve)
      } else {
        doTransaction(
          gamePlay,
          gameRules,
          players,
          data,
          gameController,
          gameId,
          playerId,
          resolve
        )
      }
    }).then(
      ({
         newGamePlay,
         newPlayers,
         message,
         isError,
       }: {
        newGamePlay: IGamePlay;
        newPlayers: IPlayer[];
        message: string;
        isError: boolean;
      }) => {
        sendResponse(
          newGamePlay,
          gameRules,
          newPlayers,
          message,
          gameController,
          data.value.gameId,
          data.value.playerId,
          data.type,
          isError
        )
        messageStack.splice(0, 1)
        if (messageStack.length) {
          processMessages(messageStack, gameController)
        }
      }
    )
  })
}

export default processMessages
