import { IGamePlay, IPlayer } from '../../models/game'
import { IMeldType, IRank, ICard, IGameBase } from '../../../models/game'
import * as uuid from 'uuid'
import logGameState from '../../socket/logGameState'
import isRedThree from '../utils/isRedThree'
import isWildCard from '../utils/isWildCard'
import scoreTeam from '../utils/scoreTeam'
import addMessageStarted from '../utils/messages/addMessageStarted'
import addMessageAdded from '../utils/messages/addMessageAdded'
import addMessageCompleted from '../utils/messages/addMessageCompleted'
import addMessageFoot from '../utils/messages/addMessageFoot'
import completeDraw7 from './completeDraw7'
import getCardValue from '../utils/getCardValue'
import rePinCards from './rePinCards'
import startNewTurn from './startNewTurn'
import endTurn from './endTurn'
import logger from '../../util/logger'
import getCurrentPlayer from './getCurrentPlayer'

const playCards = (
  gameId: number,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  cardIds: number[],
  meldId: string,
  meldType: IMeldType,
  meldRank: IRank | undefined,
  resolve: any
) => {
  logger.debug('play cards')
  const player = getCurrentPlayer(gamePlay, players)

  const team = gamePlay.teams[player.teamId]
  if (!team) {
    throw new Error('team not found')
  }

  logGameState(gameId, gamePlay, players, true)
    .then(() => {
      const cards = player.isInHand ? player.hand : player.foot
      let thisMeldId = meldId
      const selectedCards: ICard[] = []
      cardIds.forEach((cardId) => {
        const playCardIndex = cards.findIndex((card) => card.cardId === cardId)
        if (playCardIndex === -1) {
          logger.error(`playCards: card not found ${JSON.stringify(cards)}, ${cardId}`)
          throw new Error('card not found')
        }
        const card = cards[playCardIndex]
        card.pinValue = 0
        selectedCards.push(card)
        if (!thisMeldId || isRedThree(card)) {
          if (!isRedThree(card)) {
            addMessageStarted(gamePlay, players, meldType)
          }
          thisMeldId = uuid.v4()
          team.melds[thisMeldId] = {
            meldId: thisMeldId,
            cards: [],
            isComplete: isRedThree(card),
            type: meldType,
            rank: meldRank,
          }
        }
        if (isRedThree(card)) {
          player.numberOfCardsToReplace += 1
        }
        const meld = team.melds[thisMeldId]
        if (meld.type === 'clean' && isWildCard(card)) {
          meld.type = 'dirty'
        }
        meld.cards.push(...cards.splice(playCardIndex, 1))
      })

      const meld = team.melds[thisMeldId]
      meld.cards.sort((cardA: ICard, cardB: ICard) => {
        if (isWildCard(cardA) && !isWildCard(cardB)) {
          return -1
        }
        if (isWildCard(cardB) && !isWildCard(cardA)) {
          return 1
        }
        if (isWildCard(cardB) && isWildCard(cardA)) {
          return 0
        }
        if (meld.type === 'run') {
          return getCardValue(cardB.rank) - getCardValue(cardA.rank)
        }
        return cardA.suit < cardB.suit ? -1 : 1
      })

      addMessageAdded(gamePlay, players, meld.type, selectedCards)

      if (
        !gameRules.canOverFillMeld &&
        team.melds[thisMeldId].cards.length > 6
      ) {
        team.melds[thisMeldId].isComplete = true
        addMessageCompleted(gamePlay, players, team.melds[thisMeldId].type)
      }

      if (cards.length === 0 && player.playerState !== 'draw7') {
        if (player.isInHand) {
          player.isInHand = false
          addMessageFoot(gamePlay, players, true)
        } else {
          endTurn(team, player)
          startNewTurn(gamePlay, gameRules, players)
        }
      }
      completeDraw7(gamePlay, gameRules, players, gameId)
        .then(() => {
          rePinCards(cards)

          const score = scoreTeam(gameRules, team)
          team.scoreBase = score.scoreBase
          team.scoreCards = score.scoreCards
          team.scoreOnTable = score.scoreOnTable

          resolve(null)
        })
    })
}

export default playCards
