import {useCallback} from 'react';

const useRePinCards = () =>
  useCallback((cards) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    const lastPinnedCardReverseIndex = cards.reverse().findIndex(card => card.pinValue);
    if (lastPinnedCardReverseIndex > -1) {
      const lastPinnedCardIndex = cards.length - lastPinnedCardReverseIndex;
      for (let i = 0; i < lastPinnedCardIndex; i++) {
        newCards[i].pinValue = i + 1;
      }
    }
    return newCards;
  }, []);

export default useRePinCards;