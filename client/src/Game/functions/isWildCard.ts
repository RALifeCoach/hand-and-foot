import { ICard } from "../../queries/game";

const isWildCard = (card: ICard) =>
  card.suit === 'J' || card.rank === '2';

export default isWildCard;
