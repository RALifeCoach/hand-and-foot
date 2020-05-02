import { ICardMapping } from "./mapCards";
import { IMeld, ICard, IRank, IMeldType } from "Game";
import checkRunCards from "./checkRunCards";
import mapMeldCards from "./mapMeldCards";

const canPlayRegularCards = (
  mapping: ICardMapping,
  processMeld: IMeld | null,
  cards: ICard[]
): { meldType?: IMeldType; meldRank?: IRank; error: string } | null => {
  // mix of ranks and suits is not okay
  if (
    Object.keys(mapping.ranks).length > 1 &&
    Object.keys(mapping.suits).length > 1
  ) {
    return null;
  }

  // wild with multiple ranks is not okay
  if (Object.keys(mapping.ranks).length > 1 && mapping.others.wild > 1) {
    return null;
  }

  if (processMeld === null) {
    if (cards.length < 3) {
      return null;
    }
    // is it a meld?
    if (Object.keys(mapping.ranks).length === 1) {
      // check that there are more naturals than wild
      const rankCount: number = Object.values(mapping.ranks)[0];
      const rank = Object.keys(mapping.ranks)[0];
      return rankCount > (mapping.others.wild || 0)
        ? {
            meldType: mapping.others.wild ? "dirty" : "clean",
            meldRank: rank as IRank,
            error: "",
          }
        : null;
    }

    // it is a run - no wild cards
    if (mapping.others.wild > 0) {
      return null;
    }

    return checkRunCards(cards)
      ? {
          meldType: "wild",
          error: "",
        }
      : null;
  }

  // adding cards to a meld - can't add naturals to wild card meld
  if (processMeld.type === "wild") {
    return null;
  }

  if (processMeld.type === "clean" || processMeld.type === "dirty") {
    // problem if multiple ranks
    if (Object.keys(mapping.ranks).length > 1) {
      return null;
    }
    // problem if not the same rank
    if (!mapping.ranks[processMeld.rank || ""]) {
      return null;
    }
    // can't have more wilds than naturals
    const mappedMeld = mapMeldCards(processMeld.cards);
    return (mappedMeld?.naturals || 0) + mapping.ranks[processMeld.rank || ""] >
      (mappedMeld?.wild || 0) + mapping.others.wild
      ? {
          meldType:
            (mappedMeld?.wild || 0) + mapping.others.wild ? "dirty" : "clean",
          meldRank: processMeld.rank,
          error: "",
        }
      : null;
  }

  // can't add wild cards to a run
  if (mapping.others.wild) {
    return null;
  }

  return checkRunCards([...processMeld.cards, ...cards])
    ? {
        meldType: "wild",
        error: "",
      }
    : null;
};

export default canPlayRegularCards;
