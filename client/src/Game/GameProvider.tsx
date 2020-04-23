import React, { useEffect, useReducer, memo, ReactNode } from 'react';
import GameContext, { IGameContextState } from "./GameContext";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { IAction } from "General";

const STATIC_OPTIONS = {
  shouldReconnect: () => true, //Will attempt to reconnect on all close events, such as server shutting down
};

interface IProps {
  children: ReactNode;
  gameId: string;
  playerId: string;
  teamId: string;
  position: number;
}

const GameProvider = ({ children, gameId, playerId, teamId, position }: IProps) => {
  const [state, dispatch] = useReducer((state: IGameContextState, action: IAction) => {
    switch (action.type) {
      case 'setReadyState':
        return { ...state, readyState: action.value };
      case 'sendMessage':
        if (state.readyState !== ReadyState.OPEN || state.savedMessages.length) {
          return { ...state, savedMessages: [...state.savedMessages, action.value] };
        }
        return { ...state, currentMessage: action.value };
      case 'popMessage':
        const [nextMessage, ...rest] = state.savedMessages;
        return { ...state, currentMessage: nextMessage, savedMessages: rest };
      case 'clearMessage':
        return { ...state, currentMessage: null };
      case 'setLastMessage':
        const message = action.value;
        switch (message.type) {
          case 'updateGame':
            return { ...state, lastMessage: action.value, game: message.game };
          default:
            throw new Error(`unknown message type ${action.value.type}`);
        }
      default:
        return state;
    }
  }, {
    lastMessage: null,
    readyState: null,
    savedMessages: [],
    currentMessage: null,
    game: null,
  } as IGameContextState);

  const socketUrl = 'ws://localhost:3010';
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl, STATIC_OPTIONS);

  useEffect(() =>
    sendMessage(JSON.stringify({
      type: 'addPlayer',
      value: { gameId: gameId, playerId, teamId, position }
    }))
    , [sendMessage, gameId, playerId, teamId, position]);

  useEffect(() => {
    dispatch({ type: 'setReadyState', value: readyState });
  }, [readyState]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && state.savedMessages.length && !state.currentMessage) {
      dispatch({ type: 'popMessage', value: null });
    }
  }, [state.savedMessages, readyState, state.currentMessage]);

  useEffect(() => {
    if (state.currentMessage) {
      sendMessage(state.currentMessage);
      dispatch({ type: 'clearMessage', value: null });
    }
  }, [state.currentMessage, sendMessage]);

  useEffect(() => {
    if (lastMessage) {
      const body = JSON.parse(lastMessage.data);
      dispatch({ type: 'setLastMessage', value: body });
    }
  }, [lastMessage]);

  return (
    <>
      <GameContext.Provider
        value={{
          gameDispatch: dispatch,
          gameState: state,
        }}
      >
        {children}
      </GameContext.Provider>
    </>
  );
};

export default memo(GameProvider);
