declare module 'Game' {
  export type ISuit = 'C' | 'D' | 'H' | 'S' | 'J';
  export type IRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  export type IGameState = 'waitingToStart' | 'inPlay' | 'finished' | 'paused';
  export type IPlayerState = 'playing' | 'waiting';
  export type IPosition = 0 | 1 | 2 | 3;

  export interface ICard {
    cardId: number;
    suit: ISuit;
    rank: IRank;
    pinValue: number;
    selected?: boolean;
    cardText?: string;
  }

  export interface IDummyCard {
    cardText?: string;
    suit?: ISuit;
    selected?: boolean;
  }

  export interface IMeld {
    cards: ICard[],
    isComplete: boolean,
  }

  export interface IMelds {
    redThrees: number;
    cleanMelds: IMeld[];
    dirtyMelds: IMeld[];
    runs: IMeld[];
    wildCards: IMeld[];
  }

  export interface ITeam {
    teamId: string;
    melds: IMelds
  }

  export interface IPlayerCurrent {
    playerId: number;
    playerName: string;
    playerState: IPlayerState;
    numberOfCardsToDraw: number;
    cards: ICard[];
    isPlayerTurn: boolean;
    isInHand: boolean;
  }

  export interface IPlayerOther {
    playerId: number;
    playerName: string;
    cards: number;
    isPlayerTurn: boolean;
    isInHand: boolean;
  }


  export interface IGame {
    gameId: number;
    gameName: string;
    gameState: IGameState;
    currentPlayer: IPlayerCurrent;
    otherPlayers: IPlayerOther[];
    teams: {[teamId: string]:ITeam};
  }
}
