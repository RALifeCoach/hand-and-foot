import React, { useContext, useEffect } from "react";
import GameContext from "./GameContext";
import Player from "./Player/Player";
import { IPlayerCurrent } from "Game";
import ApplicationBar from "../App/ApplicationBar";
import MainContext from "../App/MainContext";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";
import useSendMessage from "./hooks/useSendMessage";

interface IProps {
  position: number;
  teamId: string;
}

const Game = ({ position, teamId }: IProps) => {
  const { mainState: { gameId } } = useContext(MainContext);
  const {
    gameState: { gamePlay, gameBase, selected, sortOrder, cardMoving, playerId },
    gameDispatch
  } = useContext(GameContext);
  const [gameStatus, getGame] = useFetchGet();
  const sendMessage = useSendMessage();

  useEffect(() => {
    getGame(`api/game/query/${gameId}`);
  }, [getGame, gameId]);

  useEffect(() => {
    if (gameStatus.status === 'success') {
      console.log(gameStatus.data);
      gameDispatch({ type: 'gameBase', value: gameStatus.data });
      sendMessage('addPlayer', { position, teamId })
    }
  }, [gameStatus, gameDispatch, playerId, sendMessage, gameId, position, teamId]);

  if (!gamePlay || !gameBase) {
    return null;
  }
  return (
    <>
      <ApplicationBar
        notifications
      />
      {Boolean(gamePlay?.currentPlayer) && (
        <Player
          player={gamePlay.currentPlayer as IPlayerCurrent}
          gameBase={gameBase}
          gamePlay={gamePlay}
          selected={selected}
          sortOrder={sortOrder}
          cardMoving={cardMoving}
          key={gamePlay?.currentPlayer.playerId}
        />
      )}
      <FetchHandling status={gameStatus} title="Fetching the game..." />
    </>
  )
};

export default Game;
