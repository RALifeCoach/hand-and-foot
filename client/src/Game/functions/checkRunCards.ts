import { ICard, IMeldType, IRank } from "../../../models/game";
import mapCards from "./mapCards";
import getCardValue from "./getCardValue";

const checkRunCards = (cards: ICard[]): { meldType: IMeldType; meldRank?: IRank } | null => {
  const mapping = mapCards(cards);

  // make sure there are no duplicates
  if ((Object.values(mapping.ranks) as number[]).some(rank => rank > 1)) {
    return null;
  }
  // make sure no gaps
  const minCard = Math.min(...cards.map(card => getCardValue(card.rank)));
  const maxCard = Math.max(...cards.map(card => getCardValue(card.rank)));
  return cards.length === maxCard - minCard + 1 ? {meldType: 'run'} : null;
};

export default checkRunCards;
