import React, { memo, useEffect, useState } from "react";
import MainProvider from "./MainProvider";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";
import QueryString from 'query-string';

const PLAYERS = [
  {
    playerId: 1,
    teamId: 'NS',
    position: 0
  },
  {
    playerId: 2,
    teamId: 'EW',
    position: 1
  },
  {
    playerId: 3,
    teamId: 'NS',
    position: 2
  },
  {
    playerId: 4,
    teamId: 'EW',
    position: 3
  },
];

const App = () => {
  const queryParams = QueryString.parse(window.location.search);
  const [gameId, setGameId] = useState(queryParams.game_id);
  const [gameStatus, getGame] = useFetchGet();
  useEffect(() => {
    if (!gameId) {
      getGame('game/restart/TestGame/4');
    }
  }, [getGame, gameId]);

  useEffect(() => {
    if (gameStatus.status === 'success') {
      console.log(gameStatus.data);
      setGameId(gameStatus.data.gameId);
    }
  }, [gameStatus]);

  if (!gameId) {
    return (
      <FetchHandling status={gameStatus} title="Fetching game" />
    );
  }

  return (
    <>
      <MainProvider>
        {PLAYERS.map((player) => (
          <GameProvider
            gameId={Number(gameId)}
            playerId={player.playerId}
            teamId={player.teamId}
            position={player.position}
            key={player.playerId}
          >
            <Game />
          </GameProvider>
        ))}
      </MainProvider>
    </>
  );
};

export default memo(App);
