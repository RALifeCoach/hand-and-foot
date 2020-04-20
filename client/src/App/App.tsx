import React, {memo, useEffect} from "react";
import MainProvider from "./MainProvider";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";

const App = () => {
  const players = [
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

  const [gameStatus, getGame] = useFetchGet();
  useEffect(() => {
    getGame('api/game/');
  }, [getGame]);

  return (
    <>
      <MainProvider>
        {players.map((player) => (
          <GameProvider
            gameId={gameStatus.data.gameId}
            playerId={player.playerId}
            teamId={player.teamId}
            position={player.position}
            key={player.playerId}
          >
            <Game/>
          </GameProvider>
        ))}
      </MainProvider>
      <FetchHandling status={gameStatus} title="Fetching game"/>
    </>
  );
};

export default memo(App);
