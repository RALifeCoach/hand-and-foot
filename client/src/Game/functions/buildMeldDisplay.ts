import { IMeld } from "../../queries/game";
import { RANK_NAMES, SUIT_NAMES, SUIT_IMAGES } from "../../constants";
import isWildCard from "./isWildCard";

const buildMeldDisplay = (meld: IMeld) => {
  const { cards, type } = meld;
  switch (type) {
    case "3s":
      return `${cards[0].suit} ${cards[0].rank}`;
    case "wild":
      return cards
        .map((card) => (card.suit === "J" ? "Joker" : "Two"))
        .join(", ");
    case "clean":
    case "dirty":
      return `${RANK_NAMES[(meld?.rank as string) || "A"]}: ${cards
        .map((card) => SUIT_IMAGES[isWildCard(card) ? "J" : card.suit].image)
        .join(", ")}`;
    case "run":
      return `${SUIT_NAMES[(cards[0].suit as string) || "S"]}: ${cards
        .map((card) => card.rank)
        .join(", ")}`;
  }
};

export default buildMeldDisplay;
