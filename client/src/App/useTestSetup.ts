import {useEffect} from 'react'
import {gameIdAtom} from '../atoms/game'
import {useRecoilState} from 'recoil'
import QueryString from 'query-string'
import {gql, useMutation, useLazyQuery} from '@apollo/client'
import startGame from '../Game/utils/startGame'

const TRUNCATE = gql`
  mutation delete_all_games($play: json, $rules: json) {
  delete_handf_game(where: {}) {
    affected_rows
  }
  delete_handf_game_log(where: {}) {
    affected_rows
  }
  insert_handf_game(objects: {
    gamename: "Test Game",
    gameplay: $play,
    gamerules: $rules,
    gamestate: "waitingToStart"
  },  
  ) {
    affected_rows
    returning {
      gameid
    }
  }
}
`

const FETCH_GAME = gql`
query MyQuery($id: number) {
  handf_game(where: {gameid: {_eq: $id}}) {
    gameid
    gamename
    gameplay
    gamerules
  }
}
`

const useTestSetup = () => {
  const [gameId, setGameId] = useRecoilState(gameIdAtom)
  const [truncateData, {loading: truncLoading}] = useMutation(TRUNCATE)
  const [fetchGame, {loading: gameLoading}] = useLazyQuery(FETCH_GAME)
  const queryParams = QueryString.parse(window.location.search)
  const isTest = queryParams.test === 'true'
  const players = parseInt((queryParams.players as string) ?? '4')
  const truncate = queryParams.truncate || 'no'
  const pGameId = queryParams.gameId
  const doTruncate = isTest && truncate === 'yes'
  const doFetchGame = isTest && !!pGameId

  useEffect(() => {
    if (doTruncate && !gameId) {
      const rulesPlay = startGame(players)
      truncateData({variables: {play: rulesPlay.play, rules: rulesPlay.rules}})
        .then(data => {
          console.log('after', data?.data?.insert_handf_game?.returning[0]?.gameid)
          setGameId(data?.data?.insert_handf_game?.returning[0]?.gameid)
        })
        .catch(err => console.log(err))
    }
  }, [setGameId, truncateData, players, doTruncate, gameId])

  useEffect(() => {
    if (doFetchGame) {
      fetchGame({variables: {id: pGameId}})
        .then((data) => {
          setGameId(parseInt(pGameId as string))
        })
        .catch(err => console.log(err))
    }
  }, [doFetchGame, fetchGame, pGameId])

  return {
    passwordId: queryParams.id,
    isTest,
    players,
    loading: truncLoading || gameLoading,
    gameId
  }
}

export default useTestSetup
