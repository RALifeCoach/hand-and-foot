import {ICard, IGameBase, IMessage, IServerQuestion} from '../../../models/game'
import {atom, selector} from 'recoil'
import {IGamePlay} from 'Game'

export const gameIdAtom = atom<number>({
  key: 'gameId',
  default: 0,
})

export const gameBaseAtom = atom<IGameBase | null>({
  key: 'gameBase',
  default: null,
})

export const gamePlayAtom = atom<IGamePlay | null>({
  key: 'gamePlay',
  default: null,
})

export const lastMessageAtom = atom<string | null>({
  key: 'lastMessage',
  default: null,
})

export const readyStateAtom = atom<number | null>({
  key: 'readyState',
  default: null,
})

export const selectedAtom = atom<{ [cardId: string]: boolean }>({
  key: 'selected',
  default: {},
})

export const sortOrderAtom = atom<string>({
  key: 'sortOrder',
  default: '',
})

export const cardMovingAtom = atom<ICard | null>({
  key: 'cardMoving',
  default: null,
})

export const errorAtom = atom<string>({
  key: 'error',
  default: '',
})

export const messagesAtom = atom<IMessage[]>({
  key: 'messages',
  default: [],
})

export const newMessagesAtom = atom<boolean>({
  key: 'newMessages',
  default: false,
})

export const messageIdAtom = atom<string>({
  key: 'messageId',
  default: '',
})

export const playerIdAtom = atom<number>({
  key: 'playerId',
  default: -1,
})

export const serverQuestionAtom = atom<IServerQuestion | null>({
  key: 'serverQuestion',
  default: null,
})

export const savedMessagesAtom = atom<{ current: string; saved: any[] }>({
  key: 'savedMessages',
  default: {current: '', saved: []},
})

export const savedMessagesSelector = selector<{ current: string; saved: any[] } | string>({
  key: 'savedMessagesSelector',
  get: ({get}) => {
    const savedMessages = get(savedMessagesAtom)
    return {
      saved: savedMessages.saved,
      current: savedMessages.current
    } as { current: string; saved: any[] }
  },
  set: ({get, set}, type) => {
    const savedMessages = get(savedMessagesAtom)
    if (type === 'clear') {
      set(savedMessagesAtom, {saved: savedMessages.saved, current: ''})
      return
    }
    if (!savedMessages.saved.length) {
      return
    }
    const [nextMessage, ...rest] = savedMessages.saved
    set(savedMessagesAtom, {current: nextMessage, saved: rest})
  }
})

export const addMessageSelector = selector<any>({
  key: 'addMessageSelector',
  get: ({get}) => {
    const savedMessages = get(savedMessagesAtom)
    return {
      saved: savedMessages.saved,
      current: savedMessages.current
    } as { current: string; saved: any[] }
  },
  set: ({get, set}, body: any) => {
    const savedMessages = get(savedMessagesAtom)
    set(
      savedMessagesAtom,
      {current: savedMessages.current, saved: [...savedMessages.saved, body]}
    )
  }
})
