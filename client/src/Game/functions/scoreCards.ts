import { ICard, IGameBase } from "Game";
import getCardPoints from "./getCardPoints";

const scoreCards = (gameBase: IGameBase, cards: ICard[]): number => {
  return cards.reduce((cardPoints, card) => {
    return cardPoints + getCardPoints(gameBase, card);
  }, 0);
};

export default scoreCards;
