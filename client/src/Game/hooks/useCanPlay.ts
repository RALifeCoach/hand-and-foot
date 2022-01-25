import { IGameBase, ICard, IMeld, IMeldType, IRank } from "../../../models/game";
import { IGamePlay } from "Game";
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

const useCanPlay = (gamePlay: IGamePlay, gameBase: IGameBase, meld: IMeld | null) => {
  return useCallback(
    (cards: ICard[]): ICanPlayReturn => {
      if (
        gamePlay.gameState !== "inPlay" ||
        ['playing', 'draw7'].indexOf(gamePlay.currentPlayer.playerState) === -1 ||
        gamePlay.currentPlayer.numberOfCardsToDraw > 0 ||
        gamePlay.currentPlayer.numberOfCardsToReplace > 0
      ) {
        return { error: "Not at this time", meldId: null };
      }

      if (!gameBase.canOverFillMeld && cards.length > 7) {
        return { error: "Too many cards", meldId: null };
      }

      const mapping = mapCards(cards);
      if (mapping.others.red3 || mapping.others.black3) {
        return {
          ...canPlay3s(gamePlay, gameBase, mapping),
          meldId: meld?.meldId || null,
        };
      }

      const existingMelds = canPlayFindExistingMelds(
        gamePlay,
        gameBase,
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
        !gameBase.canOverFillMeld &&
        (processMeld?.cards?.length || 0) + cards.length > 7
      ) {
        return { error: "Too many cards", meldId: null };
      }

      // this is true if only wild cards (3's were dealt with above)
      if (Object.keys(mapping.suits).length === 0) {
        return {
          ...canPlayWildOnly(processMeld, cards, gameBase.wildCardMeldScore as number),
          meldId: processMeld?.meldId || null,
        };
      }

      return {
        ...canPlayRegularCards(mapping, processMeld, cards),
        meldId: processMeld?.meldId || null,
      };
    },
    [gamePlay, gameBase, meld]
  );
};

export default useCanPlay;
