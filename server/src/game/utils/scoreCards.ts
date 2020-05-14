import { ICard, IGameRules } from "Game";
import getCardPoints from "./getCardPoints";

const scoreCards = (gameRules: IGameRules, cards: ICard[]): number => {
  return cards.reduce((cardPoints, card) => {
    return cardPoints + getCardPoints(gameRules, card);
  }, 0);
};

export default scoreCards;
