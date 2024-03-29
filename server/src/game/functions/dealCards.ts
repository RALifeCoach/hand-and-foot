import { ICard } from "../../../models/game";
import { RANKS, SUITS } from "../../../constants";

const dealCards = (): ICard[] => {
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
  return deck;
};

export default dealCards;
