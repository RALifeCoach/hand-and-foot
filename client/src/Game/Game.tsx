import React, { useEffect } from "react";
import Player from "./Player/Player";
import { IPlayerCurrent } from "Game";
import ApplicationBar from "../App/ApplicationBar";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";
import useSendMessage from "./hooks/useSendMessage";
import ServerQuestion from "./ServerQuestion";
import {useRecoilState, useRecoilValue} from 'recoil'
import {
  gameBaseAtom,
  gameIdAtom,
  gamePlayAtom,
  playerIdAtom,
  serverQuestionAtom,
} from '../atoms/game'
import {useParams} from 'react-router-dom'

interface IProps {
  position?: number;
  teamId?: string;
}

const Game = ({ position: positionP, teamId: teamIdP }: IProps) => {
  const params = useParams<{ position: string, team: string }>();
  const position = positionP ?? parseInt(params.position ?? '0');
  const teamId = teamIdP ?? parseInt(params.team ?? '0');
  const gameId = useRecoilValue(gameIdAtom);
  const [gameStatus, getGame] = useFetchGet();
  const sendMessage = useSendMessage();
  const playerId = useRecoilValue(playerIdAtom);
  const [gameBase, setGameBase] = useRecoilState(gameBaseAtom)
  const gamePlay = useRecoilValue(gamePlayAtom)
  const serverQuestion = useRecoilValue(serverQuestionAtom)

  useEffect(() => {
    if (gameId < 0) {
      return
    }
    getGame(`api/game/query/${gameId}`);
  }, [getGame, gameId]);

  useEffect(() => {
    if (gameStatus.status === 'success') {
      setGameBase(gameStatus.data)

      sendMessage('addPlayer', { position, teamId })
    }
  }, [gameStatus, playerId, sendMessage, gameId, position, teamId, setGameBase]);

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
      <FetchHandling status={gameStatus} title="Fetching the game..." />
    </>
  )
};

export default Game;
