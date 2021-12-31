import React, { useEffect } from "react";
import Player from "./Player/Player";
import { IPlayerCurrent } from "Game";
import ApplicationBar from "../App/ApplicationBar";
import useSendMessage from "./hooks/useSendMessage";
import ServerQuestion from "./ServerQuestion";
import {useRecoilState, useRecoilValue} from 'recoil'
import {
  gameBaseAtom,
  gameIdAtom,
  gamePlayAtom,
  serverQuestionAtom,
} from '../atoms/game'
import {useParams, useNavigate} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {FETCH_GAME} from '../queries/game'

interface IProps {
  position?: number;
  teamId?: string;
}


const Game = ({ position: positionP, teamId: teamIdP }: IProps) => {
  const params = useParams<{ position: string, team: string }>();
  const position = positionP ?? parseInt(params.position ?? '0');
  const teamId = teamIdP ?? parseInt(params.team ?? '0');
  const gameId = useRecoilValue(gameIdAtom);
  const sendMessage = useSendMessage();
  const [gameBase, setGameBase] = useRecoilState(gameBaseAtom)
  const gamePlay = useRecoilValue(gamePlayAtom)
  const serverQuestion = useRecoilValue(serverQuestionAtom)
  const navigate = useNavigate()
  const {loading: gameLoading, error, data: gameData} = useQuery(FETCH_GAME, {
    variables: {id: gameId}
  })

  if (!!error) {
    console.log(error)
  }
  useEffect(() => {
    if (!gameLoading && !error && gameData.handf_game.length) {
      if (gameData.gamestate === 'finished') {
        return navigate('/games')
      }
      setGameBase(gameData.handf_game[0].gamerules)
      sendMessage('addPlayer', { position, teamId })
    }
  }, [gameLoading,  sendMessage, position, teamId, setGameBase, navigate, gameData, error]);

  if (!gamePlay || !gameBase) {
    return null;
  }

  if (serverQuestion) {
    return (
      <ServerQuestion
        serverQuestion={serverQuestion}
      />
    );
  }

  return (
    <>
      <ApplicationBar
        notifications
      />
      {Boolean(gamePlay?.currentPlayer) && (
        <Player
          player={gamePlay.currentPlayer as IPlayerCurrent}
          key={gamePlay?.currentPlayer.playerId}
        />
      )}
    </>
  )
};

export default Game;
