import React from 'react';
import {IDispatch} from "General";
import {IGame} from "Game";

export interface IGameContextState {
  lastMessage: string | null;
  readyState: number | null;
  savedMessages: any[];
  currentMessage: string | null;
  game: IGame | null;
}

export interface IGameContext {
  gameDispatch: IDispatch;
  gameState: IGameContextState;
}

const GameContext = React.createContext({} as IGameContext);

export default GameContext;
