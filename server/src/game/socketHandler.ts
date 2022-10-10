import {IGamePlay, IPlayer} from '../models/game'
import { IGameBase } from "../../models/game";
import {IAction} from 'Game'
import addPlayer from './functions/addPlayer'
import setSortOrder from './functions/setSortOrder'
import moveCard from './functions/moveCard'
import pinCard from './functions/pinCard'
import drawCardPlayer from './functions/drawCardPlayer'
import discardCardCheck from './functions/discardCardCheck'
import playCards from './functions/playCards'
import draw7 from './functions/draw7'
import endRoundResponse from './functions/endRoundResponse'
import logger from '../util/logger'
import resignResponse from "./functions/resignResponse";

const socketHandler = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  gameId: number,
  playerId: number,
  action: IAction
): Promise<object | null> => {
  return new Promise(resolve => {
    try {
      switch (action.type) {
        case 'addPlayer':
          addPlayer(
            gamePlay,
            players,
            action.value.playerId,
            action.value.teamId,
            action.value.position,
            resolve
          )
          break
        case 'setSortOrder':
          resolve(
            setSortOrder(gamePlay, players, action.value.playerId, action.value.sortOrder)
          )
          break
        case 'moveCard':
          resolve(
            moveCard(
              gamePlay,
              players,
              action.value.playerId,
              action.value.movingCardId,
              action.value.destCardId
            )
          )
          break
        case 'setPin':
          resolve(pinCard(gamePlay, players, action.value.playerId, action.value.cardId))
          break
        case 'drawCard':
          resolve(drawCardPlayer(gamePlay, players, action.value.pileIndex))
          break
        case 'draw7':
          draw7(gamePlay, players, gameId, resolve)
          break
        case 'discardCard':
          discardCardCheck(
            gameId,
            playerId,
            gamePlay,
            gameRules,
            players,
            action.value.toDiscard,
            resolve
          )
          break
        case 'endRound':
          endRoundResponse(gameId, gamePlay, gameRules, players, action.value.partnerAgreed, resolve)
          break
        case 'resign':
          resignResponse(gamePlay, action.value.partnerAgreed, resolve)
          break
        case 'playCards':
          playCards(
            gameId,
            gamePlay,
            gameRules,
            players,
            action.value.cardIds,
            action.value.meldId,
            action.value.meldType,
            action.value.meldRank,
            resolve
          )
          break
        case 'disconnect':
          gamePlay.gameState = 'waitingToReStart'
          resolve(null)
          break
        case 'askResign':
          console.log('ask resign')
          gamePlay.gameState = 'askResign'
          resolve(null)
          break
        default:
          logger.error(`unknown action ${action}`)
          resolve({type: 'error', message: `Unknown action type (${action.type})`})
      }
    } catch (ex: any) {
      resolve({type: 'error', message: ex.message})
    }
  })
}

export default socketHandler
