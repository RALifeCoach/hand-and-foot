import {gql} from '@apollo/client'
import {ReactNode} from 'react'

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
  rank: IRank;
  pinValue: number;
  cardText?: string;
  isFromPile?: boolean;
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

export const FETCH_GAME = gql`
query MyQuery($id: Int) {
  handf_game(where: {gameid: {_eq: $id}}) {
    gameid
    gamename
    gamerules
  }
}
`

export interface IFetchGame {
  gameid: number
  gamename: string
  gamerules: IGameBase
}

export const FETCH_GAMES_FILTERED = gql`
query MyQuery($states: [String!]) {
  handf_game(where: {gamestate: {_in: $states}}) {
    gameid
    gamename
    gamestate
    numberOfPlayers: gamerules(path: "$.numberOfPlayers")
  }
}
`

export const FETCH_GAMES_ALL = gql`
query MyQuery {
  handf_game(where: {}) {
    gameid
    gamename
    gamestate
    numberOfPlayers: gamerules(path: "$.numberOfPlayers")
  }
}
`

export interface IFetchGames {
  gameid: number
  gamename: string
  numberOfPlayers: number
}

export const TRUNCATE = gql`
mutation delete_all_games($play: json, $rules: json) {
  delete_handf_game(where: {}) {
    affected_rows
  }
  delete_handf_game_log(where: {}) {
    affected_rows
  }
  insert_handf_game(objects: {
    gamename: "Test Game",
    gameplay: $play,
    gamerules: $rules,
    gamestate: "waitingToStart"
  },  
  ) {
    affected_rows
    returning {
      gameid
    }
  }
}
`

export const UPDATE_GAME = gql`
mutation update_game($id: Int, $name: String!, $rules: json) {
  update_handf_game(where: {gameid: {_eq: $id}}, _set: {gamename: $name, gamerules: $rules}) {
    affected_rows
  }
}
`

export const CREATE_GAME = gql`
mutation create_game($name: String!, $play: json, $rules: json) {
  insert_handf_game(objects: {gamename: $name, gameplay: $play, gamerules: $rules, gamestate: $state}) {
    affected_rows
  }
}
`
