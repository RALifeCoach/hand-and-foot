import React, {useEffect, memo, useState} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {
  errorAtom, gamePlayAtom,
  savedMessagesAtom,
  savedMessagesSelector,
} from '../atoms/game'
import {userAtom} from '../atoms/main'
import SnackAlert from '../shared/SnackAlert'
import ReconnectingWebsocket from 'reconnecting-websocket'
import {lastMessageSelector} from '../atoms/lastMessageSelector/lastMessageSelector'

const MessageProvider: React.FC<any> = ({children}): JSX.Element => {
  const user = useRecoilValue(userAtom)
  const setSavedMessages = useSetRecoilState(savedMessagesSelector)
  const setGamePlay = useSetRecoilState(gamePlayAtom)
  const [error, setError] = useRecoilState(errorAtom)
  const savedMessages = useRecoilValue(savedMessagesAtom)
  const [wss, setWss] = useState<any>(null)
  const [ready, setReady] = useState(false)
  const setLastMessage = useSetRecoilState(lastMessageSelector)

  useEffect(() => {
    const client = new ReconnectingWebsocket('ws://localhost:3100')
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
        setLastMessage(data)
      }
      wss.onclose = () => {
        console.log('close')
      }
      wss.onerror = (error: any) => {
        console.log(error)
      }
    }
  }, [wss, setGamePlay, setLastMessage])

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
