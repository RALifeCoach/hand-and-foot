import React, { memo, useCallback, useEffect, useState } from 'react'
import Game from '../Game/Game'
import Login from '../Login/Login'
import SetPassword from '../Login/SetPassword'
import {
  MutableSnapshot,
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import { playerIdAtom } from '../atoms/game'
import { configAtom, userAtom, windowSizeAtom } from '../atoms/main'
import getWindowSize from './getWindowSize'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Games from '../Games/Games'
import { User } from 'User'
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

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = sessionStorage.getItem('handf:user')

  if (!user) {
    return <Navigate to="/login" replace/>
  }

  return children
}


const App = (): JSX.Element => {
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
    const user = sessionStorage.getItem('handf:user')
    if (user) {
      setUser(JSON.parse(user))
    }
    setTimeout(() => setUserSet(true), 200)
  }, [setUser])

  const { passwordId, isTest, players, loading, gameId } = useTestSetup()
  console.log(passwordId, isTest, players, loading, gameId)

  if (passwordId) {
    return (
      <>
        <SetPassword id={passwordId as string}/>
      </>
    )
  }

  if (loading) {
    return <div/>
  }

  const initializeState = (playerId: number) => ({ set }: MutableSnapshot) => {
    set(playerIdAtom, playerId)
    set(configAtom, config)
    set(userAtom, user)
  }

  if (isTest) {
    console.log('test')
    if (!gameId) {
      return <div/>
    }
    console.log('game id', gameId)
    return (
      <>
        {(players === 4 ? PLAYERS4 : PLAYERS3).map((player) => (
          <RecoilRoot initializeState={initializeState(player.playerId)} key={player.playerId}>
            <MessageProvider>
              <Game gameId={gameId} position={player.position} teamId={player.teamId}/>
            </MessageProvider>
          </RecoilRoot>
        ))}
      </>
    )
  }

  if (!userSet) {
    return <div/>
  }

  return (
    <RecoilRoot initializeState={initializeState((user as User)?.id ?? 0)}>
      <RequireAuth>
        <MessageProvider>
          <Routes>
            <Route path="/games" element={<Games/>}/>
            <Route
              path="/game/:gameId/:position/:team"
              element={<Game/>}
            />
            <Route path="/" element={<Login/>}/>
            <Route path="*" element={<NoMatch/>}/>
          </Routes>
        </MessageProvider>
      </RequireAuth>
    </RecoilRoot>
  )
}

export default memo(App)
