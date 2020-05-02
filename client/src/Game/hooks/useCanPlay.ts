import { IGame, ICard, IMeld, IMeldType, IRank } from "Game";
import useGetGameRule from "./useGetGameRule";
import mapCards from "../functions/mapCards";
import { useCallback } from "react";
import canPlayFindExistingMelds from "../functions/canPlayFindExistingMelds";
import canPlayWildOnly from "../functions/canPlayWildOnly";
import canPlay3s from "../functions/canPlay3s";
import canPlayRegularCards from "../functions/canPlayRegularCards";

const useCanPlay = (
  game: IGame,
  meld: IMeld | null
) => {
  const redThreeScore = useGetGameRule("redThreeScore");
  const wildCardMeldScore = useGetGameRule("wildCardMeldScore");

  return useCallback((cards: ICard[]): { meldType?: IMeldType; meldRank?: IRank; error: string } | null => {
    if (
      game.gameState !== "inPlay" ||
      game.currentPlayer.playerState !== "playing"
    ) {
      return null;
    }

    const mapping = mapCards(cards);
    if (mapping.others.red3 || mapping.others.black3) {
      return canPlay3s(mapping, redThreeScore as number);
    }

    const existingMelds = canPlayFindExistingMelds(game, meld, cards, mapping);
    if (existingMelds.length > 1) {
      return {
        error:
          "The selected cards can be played on more than one meld. Please click on the desired meld.",
      };
    }
    const processMeld = existingMelds.length === 1
      ? existingMelds[0]
      : null;

    // this is true if only wild cards (3's were dealt with above)
    if (Object.keys(mapping.suits).length === 0) {
      return canPlayWildOnly(processMeld, cards, wildCardMeldScore as number);
    }

    return canPlayRegularCards(mapping, processMeld, cards);
  }, [game, meld, redThreeScore, wildCardMeldScore]);
};

export default useCanPlay;
