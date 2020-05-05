import { IGame } from "Game";
import useGetGameRule from "./useGetGameRule";
import useSelectedCards from "./useSelectedCards";
import canDiscard from "../functions/canDiscard";
import { useCallback } from "react";

const useCanDiscard = (game: IGame, selected: { [cardId: string]: boolean }) => {
  const cards = useSelectedCards(game.currentPlayer.cards, selected);
  const redThreeScore: number = useGetGameRule("redThreeScore") as number;
  const canDiscardWild: boolean = useGetGameRule("canDiscardWild") as boolean;
  return useCallback(() => {
    if (
      game.gameState !== "inPlay" ||
      game.currentPlayer.playerState !== "playing" ||
      cards.length !== 1
    ) {
      return "You cannot discard at this point in time";
    }

    return canDiscard(game, cards[0], canDiscardWild, redThreeScore);
  }, [game, canDiscardWild, redThreeScore, cards])
};

export default useCanDiscard;
