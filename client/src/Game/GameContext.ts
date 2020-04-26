import React from 'react';
import {IDispatch} from "General";
import {IGame, ICard} from "Game";

export interface IGameContextState {
  lastMessage: string | null;
  readyState: number | null;
  savedMessages: any[];
  currentMessage: string | null;
  game: IGame | null;
  cards: ICard[];
  sortOrder: string;
  cardMoving: ICard | null;
}

export interface IGameContext {
  gameDispatch: IDispatch;
  gameState: IGameContextState;
  gameId: number;
  playerId: number;
}

const GameContext = React.createContext({} as IGameContext);

export default GameContext;
