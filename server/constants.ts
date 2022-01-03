import {IRank, ISuit} from '../models/game'
import {IRound} from './src/models/game'

export const SUITS: ISuit[] = ["C", "D", "H", "S", "J"];
export const RANKS: IRank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
export const ROUNDS: IRound[] = [
  {
    roundId: 0,
    minimumScore: 50,
    played: false,
    teams: {},
  },
  {
    roundId: 1,
    minimumScore: 90,
    played: false,
    teams: {},
  },
  {
    roundId: 2,
    minimumScore: 120,
    played: false,
    teams: {},
  },
  {
    roundId: 3,
    minimumScore: 150,
    played: false,
    teams: {},
  },
  {
    roundId: 4,
    minimumScore: 190,
    played: false,
    teams: {},
  },
  {
    roundId: 5,
    minimumScore: 220,
    played: false,
    teams: {},
  },
  {
    roundId: 6,
    minimumScore: 250,
    played: false,
    teams: {},
  },
  {
    roundId: 7,
    minimumScore: 290,
    played: false,
    teams: {},
  },
];

export const ACTION_RESPONSE: {
  [key: string]: { canUndo: boolean; sendToAll: boolean };
} = {
  addPlayer: {
    canUndo: false,
    sendToAll: true,
  },
  setSortOrder: {
    canUndo: false,
    sendToAll: false,
  },
  moveCard: {
    canUndo: false,
    sendToAll: false,
  },
  setPin: {
    canUndo: false,
    sendToAll: false,
  },
  drawCard: {
    canUndo: false,
    sendToAll: true,
  },
  draw7: {
    canUndo: true,
    sendToAll: false,
  },
  discardCard: {
    canUndo: false,
    sendToAll: true,
  },
  playCards: {
    canUndo: true,
    sendToAll: false,
  },
  disconnect: {
    canUndo: false,
    sendToAll: true,
  },
  undo: {
    canUndo: false,
    sendToAll: false,
  },
  endRound: {
    canUndo: false,
    sendToAll: true,
  },
};
