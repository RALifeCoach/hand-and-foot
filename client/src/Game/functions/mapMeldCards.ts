import { ICard } from "../../queries/game";
import isWildCard from "./isWildCard";

const mapMeldCards = (cards: ICard[]) => {
  return cards.reduce((mapping, card) => {
    if (isWildCard(card)) {
      mapping.wild += 1;
    } else {
      mapping.naturals += 1;
    }
    return mapping;
  }, { wild: 0, naturals: 0} as { wild: number, naturals: number });
}

export default mapMeldCards;
