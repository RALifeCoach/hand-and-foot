import {useCallback} from 'react';

const usePinCard = () =>
  useCallback((cards, card) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    const updateCard = newCards.find(findCard => findCard.cardId === card.cardId);
    if (updateCard.pinValue) {
      newCards.forEach(card =>
        card.pinValue = card.pinValue > updateCard.pinValue ? card.pinValue - 1 : card.pinValue);
      updateCard.pinValue = 0;
    } else {
      updateCard.pinValue = cards.filter(card => card.pinValue).length + 1;
    }
    updateCard.selected = !card.selected;
    return newCards;
  }, []);

export default usePinCard;