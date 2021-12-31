import {IGamePlay, IPlayer} from '../models/game'
import { IGameBase, IMessage, ITeam } from "../../../models/game";
import Database from '../Database'
import {ACTION_RESPONSE} from '../../constants'
import buildPlayerInfo from '../game/utils/buildPlayerInfo'
import {IGameController} from './socketManager'
import * as uuid from 'uuid'
import logger from '../util/logger'

const sendResponse = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  message: string,
  gameController: IGameController,
  gameId: number,
  playerId: number,
  transactionType: string
) => {
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
    const player = players.find(player => player.playerId === playerId)
    if (!player) {
      throw new Error('player not found')
    }
    if (gamePlay.gameState === 'askRoundEnd') {
      try {
        const team = gamePlay.teams[player.teamId];
        players.forEach((player) => {
          const playerTeam = gamePlay.teams[player.teamId]
          const otherTeam = Object.values(gamePlay.teams).find(
            (team: ITeam) => team.teamId !== player.teamId
          )
          const message = `${player.playerName} has asked to end this round. If ended ${playerTeam.teamId} will
                score ${playerTeam.scoreBase} base points and ${otherTeam} will score ${otherTeam?.scoreBase}
                base points.`
          const buttons =
            player.playerId === playerId || player.teamId === team.teamId
              ? []
              : [
                {
                  text: 'End Round',
                  sendType: 'endRound',
                  sendValue: true,
                },
                {
                  text: 'End Round',
                  sendType: 'endRound',
                  sendValue: false,
                },
              ]
          if (gameController[gameId].players[player.playerId]) {
            gameController[gameId].players[player.playerId].send(message)
          }
        })
      } catch (ex) {
        logger.error(
          `sendResponse: failed to send response ${JSON.stringify(ex)}`
        )
      }
      return
    }
    if (gamePlay.gameState === 'finished') {
      try {
        // find the winning team(s)
        const maxScore = Math.max(...Object.values(gamePlay.teams).
          map(team => team.scoreBase + team.scoreCards))
        const winners = Object.values(gamePlay.teams)
          .filter(team => (team.scoreCards + team.scoreBase) === maxScore);
        players.forEach((player) => {
          const playerTeam = gamePlay.teams[player.teamId]
          const message = (playerTeam.scoreCards + playerTeam.scoreBase) === maxScore
            ? `Congratulations your team ${winners.length > 1 ? 'tied' : 'won'} with a score of ${maxScore}`
            : `Sorry your team lost with a score of ${playerTeam.scoreCards + playerTeam.scoreBase}`
          if (gameController[gameId].players[player.playerId]) {
            gameController[gameId].players[player.playerId].send(message)
          }
        })
      } catch (ex) {
        logger.error(
          `sendResponse: failed to send response ${JSON.stringify(ex)}`
        )
      }
      return
    }
    if (ACTION_RESPONSE[transactionType].sendToAll) {
      try {
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
            gameController[gameId].players[player.playerId].send(playerInfo)
          }
        })
      } catch (ex) {
        logger.error(
          `sendResponse: failed to send response ${JSON.stringify(ex)}`
        )
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
    console.log(playerInfo)
    gameController[gameId].players[playerId].send(playerInfo)
  })
}

export default sendResponse
