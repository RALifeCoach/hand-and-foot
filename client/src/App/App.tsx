import React, { memo, useEffect, useState } from "react";
import MainProvider from "./MainProvider";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";
import QueryString from 'query-string';

const PLAYERS4 = [
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
const PLAYERS3 = [
  {
    playerId: 1,
    teamId: '1',
    position: 0
  },
  {
    playerId: 2,
    teamId: '2',
    position: 1
  },
  {
    playerId: 3,
    teamId: '3',
    position: 2
  },
];

const App = () => {
  const queryParams = QueryString.parse(window.location.search);
  const [gameId, setGameId] = useState(queryParams.game_id);
  const isTest = queryParams.test === 'true';
  const players = queryParams.players || 4;
  const [gameStatus, getGame] = useFetchGet();
  useEffect(() => {
    if (!gameId) {
      getGame(`game/restart/TestGame/${players}`);
    }
  }, [getGame, gameId, players]);

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

  if (isTest) {
    return (
      <>
        <MainProvider>
          {(players === 4 ? PLAYERS4 : PLAYERS3).map((player) => (
            <GameProvider
              gameId={Number(gameId)}
              playerId={player.playerId}
              teamId={player.teamId}
              position={player.position}
              key={player.playerId}
              rules={{
                canDraw7: true,
                redThreeScore: 100,
                canDiscardWild: true,
                start7MinRound: 4,
                wildCardMeldScore: 2000,
                canOverfillMeld: false,

              }}
            >
              <Game />
            </GameProvider>
          ))}
        </MainProvider>
      </>
    );
  }

  return (
    <div>Not test</div>
  );
};

export default memo(App);
