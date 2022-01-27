import React from "react";
import Users from "../User/Users";
import Games from "../Games/Games";
import Game from "../Game/Game";
import {MutableSnapshot, RecoilRoot, useRecoilValue} from 'recoil'
import {playerIdAtom} from '../atoms/game'
import {menuAtom, userAtom} from '../atoms/main'

function AppDisplayComponent() {
  const user = useRecoilValue(userAtom)
  const menu = useRecoilValue(menuAtom)

  if (menu) {
    sessionStorage.setItem('main.menu', menu);
  }

  const initializeState = ({set}: MutableSnapshot) => {
    set(playerIdAtom, user.id)
  }

  const menus: string[] = menu.split(':');
  switch (menus[0]) {
    case 'games':
      return <Games />;
    case 'game':
      return (
        <RecoilRoot initializeState={initializeState}>
          <Game
            position={Number(menus[1])}
            teamId={menus[2]}
          />
        </RecoilRoot>
      );
    case 'users':
      return <Users />;
    default:
      throw new Error(`Unknown menu ${menu}`);
  }
}

export default AppDisplayComponent;
