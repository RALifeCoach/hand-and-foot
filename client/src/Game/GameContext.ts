import React from "react";
import { IDispatch } from "General";
import { IGame, ICard, IMessage } from "Game";

export interface IGameContextState {
  lastMessage: string | null;
  readyState: number | null;
  savedMessages: any[];
  currentMessage: string | null;
  game: IGame | null;
  selected: { [cardId: string]: boolean };
  sortOrder: string;
  cardMoving: ICard | null;
  error: string;
  messages: IMessage[];
  newMessages: boolean;
  messageId: string;
}

export interface IGameContext {
  gameDispatch: IDispatch;
  gameState: IGameContextState;
  gameId: number;
  playerId: number;
}

const GameContext = React.createContext({} as IGameContext);

export default GameContext;
