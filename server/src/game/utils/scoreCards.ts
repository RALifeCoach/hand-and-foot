import { ICard, IGameBase } from "../../../models/game";
import getCardPoints from "./getCardPoints";

const scoreCards = (gameRules: IGameBase, cards: ICard[]): number => {
  return cards.reduce((cardPoints, card) => {
    return cardPoints + getCardPoints(gameRules, card);
  }, 0);
};

export default scoreCards;
