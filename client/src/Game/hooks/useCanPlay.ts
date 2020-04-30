import { IGame, ICard, IMeld, IMeldType, IRank } from "Game";
import useGetGameRule from "./useGetGameRule";
import mapCards from "../functions/mapCards";
import mapMeldCards from "../functions/mapMeldCards";
import checkRunCards from "../functions/checkRunCards";

const useCanPlay = (
  game: IGame,
  cards: ICard[],
  meld: IMeld | null
): { meldType: IMeldType; meldRank?: IRank } | null => {
  const redThreeScore = useGetGameRule("redThreeScore");
  const wildCardMeldScore = useGetGameRule("wildCardMeldScore");

  if (
    game.gameState !== "inPlay" ||
    game.currentPlayer.playerState !== "playing"
  ) {
    return null;
  }

  const mapping = mapCards(cards);
  // this is true is only 3's or wild cards
  if (Object.keys(mapping.suits).length === 0) {
    if (mapping.others.red3) {
      return redThreeScore > 0 ? { meldType: "3s" } : null;
    }
    if (mapping.others.black3) {
      // TODO - this is valid on final discard
      return null;
    }
    // wild cards - okay if new meld and at least 3 cards (if wild card mels allowed)
    if (meld === null) {
      return cards.length > 2 && wildCardMeldScore > 0
        ? { meldType: "wild" }
        : null;
    }
    // okay if adding to wild card meld
    if (meld.type === "wild") {
      return { meldType: "wild" };
    }
    // okay if adding to card meld as long as fewer wild cards than naturals
    const mappedMeld = mapMeldCards(meld.cards);
    if (["clean", "dirty"].indexOf(meld.type) > -1) {
      return (mappedMeld?.wild || 0) + cards.length <
        (mappedMeld?.naturals || 0)
        ? { meldType: "dirty", meldRank: meld.rank }
        : null;
    }
    // can't add to run
    return null;
  }

  // if there are 3's and anything else then not okay
  if (mapping.others.red3 || mapping.others.black3) {
    return null;
  }

  // mix of ranks and suits
  if (
    Object.keys(mapping.ranks).length > 1 &&
    Object.keys(mapping.suits).length > 1
  ) {
    return null;
  }

  if (meld === null) {
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
          }
        : null;
    }

    // it is a run - no wild cards
    if (mapping.others.wild > 0) {
      return null;
    }

    return checkRunCards(cards);
  }

  // adding cards to a meld - can't add naturals to wild card meld
  if (meld.type === "wild") {
    return null;
  }

  if (meld.type === "clean" || meld.type === "dirty") {
    // problem if multiple ranks
    if (Object.keys(mapping.ranks).length > 1) {
      return null;
    }
    // problem if not the same rank
    if (!mapping.ranks[meld.rank || ""]) {
      return null;
    }
    // can't have more wilds than naturals
    const mappedMeld = mapMeldCards(meld.cards);
    return (mappedMeld?.naturals || 0) + mapping.ranks[meld.rank || ""] >
      (mappedMeld?.wild || 0) + mapping.others.wild
      ? {
          meldType:
            (mappedMeld?.wild || 0) + mapping.others.wild ? "dirty" : "clean",
          meldRank: meld.rank,
        }
      : null;
  }

  // can't add wild cards to a run
  if (mapping.others.wild) {
    return null;
  }

  return checkRunCards([...meld.cards, ...cards]);
};

export default useCanPlay;
