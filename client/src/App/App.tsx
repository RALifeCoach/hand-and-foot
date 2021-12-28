import React, {memo, useCallback, useEffect, useState} from 'react'
import Game from '../Game/Game'
import FetchHandling from '../shared/FetchHandling'
import Login from '../Login/Login'
import SetPassword from '../Login/SetPassword'
import {
  MutableSnapshot,
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import {gameIdAtom, playerIdAtom} from '../atoms/game'
import {configAtom, userAtom, windowSizeAtom} from '../atoms/main'
import getWindowSize from './getWindowSize'
import {Routes, Route} from 'react-router-dom'
import Games from '../Games/Games'
import {User} from 'User'
import MessageProvider from './MessageProvider'
import useTestSetup from './useTestSetup'

const PLAYERS4 = [
  {
    playerId: 1,
    teamId: 'NS',
    position: 0,
  },
  {
    playerId: 2,
    teamId: 'EW',
    position: 1,
  },
  {
    playerId: 3,
    teamId: 'NS',
    position: 2,
  },
  {
    playerId: 4,
    teamId: 'EW',
    position: 3,
  },
]
const PLAYERS3 = [
  {
    playerId: 1,
    teamId: '1',
    position: 0,
  },
  {
    playerId: 2,
    teamId: '2',
    position: 1,
  },
  {
    playerId: 3,
    teamId: '3',
    position: 2,
  },
]

const App = () => {
  const [userSet, setUserSet] = useState(false)
  const [windowSize, setWindowSize] = useRecoilState(windowSizeAtom)
  const [user, setUser] = useRecoilState(userAtom)
  const config = useRecoilValue(configAtom)

  const onWindowResize = useCallback(
    (event) => {
      const size = event.target.innerWidth
      const currentWindowSize = getWindowSize(size)
      if (windowSize !== currentWindowSize) {
        setWindowSize(currentWindowSize)
      }
    },
    [windowSize, setWindowSize]
  )

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [onWindowResize])

  useEffect(() => {
    const user = localStorage.getItem('handf:user')
    if (user) {
      setUser(JSON.parse(user))
    }
    setTimeout(() => setUserSet(true), 200)
  }, [setUser])

  const {passwordId, isTest, players, gameStatus, gameId} = useTestSetup()

  if (passwordId) {
    return (
      <>
        <SetPassword id={passwordId as string}/>
      </>
    )
  }

  if (!!gameStatus) {
    return <FetchHandling status={gameStatus} title="Fetching game"/>
  }

  const initializeState = (playerId: number) => ({set}: MutableSnapshot) => {
    set(playerIdAtom, playerId)
    set(gameIdAtom, gameId)
    set(configAtom, config)
    set(userAtom, user)
  }

  if (isTest) {
    return (
      <>
        {(players === 4 ? PLAYERS4 : PLAYERS3).map((player) => (
          <RecoilRoot initializeState={initializeState(player.playerId)} key={player.playerId}>
            <MessageProvider>
              <Game position={player.position} teamId={player.teamId}/>
            </MessageProvider>
          </RecoilRoot>
        ))}
      </>
    )
  }

  if (!userSet) {
    return null
  }

  return (
    <RecoilRoot initializeState={initializeState((user as User)?.userId ?? 0)}>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/games" element={(
          <MessageProvider>
            <Games/>
          </MessageProvider>
        )}/>
        <Route
          path="/game/:position/:team"
          element={() => (
            <MessageProvider>
              <Game/>
            </MessageProvider>
          )}
        />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </RecoilRoot>
  )
}

export default memo(App)
