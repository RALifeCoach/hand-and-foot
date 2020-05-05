import { ICard } from "Game";

const drawCards = (deck: ICard[], numberOfCards: number): ICard[] => {
  const cards: ICard[] = [];
  for (let cardIndex = 0; cardIndex < numberOfCards; cardIndex++) {
    const cardIndex = Math.floor(Math.random() * deck.length);
    if (cardIndex === deck.length) {
      cardIndex === deck.length - 1;
    }
    const card = deck.splice(cardIndex, 1);
    cards.push(card[0]);
  }
  return cards;
};

export default drawCards;
