import {ICard, IGame} from "Game";
import * as uuid from "uuid";
import {RANKS, SUITS} from "../../constants";

const startGame = (gameName: string, numberOfPlayers: number) => {
  const deck: ICard[] = [];
  for (let deckIndex = 0; deckIndex < 6; deckIndex++) {
    for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
      for (let rankIndex = 0; rankIndex < 13; rankIndex++) {
        deck.push({
          cardId: uuid.v4(),
          suit: SUITS[suitIndex],
          rank: RANKS[rankIndex],
          pinValue: 0
        });
      }
      deck.push({
        cardId: uuid.v4(),
        suit: SUITS[4],
        pinValue: 0
      });
      deck.push({
        cardId: uuid.v4(),
        suit: SUITS[4],
        pinValue: 0
      });
    }
  }
  return {
    gameId: uuid.v4(),
    name: gameName,
    deck,
    players: {},
    teams: {},
    discard: [],
    gameState: 'waitingToStart',
    numberOfPlayers,
  } as IGame;
};

export default startGame;
