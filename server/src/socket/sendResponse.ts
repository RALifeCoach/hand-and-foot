import { IGamePlay, IPlayer } from '../models/game'
import { IGameBase, IMessage } from '../../models/game'
import Database from '../Database'
import { ACTION_RESPONSE } from '../../constants'
import buildPlayerInfo from '../game/utils/buildPlayerInfo'
import { IGameController } from './socketManager'
import * as uuid from 'uuid'
import logger from '../util/logger'
import sendQuestion from './sendQuestion'

const sendResponse = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  message: string,
  gameController: IGameController,
  gameId: number,
  playerId: number,
  transactionType: string,
  isError: boolean
) => {
  try {
    const messages: IMessage[] = []
    if (ACTION_RESPONSE[transactionType].sendToAll) {
      const newMessages = gamePlay.messages.filter(
        (message) => transactionType === 'addPlayer' || !message.isSent
      )
      messages.push(...JSON.parse(JSON.stringify(newMessages)))
      newMessages.forEach((message) => (message.isSent = true))
    }

    Database.updateGame(gameId, gamePlay, players, () => {
      const messageId = uuid.v4()
      const currentPlayer = players.find(player => player.playerId === playerId)
      if (!currentPlayer) {
        const playerInfo =
          JSON.stringify({
            type: 'error',
            message: 'player not found'
          })
        logger.error(`player (${playerId}) not found`)
        gameController[gameId].players[playerId].send(playerInfo)
        return
      }
      const activePlayer = players.find(player => player.playerId === gamePlay.currentPlayerId)
      if (!isError && ACTION_RESPONSE[transactionType].sendToAll) {
        players.forEach((player) => {
          const playerInfo =
            message ||
            JSON.stringify({
              type: 'updateGame',
              messageId,
              game: buildPlayerInfo(
                gamePlay,
                gameRules,
                players,
                gameId,
                player.playerId,
                messages,
                player.playerId === playerId
              ),
            })
          if (gameController[gameId].players[player.playerId]) {
            try {
              gameController[gameId].players[player.playerId].send(playerInfo)
            }
            catch (ex) {
              logger.error(
                `sendResponse_players: failed to send response ${JSON.stringify(ex)}`
              )
            }
          }
        })
        if (activePlayer) {
          sendQuestion(gameId,
            gamePlay,
            players,
            activePlayer,
            gameController)
        }
        return
      }
      const playerInfo =
        message ||
        JSON.stringify({
          type: 'updateGame',
          messageId,
          game: buildPlayerInfo(
            gamePlay,
            gameRules,
            players,
            gameId,
            playerId,
            [],
            false
          ),
        })
      try {
        gameController[gameId].players[playerId].send(playerInfo)
      }
      catch (ex) {
        logger.error(
          `sendResponse_player: failed to send response ${JSON.stringify(ex)}`
        )
      }
    })
  } catch(err) {
    logger.error(
      `sendResponse_catch: failed to send response ${err.message}`
    )
  }
}

export default sendResponse
