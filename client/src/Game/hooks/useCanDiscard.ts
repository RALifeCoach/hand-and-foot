import { IGame } from "Game";
import useSelectedCards from "./useSelectedCards";
import useGetGameRule from "./useGetGameRule";

const useCanDiscard = (
  game: IGame,
  selected: { [cardId: string]: boolean }
) => {
  const cardsSelected = useSelectedCards(game.currentPlayer.cards, selected);
  const redThreeScore = useGetGameRule("redThreeScore");
  const canDiscardWild = useGetGameRule("canDiscardWild");
  if (
    game.gameState !== "inPlay" ||
    game.currentPlayer.playerState !== "playing" ||
    cardsSelected.length !== 1
  ) {
    return null;
  }

  const toDiscard = cardsSelected[0];
  if (!canDiscardWild) {
    if (toDiscard.suit === "J" || toDiscard.rank === "2") {
      return null;
    }
  }
  if (redThreeScore > 0) {
    if (["H", "D"].indexOf(toDiscard.suit) > -1 && toDiscard.rank === "3") {
      return null;
    }
  }
  return toDiscard;
};

export default useCanDiscard;
