import { IGame, ICard, IMeld, IMeldType, IRank } from "Game";
import useGetGameRule from "./useGetGameRule";
import mapCards from "../functions/mapCards";
import { useCallback } from "react";
import canPlayFindExistingMelds from "../functions/canPlayFindExistingMelds";
import canPlayWildOnly from "../functions/canPlayWildOnly";
import canPlay3s from "../functions/canPlay3s";
import canPlayRegularCards from "../functions/canPlayRegularCards";

export interface ICanPlay {
  meldType?: IMeldType;
  meldRank?: IRank;
  error: string;
}

export interface ICanPlayReturn extends ICanPlay {
  meldId: string | null;
}

const useCanPlay = (game: IGame, meld: IMeld | null) => {
  const redThreeScore = useGetGameRule("redThreeScore");
  const wildCardMeldScore = useGetGameRule("wildCardMeldScore");
  const canOverfillMeld = useGetGameRule("canOverfillMeld");

  return useCallback(
    (cards: ICard[]): ICanPlayReturn => {
      if (
        game.gameState !== "inPlay" ||
        game.currentPlayer.playerState !== "playing" ||
        game.currentPlayer.numberOfCardsToDraw > 0
      ) {
        return { error: "Not at this time", meldId: null };
      }

      if (!canOverfillMeld && cards.length > 7) {
        return { error: "Too many cards", meldId: null };
      }

      const mapping = mapCards(cards);
      if (mapping.others.red3 || mapping.others.black3) {
        return {
          ...canPlay3s(game, mapping, redThreeScore as number),
          meldId: meld?.meldId || null,
        };
      }

      const existingMelds = canPlayFindExistingMelds(
        game,
        meld,
        cards,
        mapping
      );
      if (existingMelds.length > 1) {
        return {
          error:
            "The selected cards can be played on more than one meld. Please click on the desired meld.",
          meldId: null,
        };
      }
      const processMeld = existingMelds.length === 1 ? existingMelds[0] : null;

      if (
        !canOverfillMeld &&
        (processMeld?.cards?.length || 0) + cards.length > 7
      ) {
        return { error: "Too many cards", meldId: null };
      }

      // this is true if only wild cards (3's were dealt with above)
      if (Object.keys(mapping.suits).length === 0) {
        return {
          ...canPlayWildOnly(processMeld, cards, wildCardMeldScore as number),
          meldId: processMeld?.meldId || null,
        };
      }

      return {
        ...canPlayRegularCards(mapping, processMeld, cards),
        meldId: processMeld?.meldId || null,
      };
    },
    [game, meld, redThreeScore, wildCardMeldScore, canOverfillMeld]
  );
};

export default useCanPlay;
