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
  export type IGameState =
    | "waitingToStart"
    | "inPlay"
    | "finished"
    | "waitingToReStart";
  export type IPlayerState = "playing" | "waiting" | "draw";
  export type IPosition = 0 | 1 | 2 | 3;
  export type IMeldType = "3s" | "clean" | "dirty" | "run" | "wild";

  export interface ICard {
    cardId: number;
    suit: ISuit;
    rank: IRank;
    pinValue: number;
    cardText?: string;
  }

  export interface IDummyCard {
    cardText?: ReactNode;
    suit?: ISuit;
    selected?: boolean;
  }

  export interface IMeld {
    meldId: string;
    cards: ICard[];
    isComplete: boolean;
    type: IMeldType;
    rank?: IRank;
  }

  export interface ITeam {
    teamId: string;
    isDown: boolean;
    melds: { [meldId: string]: IMeld };
    scoreBase: number;
    scoreCards: number;
  }

  export interface IPlayerCurrent {
    playerId: number;
    playerName: string;
    playerState: IPlayerState;
    numberOfCardsToDraw: number;
    cards: ICard[];
    isPlayerTurn: boolean;
    isInHand: boolean;
    teamId: string;
  }

  export interface IPlayerOther {
    playerId: number;
    playerName: string;
    cards: number;
    isPlayerTurn: boolean;
    isInHand: boolean;
    teamId: string;
  }

  export interface IMessage {
    isSent: boolean;
    type: IMessageType;
    playerName: string;
    text: string;
  }

  export interface IGame {
    gameId: number;
    gameName: string;
    gameState: IGameState;
    currentPlayer: IPlayerCurrent;
    otherPlayers: IPlayerOther[];
    teams: { [teamId: string]: ITeam };
    messages: IMessage[];
    discardCard: ICard | null;
    discardCount: number;
    pickupPiles: number[];
    pileIsLocked: boolean;
    minimumPoints: number;
    canPickupWithWild: boolean;
    canLockDiscards: boolean;
    canOverFillMeld: boolean;
    redThreeScore: number;
    wildCardMeldScore: number;
    canDraw7: boolean;
  }

  export type IRuleType =
    | "canDraw7"
    | "canDiscardWild"
    | "redThreeScore"
    | "start7MinRound"
    | "wildCardMeldScore"
    | "canOverfillMeld";
  export interface IRules {
    canDraw7: boolean;
    redThreeScore: number;
    canDiscardWild: boolean;
    start7MinRound: number;
    wildCardMeldScore: number;
    canOverfillMeld: boolean;
  }
}
