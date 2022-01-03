import {
  ICard,
  IGameState,
  IMessage,
  IPlayerState,
  IPosition,
  ITeam
} from '../../../models/game'

export interface IPlayer {
  playerId: number;
  teamId: string;
  position: IPosition;
  playerState: IPlayerState;
  playerName: string;
  numberOfCardsToDraw: number;
  numberOfCardsToReplace: number;
  hand: ICard[];
  foot: ICard[];
  isInHand: boolean;
  sortOrder: string;
}

export interface IPlayerDb {
  game_id: number;
  player_id: number;
  team: string;
  position: IPosition;
  player_state: IPlayerState;
  cards_to_draw: number;
  cards_to_replace: number;
  hand: ICard[];
  foot: ICard[];
  in_hand: boolean;
  sort_order: string;
  player_name: string;
}

export interface IRound {
  roundId: number;
  minimumScore: number;
  played: boolean;
  teams: {
    [teamId: string]: {
      scoreBase: number;
      scoreCards: number;
    };
  };
}

export interface ILogEntry {
  canUndo: boolean;
  logId: string;
}

export interface IGamePlay {
  deck: ICard[];
  pickupPiles: ICard[][];
  discard: ICard[];
  pileIsLocked: boolean;
  teams: {
    [teamId: string]: ITeam;
  };
  gameState: IGameState;
  currentRound: number;
  currentPlayerId: number;
  roundStartPlayerId: number;
  rounds: IRound[];
  transactionLog: ILogEntry[];
  messages: IMessage[];
  minimumPoints: number;
  toDiscardId: number;
}

export interface IPlayerCurrent {
  playerId: number;
  playerName: string;
  playerState: IPlayerState;
  numberOfCardsToDraw: number;
  cards: ICard[];
  isPlayerTurn: boolean;
  isInHand: boolean;
  sortOrder: string;
  teamId: string;
}

export interface IPlayerOther {
  playerId: number;
  playerName: string;
  playerState: IPlayerState;
  cards: number;
  isPlayerTurn: boolean;
  isInHand: boolean;
  teamId: string;
}

export interface IPlayerInfo {
  gameId: number;
  gameState: IGameState;
  currentPlayer: IPlayerCurrent;
  otherPlayers: IPlayerOther[];
  teams: { [teamId: string]: ITeam };
  discardCard: ICard | null;
  discardCount: number;
  pickupPiles: number[];
  pileIsLocked: boolean;
  minimumPoints: number;
}
