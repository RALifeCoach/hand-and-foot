import { ICardMapping } from "./mapCards";
import { IMeld, ICard, IRank } from "Game";
import checkRunCards from "./checkRunCards";
import mapMeldCards from "./mapMeldCards";
import { ICanPlay } from "../hooks/useCanPlay";

const canPlayRegularCards = (
  mapping: ICardMapping,
  processMeld: IMeld | null,
  cards: ICard[]
): ICanPlay => {
  // mix of ranks and suits is not okay
  if (
    Object.keys(mapping.ranks).length > 1 &&
    Object.keys(mapping.suits).length > 1
  ) {
    return { error: "Cannot have multiple suits and ranks" };
  }

  // wild with multiple ranks is not okay
  if (Object.keys(mapping.ranks).length > 1 && mapping.others.wild > 1) {
    return { error: "Cannot have wild cards in a run" };
  }

  if (processMeld === null) {
    if (cards.length < 3) {
      return { error: "Must have at least 3 cards to start a meld" };
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
        : { error: "There must be more naturals than wilds" };
    }

    return checkRunCards(cards)
      ? {
          meldType: "wild",
          error: "",
        }
      : { error: "The run either has duplicates or a gap" };
  }

  // adding cards to a meld - can't add naturals to wild card meld
  if (processMeld.type === "wild") {
    return { error: "Cannot add non-wild cards to a wild card meld" };
  }

  if (processMeld.type === "clean" || processMeld.type === "dirty") {
    // problem if multiple ranks
    if (Object.keys(mapping.ranks).length > 1) {
      return { error: "Cannot add selected cards to that meld" };
    }
    // problem if not the same rank
    if (!mapping.ranks[processMeld.rank || ""]) {
      return { error: "Cannot add selected cards to that meld" };
    }
    // can't have more wilds than naturals
    const mappedMeld = mapMeldCards(processMeld.cards);
    return (mappedMeld?.naturals || 0) + mapping.ranks[processMeld.rank || ""] >
      (mappedMeld?.wild || 0) + (mapping.others.wild || 0)
      ? {
          meldType:
            (mappedMeld?.wild || 0) + mapping.others.wild ? "dirty" : "clean",
          meldRank: processMeld.rank,
          error: "",
        }
      : { error: "There must be more naturals than wilds" };
  }

  return checkRunCards([...processMeld.cards, ...cards])
    ? {
        meldType: "wild",
        error: "",
      }
    : { error: "The run either has duplicates or a gap" };
};

export default canPlayRegularCards;
