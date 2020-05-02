import { ICard, IGameJson } from "Game";
import { RANKS, SUITS, ROUNDS } from "../../../constants";

const startGame = (numberOfPlayers: number) => {
  const numberOfRounds = 7;
  const deck: ICard[] = [];
  for (let deckIndex = 0; deckIndex < 6; deckIndex++) {
    for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
      for (let rankIndex = 0; rankIndex < 13; rankIndex++) {
        deck.push({
          cardId: deckIndex * 52 + suitIndex * 13 + rankIndex + 1,
          suit: SUITS[suitIndex],
          rank: RANKS[rankIndex],
          pinValue: 0,
        });
      }
    }
    deck.push({
      cardId: 501 + deckIndex,
      suit: "J",
      pinValue: 0,
    });
    deck.push({
      cardId: 511 + deckIndex,
      suit: "J",
      pinValue: 0,
    });
  }
  return Number(numberOfPlayers) === 3
    ? {
      deck,
      players: {},
      teams: {},
      discard: [],
      gameState: "waitingToStart",
      numberOfPlayers: Number(numberOfPlayers),
      currentPlayerId: 0,
      numberOfRounds: numberOfRounds,
      rounds: ROUNDS.slice(0, numberOfRounds),
      roundSequence: "sequential",
      currentRound: -1,
      transactionLog: [],
      minimumPoints: 0,
      canOverFillMeld: false,
      redThreeScore: 100,
      wildCardMeldScore: 1000,
      runScore: 2000,
      cleanScore: 500,
      dirtyScore: 300,
      canPickupWithWild: true,
      canLockDiscards: true,
    } as IGameJson
    : {
      deck,
      players: {},
      teams: {},
      discard: [],
      gameState: "waitingToStart",
      numberOfPlayers: Number(numberOfPlayers),
      currentPlayerId: 0,
      numberOfRounds: numberOfRounds,
      rounds: ROUNDS.slice(0, numberOfRounds),
      roundSequence: "random",
      currentRound: -1,
      transactionLog: [],
      minimumPoints: 0,
      canOverFillMeld: true,
      redThreeScore: -500,
      wildCardMeldScore: 500,
      runScore: 1000,
      cleanScore: 300,
      dirtyScore: 100,
      canPickupWithWild: false,
      canLockDiscards: false,
    } as IGameJson;
};

export default startGame;
