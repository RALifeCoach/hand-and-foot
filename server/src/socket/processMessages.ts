import {IGamePlay, IPlayer} from '../models/game'
import { IGameBase } from "../../../models/game";
import {IGameController} from './socketManager'
import Database from '../Database'
import undoTransaction from './undoTransaction'
import doTransaction from './doTransaction'
import sendResponse from './sendResponse'

const processMessages = (
  messageStack: any[],
  gameController: IGameController
) => {
  console.log('process')
  const data = messageStack[0]

  if (!gameController[data.value.gameId]) {
    gameController[data.value.gameId] = {players: {}}
  }
  gameController[data.value.gameId].players[data.value.playerId] = data.socket

  const gameId = data.value.gameId
  const playerId = data.value.playerId
  console.log(`About to process ${data.type} for gameId ${data.value.gameId} and player ${data.value.playerId}`)

  Database.readGame(data.value.gameId, (game) => {
    const gamePlay: IGamePlay = game.gamePlay
    const gameRules: IGameBase = game.gameRules
    const players: IPlayer[] = game.players

    new Promise<{ newGamePlay: IGamePlay; message: string }>((resolve) => {
      if (data.type === 'undo') {
        undoTransaction(gamePlay, resolve)
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
         message,
       }: {
        newGamePlay: IGamePlay;
        message: string;
      }) => {
        sendResponse(
          newGamePlay,
          gameRules,
          players,
          message,
          gameController,
          data.value.gameId,
          data.value.playerId,
          data.type
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
