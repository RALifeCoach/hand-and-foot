import React, { useEffect, memo, ReactNode } from 'react';
import GameContext from "./GameContext";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useGameReducer from './hooks/useGameReducer';
import SnackMessage from '../shared/SnackMessage';

const STATIC_OPTIONS = {
  shouldReconnect: () => true, //Will attempt to reconnect on all close events, such as server shutting down
};

interface IProps {
  children: ReactNode;
  gameId: number;
  playerId: number;
  teamId: string;
  position: number;
}

const GameProvider = ({ children, gameId, playerId, teamId, position }: IProps) => {
  const [state, dispatch] = useGameReducer(gameId, playerId);

  const socketUrl = 'ws://localhost:3010';
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl, STATIC_OPTIONS);

  useEffect(() => {
    dispatch({
      type: 'sendMessage', value: {
        type: 'addPlayer',
        value: { gameId, playerId, teamId, position }
      }
    })
  }, [dispatch, gameId, playerId, position, teamId]);

  useEffect(() => {
    dispatch({ type: 'setReadyState', value: readyState });
  }, [readyState, dispatch]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && state.savedMessages.length && !state.currentMessage) {
      dispatch({ type: 'popMessage', value: null });
    }
  }, [state.savedMessages, readyState, state.currentMessage, dispatch]);

  useEffect(() => {
    if (state.currentMessage) {
      sendMessage(state.currentMessage);
      dispatch({ type: 'clearMessage', value: null });
    }
  }, [state.currentMessage, sendMessage, dispatch]);

  useEffect(() => {
    if (lastMessage) {
      const body = JSON.parse(lastMessage.data);
      dispatch({ type: 'setLastMessage', value: body });
    }
  }, [lastMessage, dispatch]);

  return (
    <>
      <GameContext.Provider
        value={{
          gameDispatch: dispatch,
          gameState: state,
          gameId: gameId,
          playerId: playerId,
        }}
      >
        {children}
        <SnackMessage
          open={Boolean(state.error)}
          message={state.error}
          type="error"
          onClose={() => dispatch({type: 'clearError', value: null})}
        />
      </GameContext.Provider>
    </>
  );
};

export default memo(GameProvider);
