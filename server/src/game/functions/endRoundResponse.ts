import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase } from "../../../../models/game";
import endRound from "./endRound";
import logger from "../../util/logger";

const endRoundResponse = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  partnerAgreed: boolean
) => {
  gamePlay.gameState = "inPlay";
  if (!partnerAgreed) {
    gamePlay.toDiscardId = 0;
    return {
      type: "partnerDisagreed",
      value: null,
    };
  }
  const player = players[gamePlay.currentPlayerIndex];
  const cards = player.foot;
  const discardCardIndex = cards.findIndex(
    (card) => card.cardId === gamePlay.toDiscardId
  );
  if (discardCardIndex === -1) {
    logger.error(`Card not found ${JSON.stringify(cards)}, ${gamePlay.toDiscardId}`);
    throw new Error("card not found");
  }

  const card = cards[discardCardIndex];
  card.pinValue === 0;
  gamePlay.discard.unshift(...cards.splice(discardCardIndex, 1));

  const team = gamePlay.teams[player.teamId];
  // check for any complete melds (can happen when overflow meld is true)
  Object.keys(team.melds).forEach((meldId) => {
    const meld = team.melds[meldId];
    if (meld.cards.length > 6 && !meld.isComplete) {
      meld.isComplete = true;
    }
  });

  endRound(gamePlay, gameRules, players);
  return null;
};

export default endRoundResponse;
