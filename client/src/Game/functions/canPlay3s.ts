import { ICardMapping } from "./mapCards";
import { ICanPlay } from "../hooks/useCanPlay";
import { IGame } from "Game";
import canDiscard from "./canDiscard";
import isBlackThree from "./isBlackThree";

const canPlay3s = (
  game: IGame,
  mapping: ICardMapping,
  redThreeScore: number
): ICanPlay => {
  // if there are 3's and anything else then not okay
  if (mapping.others.wild || Object.keys(mapping.suits).length) {
    return { error: "Cannot mix 3's and not 3's" };
  }
  // if there are both red and black 3's not okay
  if (mapping.others.red3 && mapping.others.black3) {
    return { error: "Cannot mix red and black threes" };
  }

  if (mapping.others.red3) {
    return redThreeScore > 0
      ? { meldType: "3s", error: "" }
      : { error: "Red threes cannot be played" };
  }

  // black 3's - okay only when the player is in their foot and have 1 card left and the card is a valid discard
  if (!game.currentPlayer.isInHand && game.currentPlayer.cards.length === 1) {
    const discard = game.currentPlayer.cards[0];
    if (canDiscard(game, discard)) {
      return isBlackThree(discard)
        ? { error: "Cannot play black threes and also discard a black 3" }
        : { meldType: 'clean', meldRank: '3', error: '' };
    }
  }
  return { error: "A black three meld cannot be played at this time"};
};

export default canPlay3s;
