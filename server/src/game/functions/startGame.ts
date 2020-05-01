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
  return {
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
  } as IGameJson;
};

export default startGame;
