import { ICard, IMeld, IMeldType, IRank } from "Game";
import mapMeldCards from "./mapMeldCards";

const canPlayWildOnly = (
  processMeld: IMeld | null,
  cards: ICard[],
  wildCardMeldScore: number
): { meldType?: IMeldType; meldRank?: IRank; error: string } | null => {
  // wild cards - okay if new meld and at least 3 cards (if wild card melds allowed)
  if (processMeld === null) {
    return cards.length > 2 && wildCardMeldScore > 0
      ? { meldType: "wild", error: "" }
      : null;
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
      : null;
  }
  // can't add to run
  return null;
};

export default canPlayWildOnly;
