import useFetchGet from '../hooks/useFetchGet'
import {useEffect, useState} from 'react'
import {gameIdAtom} from '../atoms/game'
import {useRecoilState} from 'recoil'
import QueryString from 'query-string'

const useTestSetup = () => {
  const queryParams = QueryString.parse(window.location.search)
  const isTest = queryParams.test === 'true'
  const players = parseInt((queryParams.players as string) ?? '4')
  const truncate = queryParams.truncate || 'no'
  const pGameId = queryParams.gameId
  const [gameId, setGameId] = useRecoilState(gameIdAtom)
  const [gameStatus, getGame] = useFetchGet()
  const doTruncate = isTest && truncate === 'yes'
  const doFetchGame = isTest && !!pGameId
  const doGetTestGame = doTruncate || doFetchGame
  const [getTestGame, setGetTestGame] = useState(!doGetTestGame)

  useEffect(() => {
    if (doTruncate) {
      getGame(`api/game/restart/TestGame/${players}/yes`)
    }
  }, [getGame, doTruncate, players])

  useEffect(() => {
    if (doGetTestGame) {
      getGame(`api/game/query/${pGameId}`)
    }
  }, [getGame, doGetTestGame, pGameId])

  useEffect(() => {
    if (!getTestGame && gameStatus.status === 'success') {
      setGameId(gameStatus.data.gameId)
      setTimeout(() => setGetTestGame(true), 200)
    }
  }, [getTestGame, setGetTestGame, gameStatus.status])

  return {
    passwordId: queryParams.id,
    isTest,
    players,
    gameStatus: !getTestGame ? gameStatus : undefined,
    gameId
  }
}

export default useTestSetup
