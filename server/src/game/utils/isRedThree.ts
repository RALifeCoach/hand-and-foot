import { ICard } from "../../../models/game";

const isRedThree = (card: ICard) =>
  card.rank === '3' && ['D', 'H'].indexOf(card.suit) > -1;

export default isRedThree;
