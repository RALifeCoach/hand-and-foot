import React, { memo, useEffect, useState } from "react";
import MainProvider from "./MainProvider";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";
import QueryString from 'query-string';

const PLAYERS = [
  {
    playerId: 'player 1',
    teamId: 'NS',
    position: 0
  },
  {
    playerId: 'player 2',
    teamId: 'EW',
    position: 1
  },
  {
    playerId: 'player 3',
    teamId: 'NS',
    position: 2
  },
  {
    playerId: 'player 4',
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
      getGame('game/restart');
    }
  }, [getGame, gameId]);

  useEffect(() => {
    if (gameStatus.status === 'success') {
      setGameId(gameStatus.data.gameId);
    }
  }, [gameStatus]);

  return (
    <>
      {Boolean(gameId) && (
        <MainProvider>
          {PLAYERS.map((player) => (
            <GameProvider
              gameId={gameId as string}
              playerId={player.playerId}
              teamId={player.teamId}
              position={player.position}
              key={player.playerId}
            >
              <Game />
            </GameProvider>
          ))}
        </MainProvider>
      )}
      <FetchHandling status={gameStatus} title="Fetching game" />
    </>
  );
};

export default memo(App);
