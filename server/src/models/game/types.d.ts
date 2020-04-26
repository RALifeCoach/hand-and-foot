declare module "Game" {
  export type ISuit = "C" | "D" | "H" | "S" | "J";
  export type IRank =
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K"
    | "A";
  export type IGameState = "waitingToStart" | "inPlay" | "finished";
  export type IPosition = 0 | 1 | 2 | 3;
  export type IPlayerState = "playing" | "waiting" | "drawing";
  export type IRoundSequence = "random" | "sequential";

  export interface ICard {
    cardId: number;
    suit: ISuit;
    rank?: IRank;
    pinValue: number;
  }

  export interface IPlayer {
    playerId: number;
    playerName: string;
    teamId: string;
    position: IPosition;
    playerState: IPlayerState;
    numberOfCardsToDraw: number;
    hand: ICard[];
    foot: ICard[];
    isInHand: boolean;
    sortOrder: string;
  }

  export interface IMeld {
    cards: ICard[];
    isComplete: boolean;
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
    melds: IMelds;
  }

  export interface IRound {
    roundId: number;
    minimumScore: number;
    teams: {
      [teamId: string]: {
        scoreBase: number;
        scoreCards: number;
      }
    }
  }

  export interface IGameJson {
    deck: ICard[];
    discard: ICard[];
    players: {
      [playerId: string]: IPlayer;
    };
    teams: {
      [teamId: string]: ITeam;
    };
    gameState: IGameState;
    numberOfPlayers: number;
    currentPlayerId: number;
    numberOfRounds: number;
    rounds: IRound[];
    roundSequence: IRoundSequence;
  }

  export interface IGame {
    gameId: number;
    name: string;
    gameJson: IGameJson;
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
  }

  export interface IPlayerOther {
    playerId: number;
    playerName: string;
    playerState: IPlayerState;
    cards: number;
    isPlayerTurn: boolean;
    isInHand: boolean;
  }

  export interface IPlayerInfo {
    gameState: IGameState;
    currentPlayer: IPlayerCurrent;
    otherPlayers: IPlayerOther[];
    teams: { [teamId: string]: ITeam };
  }
}
