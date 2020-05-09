import { ISuit, IRank, IRound } from "Game";

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
  [key: string]: { logIt: boolean; canUndo: boolean; sendToAll: boolean };
} = {
  addPlayer: {
    logIt: false,
    canUndo: false,
    sendToAll: true,
  },
  setSortOrder: {
    logIt: false,
    canUndo: false,
    sendToAll: false,
  },
  moveCard: {
    logIt: false,
    canUndo: false,
    sendToAll: false,
  },
  setPin: {
    logIt: false,
    canUndo: false,
    sendToAll: false,
  },
  drawCard: {
    logIt: false,
    canUndo: false,
    sendToAll: true,
  },
  draw7: {
    logIt: true,
    canUndo: true,
    sendToAll: false,
  },
  discardCard: {
    logIt: true,
    canUndo: false,
    sendToAll: true,
  },
  playCards: {
    logIt: true,
    canUndo: true,
    sendToAll: false,
  },
  disconnect: {
    logIt: false,
    canUndo: false,
    sendToAll: true,
  },
  undo: {
    logIt: false,
    canUndo: false,
    sendToAll: false,
  },
};
