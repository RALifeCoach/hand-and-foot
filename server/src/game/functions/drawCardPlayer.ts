import { IGamePlay, IPlayer } from '../../models/game'
import drawCards from '../utils/drawCards'
import getCurrentPlayer from './getCurrentPlayer'
import logger from '../../util/logger'

const drawCardPlayer = (
  gamePlay: IGamePlay,
  players: IPlayer[],
  pileIndex: number
) => {
  logger.debug({type:'draw card player', pileIndex})
  const player = getCurrentPlayer(gamePlay, players)
  const cards = player.isInHand ? player.hand : player.foot

  if (player.numberOfCardsToDraw) {
    cards.push(...drawCards(gamePlay.pickupPiles[pileIndex], 1))
    player.numberOfCardsToDraw--
    if (player.playerState === 'draw' && player.numberOfCardsToDraw === 0) {
      player.playerState = 'playing'
    }
  }

  if (player.numberOfCardsToReplace) {
    cards.push(...drawCards(gamePlay.pickupPiles[pileIndex], 1))
    player.numberOfCardsToReplace--
    if (player.playerState === 'draw' && player.numberOfCardsToReplace === 0) {
      player.playerState = 'playing'
    }
  }

  return null
}

export default drawCardPlayer
