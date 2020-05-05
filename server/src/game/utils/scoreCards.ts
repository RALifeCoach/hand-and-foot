import { ICard, IGameJson } from "Game";
import getCardPoints from "./getCardPoints";

const scoreCards = (game: IGameJson, cards: ICard[]): number => {
  return cards.reduce((cardPoints, card) => {
    return cardPoints + getCardPoints(game, card);
  }, 0);
};

export default scoreCards;
