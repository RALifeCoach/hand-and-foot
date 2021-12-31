import { ICard, IMeld } from "../../../../models/game";
import mapMeldCards from "./mapMeldCards";
import { ICanPlay } from "../hooks/useCanPlay";

const canPlayWildOnly = (
  processMeld: IMeld | null,
  cards: ICard[],
  wildCardMeldScore: number
): ICanPlay => {
  // wild cards - okay if new meld and at least 3 cards (if wild card melds allowed)
  if (processMeld === null) {
    return cards.length > 2 && wildCardMeldScore > 0
      ? { meldType: "wild", error: "" }
      : { error: "You cannot make a new meld with those cards"};
  }
  // okay if adding to wild card meld
  if (processMeld.type === "wild") {
    return { meldType: "wild", error: "" };
  }
  // okay if adding to card meld as long as fewer wild cards than naturals
  const mappedMeld = mapMeldCards(processMeld.cards);
  if (["clean", "dirty"].indexOf(processMeld.type) > -1) {
    return (mappedMeld?.wild || 0) + cards.length < (mappedMeld?.naturals || 0)
      ? { meldType: "dirty", meldRank: processMeld.rank, error: "" }
      : { error: "There must be fewer wilds than naturals" };
  }
  // can't add to run
  return { error: "You can't add a wild card to a run" };
};

export default canPlayWildOnly;
