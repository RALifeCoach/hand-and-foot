import {useCallback} from 'react'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {addMessageSelector, gameIdAtom, playerIdAtom} from '../../atoms/game'
import {userAtom} from '../../atoms/main'

const useSendMessage = () => {
  const user = useRecoilValue(userAtom)
  const gameId = useRecoilValue(gameIdAtom)
  const playerId = useRecoilValue(playerIdAtom)
  const addMessage = useSetRecoilState(addMessageSelector)

  return useCallback(
    (type: string, value: any) => {
      console.log('send', type)
      const body = {
        type,
        value: {
          ...value,
          gameId,
          playerId
        },
        token: user?.token,
      }
      addMessage(body)
    },
    [gameId, playerId, user, addMessage]
  )
}

export default useSendMessage
