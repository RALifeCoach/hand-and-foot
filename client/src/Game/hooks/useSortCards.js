import {useCallback} from 'react';

const useSortCards = () =>
  useCallback((cards, sortOrder) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    if (sortOrder === 'rank') {
      return [
        ...newCards.filter(card => card.pinValue)
          .sort((cardA, cardB) => cardA.pinValue - cardB.pinValue),
        ...newCards.filter(card => !card.pinValue && (card.suit === 'J' || card.value === 1)),
        ...newCards.filter(card => !card.pinValue && card.suit !== 'J' && card.value > 2)
          .sort((cardA, cardB) => (cardB.value - cardA.value)),
        ...newCards.filter(card => !card.pinValue && (card.suit === 'D' || card.suit === 'H') && card.value === 2),
        ...newCards.filter(card => !card.pinValue && (card.suit === 'C' || card.suit === 'S') && card.value === 2)
      ];
    }
    if (sortOrder === 'suit') {
      return [
        ...newCards.filter(card => card.pinValue)
          .sort((cardA, cardB) => cardA.pinValue - cardB.pinValue),
        ...newCards.filter(card => !card.pinValue && (card.suit === 'J' || card.value === 1)),
        ...newCards.filter(card => !card.pinValue && card.suit !== 'J' && card.value > 2)
          .sort((cardA, cardB) => (
            cardA.suit > cardB.suit
              ? 1
              : cardA.suit < cardB.suit
              ? -1
              : cardB.value - cardA.value
          )),
        ...newCards.filter(card => !card.pinValue && (card.suit === 'D' || card.suit === 'H') && card.value === 2),
        ...newCards.filter(card => !card.pinValue && (card.suit === 'C' || card.suit === 'S') && card.value === 2)
      ];
    }
    return [
      ...newCards.filter(card => card.pinValue)
        .sort((cardA, cardB) => cardA.pinValue - cardB.pinValue),
      ...newCards.filter(card => !card.pinValue)
    ];
  }, []);

export default useSortCards;