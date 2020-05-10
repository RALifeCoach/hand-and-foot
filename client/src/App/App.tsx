import React, { memo, useEffect, useState, useContext } from "react";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";
import useFetchGet from "../hooks/useFetchGet";
import FetchHandling from "../shared/FetchHandling";
import QueryString from 'query-string';
import ApplicationBar from "./ApplicationBar";
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
  const { mainState: { menu, user } } = useContext(MainContext);
  const queryParams = QueryString.parse(window.location.search);
  const [gameId, setGameId] = useState(queryParams.game_id);
  const isTest = queryParams.test === 'true';
  const players = queryParams.players || 4;
  const [gameStatus, getGame] = useFetchGet();

  useEffect(() => {
    if (!gameId && isTest) {
      getGame(`api/game/restart/TestGame/${players}`);
    }
  }, [getGame, gameId, players, isTest]);

  useEffect(() => {
    if (gameStatus.status === 'success') {
      console.log(gameStatus.data);
      setGameId(gameStatus.data.gameId);
    }
  }, [gameStatus]);

  if (queryParams.id) {
    return (
      <>
        <ApplicationBar tabValue={menu} notifications={false} />
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
            gameId={Number(gameId)}
            playerId={player.playerId}
            teamId={player.teamId}
            position={player.position}
            key={player.playerId}
          >
            <Game />
          </GameProvider>
        ))}
      </>
    );
  }

  return (
    <>
      <ApplicationBar
        tabValue={menu}
        notifications={false}
      />
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
