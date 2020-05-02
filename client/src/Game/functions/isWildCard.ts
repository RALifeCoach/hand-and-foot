import { ICard } from "Game";

const isWildCard = (card: ICard) =>
  card.suit === 'J' || card.rank === '2';

export default isWildCard;
