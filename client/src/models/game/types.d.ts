declare module 'Game' {
  export interface IPlayerCurrent {
    playerId: number;
    playerName: string;
    playerState: IPlayerState;
    numberOfCardsToDraw: number;
    numberOfCardsToReplace: number;
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
