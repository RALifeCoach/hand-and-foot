import { ICard, IGame } from "Game";
import isWildCard from "./isWildCard";
import isRedThree from "./isRedThree";
import isBlackThree from "./isBlackThree";
import canPlayFindExistingMelds from "./canPlayFindExistingMelds";
import mapCards from "./mapCards";

const canDiscard = (game: IGame, card: ICard) => {
  debugger;
  if (
    game.gameState !== "inPlay" ||
    !game.currentPlayer.isPlayerTurn ||
    game.currentPlayer.numberOfCardsToDraw
  ) {
    return "It's not time to discard";
  }
  const toDiscard = card;
  // can discard red threes if they are a penalty
  if (isRedThree(toDiscard)) {
    if (game.redThreeScore > 0) {
      return "Cannot discard red 3's";
    }
    return "";
  }
  // can always disacrd black thress
  if (isBlackThree(card)) {
    return "";
  }
  // cannot discard wild cards if not allowed
  if (isWildCard(toDiscard) && !game.canLockDiscards) {
    return "Cannot discard wild cards";
  }

  // can the card be played on a meld (regular or wild)
  const mapping = mapCards([toDiscard]);
  const existingMelds = canPlayFindExistingMelds(
    game,
    null,
    [toDiscard],
    mapping
  );
  if (existingMelds.length > 0) {
    return isWildCard(toDiscard) &&
      !existingMelds.some((meld) => meld.type === "wild")
      ? ""
      : "The card is playable";
  }
  return "";
};

export default canDiscard;
