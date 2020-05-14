import React, { memo, ReactNode, useCallback, useEffect, useReducer } from 'react';
import MainContext, { IMainContextState } from "./MainContext";
import { IAction } from "General";
import getWindowSize from "./getWindowSize";

interface IProps {
  children: ReactNode;
  config: any;
}

const MainProvider = ({ children, config }: IProps) => {
  const [mainState, mainDispatch] = useReducer((state: IMainContextState, action: IAction) => {
    if (action.type === 'user') {
      if (action.value) {
        const menu = action.value.role === 'admin' ? 'users' : 'games';
        return { ...state, [action.type]: action.value, menu };
      }
      return { ...state, [action.type]: action.value };
    }
    if (action.type === 'play') {
      return {
        ...state,
        gameId: action.value.gameId,
        menu: `game:${action.value.position}:${action.value.teamId}`,
      }
    }
    return { ...state, [action.type]: action.value };
  }, {
    user: null,
    menu: '',
    windowSize: getWindowSize(window.innerWidth),
    gameId: 0,
  } as IMainContextState);

  const onWindowResize = useCallback(event => {
    const size = event.target.innerWidth;
    const windowSize = getWindowSize(size);
    if (mainState.windowSize !== windowSize) {
      mainDispatch({ type: 'windowSize', value: windowSize });
    }
  }, [mainDispatch, mainState]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    }
  }, [onWindowResize]);

  useEffect(() => {
    const user = localStorage.getItem('handf:user');
    if (user) {
      mainDispatch({ type: 'user', value: JSON.parse(user) });
    }
  }, [mainDispatch]);

  return (
    <>
      <MainContext.Provider
        value={{
          mainState,
          config,
          mainDispatch,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  );
};

export default memo(MainProvider);
