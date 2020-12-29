import React, { memo, useEffect, useContext } from "react";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";
import useFetchSave from "../hooks/useFetchSave";
import FetchHandling from "../shared/FetchHandling";
import QueryString from 'query-string';
import MainContext from "./MainContext";
import AppDisplayComponent from "./AppDisplayComponent";
import Login from "../Login/Login";
import SetPassword from "../Login/SetPassword";

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
  const { mainState: { user, gameId }, mainDispatch } = useContext(MainContext);
  const queryParams = QueryString.parse(window.location.search);
  const isTest = queryParams.test === 'true';
  const players = queryParams.players || 4;
  const truncate = queryParams.truncate || 'no';
  const [gameStatus, getGame] = useFetchSave();

  useEffect(() => {
    if (!gameId && isTest) {
      getGame({}, `api/game/restart/TestGame/${players}/${truncate}`);
    }
  }, [getGame, gameId, players, isTest, truncate]);

  useEffect(() => {
    if (gameStatus.status === 'success') {
      mainDispatch({ type: 'gameId', value: gameStatus.response.gameId });
    }
  }, [gameStatus, mainDispatch]);

  if (queryParams.id) {
    return (
      <>
        <SetPassword
          id={queryParams.id as string}
        />
      </>
    );
  }

  if (!gameId && isTest) {
    return (
      <FetchHandling status={gameStatus} title="Fetching game" />
    );
  }

  if (isTest) {
    return (
      <>
        {(players === 4 ? PLAYERS4 : PLAYERS3).map((player) => (
          <GameProvider
            playerId={player.playerId}
            key={player.playerId}
          >
            <Game
              position={player.position}
              teamId={player.teamId}
            />
          </GameProvider>
        ))}
      </>
    );
  }

  return (
    <>
      {Boolean(user)
        ? (
          <AppDisplayComponent />
        )
        : (
          <Login />
        )
      }
    </>
  );
};

export default memo(App);
