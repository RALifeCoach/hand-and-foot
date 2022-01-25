import {IGamePlay} from 'Game'
import {ICard, IGameBase, IMeld} from '../../../models/game'
import isWildCard from './isWildCard'
import isRedThree from './isRedThree'
import isBlackThree from './isBlackThree'
import canPlayFindExistingMelds from './canPlayFindExistingMelds'
import mapCards from './mapCards'

const canDiscard = (gamePlay: IGamePlay, gameBase: IGameBase, card: ICard) => {
  if (
    gamePlay.gameState !== 'inPlay' ||
    !gamePlay.currentPlayer.isPlayerTurn ||
    gamePlay.currentPlayer.numberOfCardsToDraw ||
    gamePlay.currentPlayer.numberOfCardsToReplace
  ) {
    return 'It\'s not time to discard'
  }
  const toDiscard = card
  // can discard red threes if they are a penalty
  if (isRedThree(toDiscard)) {
    if (gameBase.redThreeScore > 0) {
      return 'Cannot discard red 3\'s'
    }
    return ''
  }
  // can always discard black threes
  if (isBlackThree(card)) {
    return ''
  }
  // cannot discard wild cards if not allowed
  if (isWildCard(toDiscard) && !gameBase.canLockDiscards) {
    return 'Cannot discard wild cards'
  }

  // can the card be played on a meld (regular or wild)
  const mapping = mapCards([toDiscard])
  const existingMelds: IMeld[] = canPlayFindExistingMelds(
    gamePlay,
    gameBase,
    null,
    [toDiscard],
    mapping
  ) as any
  if (existingMelds.length > 0) {
    return isWildCard(toDiscard) &&
    !existingMelds.some((meld: IMeld) => meld.type === 'wild')
      ? ''
      : 'The card is playable'
  }
  return ''
}

export default canDiscard
