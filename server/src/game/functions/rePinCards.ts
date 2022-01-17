import { ICard } from "../../../models/game";

const rePinCards = (cards: ICard[]) => {
  const maxPinIndex = cards.reduce(
    (max, card, index) => (card.pinValue ? index : max),
    -1
  );
  if (maxPinIndex > -1) {
    cards.forEach((card, index) => {
      if (index <= maxPinIndex) {
        card.pinValue = index + 1;
      }
    });
  }
  return cards;
};

export default rePinCards;
