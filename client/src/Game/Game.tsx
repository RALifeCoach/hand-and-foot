import React, { useEffect } from 'react'
import Player from './Player/Player'
import { IPlayerCurrent } from 'Game'
import ApplicationBar from '../App/ApplicationBar'
import useSendMessage from './hooks/useSendMessage'
import ServerQuestion from './ServerQuestion'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  gameBaseAtom,
  gameIdAtom,
  gamePlayAtom,
  serverQuestionAtom,
} from '../atoms/game'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FETCH_GAME } from '../queries/game'

interface IProps {
  gameId?: number;
  position?: number;
  teamId?: string;
}


const Game = ({ gameId: pGameId, position: positionP, teamId: teamIdP }: IProps): JSX.Element => {
  const params = useParams<{ gameId: string, position: string, team: string }>()
  const gameIdParam = pGameId ?? parseInt(params.gameId ?? '0')
  const position = positionP ?? parseInt(params.position ?? '0')
  const teamId = teamIdP ?? params.team ?? ''
  const [gameId, setGameId] = useRecoilState(gameIdAtom)
  const sendMessage = useSendMessage()
  const [gameBase, setGameBase] = useRecoilState(gameBaseAtom)
  const gamePlay = useRecoilValue(gamePlayAtom)
  const serverQuestion = useRecoilValue(serverQuestionAtom)
  const navigate = useNavigate()
  const { loading: gameLoading, error, data: gameData } = useQuery(FETCH_GAME, {
    skip: !gameId,
    variables: { id: gameId }
  })

  useEffect(() => {
    if (gameIdParam) {
      setGameId(gameIdParam)
    }
  }, [gameIdParam, setGameId])

  useEffect(() => {
    if (!gameLoading && !error && gameData?.handf_game?.length) {
      if (gameData.gamestate === 'finished') {
        return navigate('/games')
      }
      setGameBase(gameData.handf_game[0].gamerules)
      sendMessage('addPlayer', { position, teamId })
    }
  }, [gameLoading, sendMessage, position, teamId, setGameBase, navigate, gameData, error])

  if (!!error) {
    console.log(error)
    return <div />
  }

  if (!gamePlay || !gameBase) {
    console.log('not', !!gamePlay, !!gameBase)
    return <div />
  }

  return (
    <div className="relative">
      <ApplicationBar
        notifications
      />
      {Boolean(gamePlay?.currentPlayer) && (
        <>
          <Player
            player={gamePlay.currentPlayer as IPlayerCurrent}
            key={gamePlay?.currentPlayer.playerId}
          />
          {!!serverQuestion && (
            <ServerQuestion
              serverQuestion={serverQuestion}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Game
