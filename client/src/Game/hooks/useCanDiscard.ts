import { IGamePlay, IGameBase } from "Game";
import useSelectedCards from "./useSelectedCards";
import canDiscard from "../functions/canDiscard";
import { useCallback } from "react";

const useCanDiscard = (gamePlay: IGamePlay, gameBase: IGameBase, selected: { [cardId: string]: boolean }) => {
  const cards = useSelectedCards(gamePlay.currentPlayer.cards, selected);
  return useCallback(() => {
    if (
      gamePlay.gameState !== "inPlay" ||
      gamePlay.currentPlayer.playerState !== "playing" ||
      cards.length !== 1
    ) {
      return "You cannot discard at this point in time";
    }

    return canDiscard(gamePlay, gameBase, cards[0]);
  }, [gamePlay, gameBase, cards])
};

export default useCanDiscard;
