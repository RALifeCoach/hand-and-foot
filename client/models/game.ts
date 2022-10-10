export type ISuit = 'C' | 'D' | 'H' | 'S' | 'J';
export type IRank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';
export type IGameState =
  | 'waitingToStart'
  | 'inPlay'
  | 'finished'
  | 'askRoundEnd'
  | 'waitingToReStart';
export type IPlayerState = 'playing' | 'waiting' | 'draw' | 'draw7';
export type IPosition = 0 | 1 | 2 | 3;
export type IMeldType = '3s' | 'clean' | 'dirty' | 'run' | 'wild';
export type IRoundSequence = 'random' | 'sequential';

export type IMessageType =
  | 'started'
  | 'added'
  | 'completed'
  | 'foot'
  | 'draw7';

export interface ICard {
  cardId: number;
  suit: ISuit;
  rank?: IRank;
  pinValue: number;
  cardText?: string;
  isFromPile?: boolean;
}

export interface IDummyCard {
  cardText?: any;
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
  scoreOnTable: number;
}

export interface IMessage {
  isSent: boolean;
  type: IMessageType;
  playerName: string;
  text: string;
}

export interface IServerQuestionButton {
  text: string;
  sendType: string;
  sendValue: any;
}

export interface IServerQuestion {
  title: string;
  message: string;
  buttons: IServerQuestionButton[];
}

export interface IFinishGame {
  title: string;
  message: string;
}

export interface IGameBase {
  gameId: number;
  gameName: string;
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
