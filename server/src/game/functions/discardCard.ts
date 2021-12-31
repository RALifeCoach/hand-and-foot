import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase } from "../../../../models/game";
import startNewTurn from "./startNewTurn";
import computeTeamCardPoints from "../utils/computeTeamCardPoints";
import logGameState from "../../socket/logGameState";
import endRound from "./endRound";
import addMessageFoot from "../utils/messages/addMessageFoot";
import canGoDown from "../utils/canGoDown";
import rePinCards from "./rePinCards";
import endTurn from "./endTurn";
import logger from "../../util/logger";

const discardCard = (
  gameId: number,
  playerId: number,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  toDiscardId: number,
  resolve: any
) => {
  const player = players[gamePlay.currentPlayerIndex]
  if (playerId !== player.playerId) {
    resolve(null)
  }
  const team = gamePlay.teams[player.teamId];
  const points = computeTeamCardPoints(gameRules, team);
  if (!team.isDown) {
    const melds = Object.keys(team.melds).filter(
      (meldId) => team.melds[meldId].type !== "3s"
    );
    if (melds.length > 0 && !canGoDown(gamePlay, gameRules, team, points)) {
      resolve({
        type: "unmetMin",
        value: { cards: player.isInHand ? player.hand : player.foot },
      });
    }
  }
  logGameState(gameId, gamePlay, players,false).then(() => {
    if (!team.isDown && points > 0) {
      team.isDown = true;
    }

    // check to see if this discard ends the round
    // if so and ask end round is true - then send ask message
    const hasClean = Object.values(team.melds).some(
      (meld) => meld.type === "clean" && meld.cards.length > 6
    );
    const hasDirty = Object.values(team.melds).some(
      (meld) => meld.type === "dirty" && meld.cards.length > 6
    );
    const canEndRound =
      !player.isInHand && player.foot.length === 1 && hasClean && hasDirty;
    if (canEndRound) {
      if (gameRules.askRoundEnd) {
        gamePlay.gameState = "askRoundEnd";
        gamePlay.toDiscardId = toDiscardId;
        return resolve(null);
      }
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

export default discardCard;
