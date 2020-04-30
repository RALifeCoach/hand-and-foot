import {ICard} from "Game";

const drawCards = (deck: ICard[], numberOfCards: number): ICard[] => {
  const cards: ICard[] = [];
  for (let cardIndex = 0; cardIndex < numberOfCards; cardIndex++) {
    const cardIndex = Math.floor(Math.random() * deck.length + 1);
    if (cardIndex === deck.length) {
      cardIndex === deck.length - 1;
    }
    const card = deck.splice(cardIndex, 1);
    if (!card) {
      console.log(card, cardIndex, deck);
      throw new Error("invalid card");
    }
    cards.push(card[0]);
  }
  return cards;
};

export default drawCards;
