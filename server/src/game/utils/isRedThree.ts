import { ICard } from "Game";

const isRedThree = (card: ICard) =>
  card.rank === '3' && ['D', 'H'].indexOf(card.suit) > -1;

export default isRedThree;
