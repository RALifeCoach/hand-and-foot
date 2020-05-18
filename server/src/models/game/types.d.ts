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
    | "waitingToReStart"
    | "askRoundEnd";
  export type IPosition = 0 | 1 | 2 | 3;
  export type IPlayerState = "playing" | "waiting" | "draw" | "draw7";
  export type IRoundSequence = "random" | "sequential";
  export type IMeldType = "3s" | "clean" | "dirty" | "run" | "wild";
  export type IMessageType =
    | "started"
    | "added"
    | "completed"
    | "foot"
    | "draw7";

  export interface ICard {
    cardId: number;
    suit: ISuit;
    rank?: IRank;
    pinValue: number;
    isFromPile?: boolean;
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
    scoreOnTable: number;
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

  export interface IMessage {
    isSent: boolean;
    type: IMessageType;
    playerName: string;
    text: string;
  }

  export interface IGamePlay {
    deck: ICard[];
    pickupPiles: ICard[][];
    discard: ICard[];
    pileIsLocked: boolean;
    players: {
      [playerId: string]: IPlayer;
    };
    teams: {
      [teamId: string]: ITeam;
    };
    gameState: IGameState;
    currentRound: number;
    currentPlayerId: number;
    rounds: IRound[];
    transactionLog: ILogEntry[];
    messages: IMessage[];
    minimumPoints: number;
    toDiscardId: number;
  }

  export interface IGameRules {
    numberOfPlayers: number;
    numberOfRounds: number;
    roundSequence: IRoundSequence;
    wildCardMeldScore: number;
    runScore: number;
    cleanScore: number;
    dirtyScore: number;
    canPickupWithWild: boolean;
    canLockDiscards: boolean;
    askRoundEnd: boolean;
    canOverFillMeld: boolean;
    redThreeScore: number;
    canDraw7: boolean;
    minimumRoundNatural7: number;
  }

  export interface IGame {
    GameId: number;
    GameName: string;
    GameRules: IGameRules;
    GamePlay: IGamePlay;
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

  export interface IGameInfo extends IGameRules {
    gameId: number;
    gameName: string;
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
}
