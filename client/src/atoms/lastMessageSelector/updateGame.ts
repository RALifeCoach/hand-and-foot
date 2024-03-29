import { ICard } from '../../../models/game'
import {
  messageIdAtom,
  selectedAtom,
  lastMessageAtom,
  gamePlayAtom,
  sortOrderAtom,
  messagesAtom,
  newMessagesAtom, serverQuestionAtom,
} from '../game'

const updateGame = (get: any, set: any, message: any) => {
  set(serverQuestionAtom, null)
  const messageId = get(messageIdAtom)
  if (message.messageId === messageId) {
    return
  }
  const newMessages =
    message.game.gameState === 'inPlay' ? message.game.messages : []
  const currentPlayer = message.game.currentPlayer
  set(selectedAtom, (selected: { [key: string]: boolean }) => {
    const newSelected = { ...selected }
    if (currentPlayer.playerState === 'draw7') {
      const drawnCard = currentPlayer.cards.find(
        (card: ICard) => card.isFromPile
      )
      if (drawnCard) {
        newSelected[drawnCard.cardId] = true
      }
    }
    return newSelected
  })
  set(messageIdAtom, message.messageId)
  set(lastMessageAtom, message)
  set(gamePlayAtom, message.game)
  set(sortOrderAtom, currentPlayer.sortOrder)
  set(messagesAtom, (messages: any[]) => [...messages, ...newMessages])
  set(
    newMessagesAtom,
    (hasNewMessages: boolean) => hasNewMessages || newMessages.length > 0
  )
}

export default updateGame
