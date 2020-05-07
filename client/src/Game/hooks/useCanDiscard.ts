import { IGame } from "Game";
import useSelectedCards from "./useSelectedCards";
import canDiscard from "../functions/canDiscard";
import { useCallback } from "react";

const useCanDiscard = (game: IGame, selected: { [cardId: string]: boolean }) => {
  const cards = useSelectedCards(game.currentPlayer.cards, selected);
  return useCallback(() => {
    if (
      game.gameState !== "inPlay" ||
      game.currentPlayer.playerState !== "playing" ||
      cards.length !== 1
    ) {
      return "You cannot discard at this point in time";
    }

    return canDiscard(game, cards[0]);
  }, [game, cards])
};

export default useCanDiscard;
