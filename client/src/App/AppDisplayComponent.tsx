import React from "react";
import MainContext from "./MainContext";
import Users from "../User/Users";
import Games from "../Games/Games";
import Game from "../Game/Game";
import GameProvider from "../Game/GameProvider";

function AppDisplayComponent() {
  const { mainState: { menu, user } } = React.useContext(MainContext);

  if (!user) {
    return null;
  }
  if (menu) {
    localStorage.setItem('main.menu', menu);
  }

  const menus: string[] = menu.split(':');
  switch (menus[0]) {
    case 'games':
      return <Games />;
    case 'game':
      return (
        <GameProvider
          playerId={user.userId}
        >
          <Game
            position={Number(menus[1])}
            teamId={menus[2]}
          />
        </GameProvider>
      );
    case 'users':
      return <Users />;
    default:
      throw new Error(`Unknown menu ${menu}`);
  }
}

export default AppDisplayComponent;
