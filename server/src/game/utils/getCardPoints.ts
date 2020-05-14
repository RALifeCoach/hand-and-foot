import { ICard, IRank, IGameRules } from "Game";
import isRedThree from "./isRedThree";

const CARD_POINTS = {
  "2": 20,
  "3": 5,
  "4": 5,
  "5": 5,
  "6": 5,
  "7": 5,
  "8": 10,
  "9": 10,
  "10": 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 20,
};

const getCardPoints = (gameRules: IGameRules, card: ICard) => {
  if (isRedThree(card)) {
    return Math.abs(gameRules.redThreeScore);
  }
  return card.suit === "J" ? 50 : CARD_POINTS[card.rank as IRank];
};

export default getCardPoints;
