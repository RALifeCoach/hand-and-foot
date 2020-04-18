import {useCallback} from 'react';

const useMoveCard = () =>
  useCallback((cards, destCard, sourceCard) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    const sourceIndex = newCards.findIndex(findCard => findCard.cardId === sourceCard.cardId);
    if (!destCard) {
      return [
        ...newCards.slice(0, sourceIndex),
        ...newCards.slice(sourceIndex + 1),
        {
          ...sourceCard,
          selected: false,
        },
      ];
    }
    const destIndex = newCards.findIndex(findCard => findCard.cardId === destCard.cardId);
    if (sourceIndex < destIndex) {
      return [
        ...newCards.slice(0, sourceIndex),
        ...newCards.slice(sourceIndex + 1, destIndex),
        {
          ...sourceCard,
          selected: false,
        },
        ...newCards.slice(destIndex),
      ];
    }
    if (sourceIndex > destIndex) {
      return [
        ...newCards.slice(0, destIndex),
        {
          ...sourceCard,
          selected: false,
        },
        ...newCards.slice(destIndex, sourceIndex),
        ...newCards.slice(sourceIndex + 1),
      ];
    }
    return newCards;
  }, []);

export default useMoveCard;