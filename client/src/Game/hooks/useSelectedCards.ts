import { ICard } from "Game";

const useSelectedCards = (cards: ICard[], selected: {[cardId: string]: boolean}) => {
  return cards.filter(card => selected[card.cardId]);
};

export default useSelectedCards;
