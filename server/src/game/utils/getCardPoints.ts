import { ICard, IRank } from "Game";

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

const getCardPoints = (card: ICard) =>
  card.suit === "J" ? 50 : CARD_POINTS[card.rank as IRank];

export default getCardPoints;
