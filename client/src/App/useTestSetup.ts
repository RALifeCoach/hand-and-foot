import { useEffect, useState } from 'react'
import {gameIdAtom} from '../atoms/game'
import {useRecoilState} from 'recoil'
import QueryString from 'query-string'
import {useMutation, useLazyQuery} from '@apollo/client'
import startGame from '../Game/utils/startGame'
import {FETCH_GAME, TRUNCATE} from '../queries/game'

const useTestSetup = () => {
  const [gameId, setGameId] = useRecoilState(gameIdAtom)
  const [truncateData, {loading: truncLoading}] = useMutation(TRUNCATE)
  const [fetchGame, {loading: gameLoading}] = useLazyQuery(FETCH_GAME)
  const queryParams = QueryString.parse(window.location.search)
  const isTest = queryParams.test === 'true'
  const [players, setPlayers] = useState(parseInt((queryParams.players as string) ?? '4'))
  const truncate = queryParams.truncate || 'no'
  const pGameId = queryParams.gameId
  const doTruncate = isTest && truncate === 'yes'
  const doFetchGame = isTest && !!pGameId
  console.log('test', isTest)

  useEffect(() => {
    if (doTruncate && !gameId) {
      const rulesPlay = startGame(players)
      truncateData({variables: {play: rulesPlay.play, rules: rulesPlay.rules, players: rulesPlay.players}})
        .then(data => {
          setGameId(data?.data?.insert_handf_game?.returning[0]?.gameid)
        })
        .catch(err => console.log(err))
    }
  }, [setGameId, truncateData, players, doTruncate, gameId])

  useEffect(() => {
    if (doFetchGame) {
      fetchGame({variables: {id: pGameId}})
        .then((data) => {
          setPlayers(data.data.handf_game[0].gamerules.numberOfPlayers)
          setGameId(parseInt(pGameId as string))
        })
        .catch(err => console.log(err))
    }
  }, [doFetchGame, fetchGame, pGameId, setGameId])

  return {
    passwordId: queryParams.id,
    isTest,
    players,
    loading: truncLoading || gameLoading,
    gameId
  }
}

export default useTestSetup
