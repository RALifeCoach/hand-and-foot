import { ICard, IGame } from "Game";
import getCardPoints from "./getCardPoints";

const scoreCards = (game: IGame, cards: ICard[]): number => {
  return cards.reduce((cardPoints, card) => {
    return cardPoints + getCardPoints(game, card);
  }, 0);
};

export default scoreCards;
