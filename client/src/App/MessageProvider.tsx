import React, {useEffect, memo, useState} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {
  errorAtom, gamePlayAtom,
  savedMessagesAtom,
  savedMessagesSelector,
} from '../atoms/game'
import {userAtom} from '../atoms/main'
import SnackAlert from '../shared/SnackAlert'
import {User} from 'User'
import ReconnectingWebsocket from 'reconnecting-websocket'

const MessageProvider: React.FC<any> = ({children}) => {
  const user = useRecoilValue(userAtom) as User
  const setSavedMessages = useSetRecoilState(savedMessagesSelector)
  const setGamePlay = useSetRecoilState(gamePlayAtom)
  const [error, setError] = useRecoilState(errorAtom)
  const savedMessages = useRecoilValue(savedMessagesAtom)
  const [wss, setWss] = useState<any>(null)
  const [ready, setReady] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>()

  useEffect(() => {
    const client = new ReconnectingWebsocket('ws://localhost:3100', )
    setWss(client)
  }, [])

  useEffect(() => {
    if (wss) {
      wss.onopen = () => {
        setReady(true)
      }
      wss.onmessage = (message: any) => {
        const data = JSON.parse(message.data)
        console.log('message', data)
        if (data.type === 'updateGame') {
          setGamePlay(data.game)
          return
        }
        debugger
      }
      wss.onclose = () => {
        console.log('close')
      }
      wss.onerror = (error: any) => {
        console.log(error)
      }
    }
  }, [wss])

  useEffect(() => {
    if (
      ready &&
      savedMessages.saved.length &&
      !savedMessages.current
    ) {
      setSavedMessages('pop')
    }
  }, [savedMessages, ready, setSavedMessages])

  useEffect(() => {
    if (savedMessages.current) {
      wss.send(JSON.stringify({...savedMessages.current as any, token: user.token}))
      setSavedMessages('clear')
    }
  }, [savedMessages, wss, setSavedMessages, user])

  useEffect(() => {
    if (lastMessage) {
      setGamePlay(lastMessage.game)
      setLastMessage(null)
    }
  }, [lastMessage, setLastMessage, setGamePlay])

  return (
    <>
      {children}
      <SnackAlert
        open={Boolean(error)}
        text={error}
        severity="error"
        onClose={() => setError('')}
      />
    </>
  )
}

export default memo(MessageProvider)
