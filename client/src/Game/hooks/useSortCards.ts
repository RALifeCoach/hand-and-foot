import { useCallback } from "react";
import { ICard } from "Game";
import getCardValue from '../utils/getCardValue';

const useSortCards = () =>
  useCallback((cards: ICard[], sortOrder: string) => {
    const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
    debugger;
    const pinnedCards = newCards
      .filter((card) => card.pinValue)
      .sort((cardA, cardB) => cardA.pinValue - cardB.pinValue);
    const wildCards = newCards.filter(
      (card) => !card.pinValue && (card.suit === "J" || card.rank === "2")
    );
    const redThrees = newCards.filter(
      (card) =>
        !card.pinValue &&
        (card.suit === "C" || card.suit === "S") &&
        card.rank === "3"
    );
    const blackThrees = newCards.filter(
      (card) =>
        !card.pinValue &&
        (card.suit === "C" || card.suit === "S") &&
        card.rank === "3"
    );
    if (sortOrder === "rank") {
      const sortedCards = newCards
        .filter(
          (card) =>
            !card.pinValue && card.suit !== "J" && getCardValue(card.rank) > 2
        )
        .sort(
          (cardA, cardB) => getCardValue(cardB.rank) - getCardValue(cardA.rank)
        );
      return [
        ...pinnedCards,
        ...wildCards,
        ...sortedCards,
        ...redThrees,
        ...blackThrees,
      ];
    }
    if (sortOrder === "suit") {
      const sortedCards = newCards
        .filter(
          (card) =>
            !card.pinValue && card.suit !== "J" && getCardValue(card.rank) > 2
        )
        .sort((cardA, cardB) =>
          cardA.suit > cardB.suit
            ? 1
            : cardA.suit < cardB.suit
            ? -1
            : getCardValue(cardB.rank) - getCardValue(cardA.rank)
        );
      return [
        ...pinnedCards,
        ...wildCards,
        ...sortedCards,
        ...redThrees,
        ...blackThrees,
      ];
    }
    return [
      ...pinnedCards,
      ...newCards.filter((card) => !card.pinValue),
    ];
  }, []);

export default useSortCards;
