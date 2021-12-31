declare module 'Game' {
  export type IPlayerState = 'playing' | 'waiting' | 'draw' | 'draw7';
  export type IPosition = 0 | 1 | 2 | 3;

  export interface IPlayerCurrent {
    playerId: number;
    playerName: string;
    playerState: IPlayerState;
    numberOfCardsToDraw: number;
    cards: ICard[];
    isPlayerTurn: boolean;
    isInHand: boolean;
    teamId: string;
    sortOrder: string;
  }

  export interface IGamePlay {
    gameId: number;
    gameState: IGameState;
    players: IPlayerState[];
    currentPlayer: IPlayerCurrent;
    otherPlayers: IPlayerOther[];
    teams: { [teamId: string]: ITeam };
    messages: IMessage[];
    discardCard: ICard | null;
    discardCount: number;
    pickupPiles: number[];
    pileIsLocked: boolean;
    minimumPoints: number;
  }

  export interface IPlayerOther {
    playerId: number;
    playerName: string;
    cards: number;
    isPlayerTurn: boolean;
    isInHand: boolean;
    teamId: string;
  }


  export interface IPlayerDb {
    playerId: number;
    playerName: string;
    position: number;
  }

  export interface IGameDb {
    gameid?: number;
    gamename: string;
    gamestate: IGameState;
    gameplay: { [playerId: string]: IPlayerDb }
    gamerules: IGameBase
  }

  export interface IGameRow {
    gameid?: number;
    gamename: string;
    gamestate: IGameState;
    gameplay: IGamePlay;
    canPickupWithWild?: boolean;
    canLockDiscards?: boolean;
    canOverFillMeld?: boolean;
    redThreeScore?: number;
    wildCardMeldScore?: number;
    canDraw7?: boolean;
    players?: { [position: string]: { name: string; playerId: number } };
  }

  export interface IGamesPlayer {
    playerId: number
    playerName: string
    position: number
  }

  export interface IGamesRow {
    gameId?: number
    gameName: string
    gameState?: string
    numberOfPlayers: number
    players: IGamesPlayer[]
  }
}
