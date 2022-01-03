import {IGamePlay, IPlayer} from '../../models/game'
import {IGameBase, ITeam} from '../../../../models/game'
import startNewTurn from "./startNewTurn";
import logGameState from "../../socket/logGameState";
import endRound from "./endRound";
import addMessageFoot from "../utils/messages/addMessageFoot";
import rePinCards from "./rePinCards";
import endTurn from "./endTurn";
import logger from "../../util/logger";

const discardCardDo = (
  gameId: number,
  playerId: number,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  toDiscardId: number,
  player: IPlayer,
  team: ITeam,
  points: number,
  canEndRound: boolean,
  resolve: any
) => {
  logGameState(gameId, gamePlay, players,false).then(() => {
    if (!team.isDown && points > 0) {
      team.isDown = true;
    }

    const cards = player.isInHand ? player.hand : player.foot;
    const discardCardIndex = cards.findIndex(
      (card) => card.cardId === toDiscardId
    );
    if (discardCardIndex === -1) {
      logger.error(`Card not found ${JSON.stringify(cards)}, ${toDiscardId}`);
      throw new Error("card not found");
    }
    const card = cards[discardCardIndex];
    card.pinValue === 0;
    gamePlay.discard.unshift(...cards.splice(discardCardIndex, 1));
    if (cards.length === 0 && player.isInHand) {
      player.isInHand = false;
      addMessageFoot(gamePlay, players, false);
    }
    rePinCards(cards);

    endTurn(team, player);

    // check to see if this discard ends the round
    if (canEndRound) {
      endRound(gamePlay, gameRules, players);
      return resolve(null);
    }

    startNewTurn(gamePlay, gameRules, players);

    resolve(null);
  });
};

export default discardCardDo;
