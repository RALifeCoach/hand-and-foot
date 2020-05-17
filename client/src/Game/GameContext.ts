import React from "react";
import { IDispatch } from "General";
import { IGameBase, IGamePlay, ICard, IMessage } from "Game";

export interface IGameContextState {
  lastMessage: string | null;
  readyState: number | null;
  savedMessages: any[];
  currentMessage: string | null;
  gameBase: IGameBase | null;
  gamePlay: IGamePlay | null;
  selected: { [cardId: string]: boolean };
  sortOrder: string;
  cardMoving: ICard | null;
  error: string;
  messages: IMessage[];
  newMessages: boolean;
  messageId: string;
  playerId: number;
  askRoundEnd: "";
}

export interface IGameContext {
  gameDispatch: IDispatch;
  gameState: IGameContextState;
  gameId: number;
  playerId: number;
}

const GameContext = React.createContext({} as IGameContext);

export default GameContext;
