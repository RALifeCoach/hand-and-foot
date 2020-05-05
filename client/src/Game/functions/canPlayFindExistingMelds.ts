import { ICard, IMeld, IGame } from "Game";
import isWildCard from "./isWildCard";
import checkRunCards from "./checkRunCards";
import { ICardMapping } from "./mapCards";

const canPlayFindExistingMelds = (
  game: IGame,
  meld: IMeld | null,
  cards: ICard[],
  mapping: ICardMapping,
) => {
  if (meld === null) {
    return Object.values(
      game.teams[game.currentPlayer.teamId].melds
    ).filter((meld) => {
      if (meld.isComplete) {
        return false;
      }
      if (cards.length === 1 && isWildCard(cards[0])) {
        return meld.type !== "run";
      }
      // may be adding to a run
      if (meld.type === "run") {
        if (mapping.others.wild > 0) {
          return false;
        }
        if (
          (cards.length > 1 && Object.keys(mapping.ranks).length === 1) ||
          cards[0].suit !== meld.cards[0].suit
        ) {
          return false;
        }
        const newMeld = [...meld.cards, ...cards];
        return checkRunCards(newMeld);
      }

      // may be adding to meld
      if (meld.type === "clean" || meld.type === "dirty") {
        return (
          Object.keys(mapping.ranks).length === 1 && mapping.ranks[meld.rank || '']
        );
      }

      // wild card meld
      return mapping.others.wild > 0 && Object.keys(mapping.suits).length === 0;
    });
  }
  return [meld];
};

export default canPlayFindExistingMelds;
