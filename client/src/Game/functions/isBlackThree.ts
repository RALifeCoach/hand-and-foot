import { ICard } from "../../queries/game";

const isBlackThree = (card: ICard) =>
  card.rank === '3' && ['C', 'S'].indexOf(card.suit) > -1;

export default isBlackThree;
