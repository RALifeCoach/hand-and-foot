import { IGame, ICard, IMeld, IMeldType, IRank } from "Game";
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
  return useCallback(
    (cards: ICard[]): ICanPlayReturn => {
      if (
        game.gameState !== "inPlay" ||
        ['playing', 'draw7'].indexOf(game.currentPlayer.playerState) === -1 ||
        game.currentPlayer.numberOfCardsToDraw > 0
      ) {
        return { error: "Not at this time", meldId: null };
      }

      if (!game.canOverFillMeld && cards.length > 7) {
        return { error: "Too many cards", meldId: null };
      }

      const mapping = mapCards(cards);
      if (mapping.others.red3 || mapping.others.black3) {
        return {
          ...canPlay3s(game, mapping, game.redThreeScore as number),
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
        !game.canOverFillMeld &&
        (processMeld?.cards?.length || 0) + cards.length > 7
      ) {
        return { error: "Too many cards", meldId: null };
      }

      // this is true if only wild cards (3's were dealt with above)
      if (Object.keys(mapping.suits).length === 0) {
        return {
          ...canPlayWildOnly(processMeld, cards, game.wildCardMeldScore as number),
          meldId: processMeld?.meldId || null,
        };
      }

      return {
        ...canPlayRegularCards(mapping, processMeld, cards),
        meldId: processMeld?.meldId || null,
      };
    },
    [game, meld]
  );
};

export default useCanPlay;
