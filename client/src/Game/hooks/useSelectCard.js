import {useCallback} from 'react';

const useSelectCard = () =>
  useCallback((cards, card) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    const updateCard = newCards.find(findCard => findCard.cardId === card.cardId);
    updateCard.selected = !card.selected;
    return newCards;
  }, []);

export default useSelectCard;