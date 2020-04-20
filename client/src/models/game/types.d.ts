declare module 'Game' {
  export type ISuit = 'C' | 'D' | 'H' | 'S' | 'J';
  export type IRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  export type IGameState = 'waitingToStart' | 'inPlay' | 'finished';
  export type IPosition = 0 | 1 | 2 | 3;

  export interface ICard {
    cardId: string;
    suit: ISuit;
    rank?: IRank;
    pinValue: number;
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
    cards: ICard[];
    isPlayerTurn: boolean,
    isInHand: boolean,
  }

  export interface IPlayerOther {
    cards: number;
    isPlayerTurn: boolean,
    isInHand: boolean,
  }


  export interface IGame {
    currentPlayer: IPlayerCurrent;
    otherPlayers: IPlayerOther[];
    teams: {[teamId: string]:ITeam};
  }
}
