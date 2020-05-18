import { IGamePlay, IGameRules, ITeam } from "Game";
import startNewTurn from "./startNewTurn";
import computeTeamCardPoints from "../utils/computeTeamCardPoints";
import logGameState from "../../socket/logGameState";
import endRound from "./endRound";
import addMessageFoot from "../utils/messages/addMessageFoot";
import canGoDown from "../utils/canGoDown";
import rePinCards from "./rePinCards";

const discardCard = (
  gameId: number,
  gamePlay: IGamePlay,
  gameRules: IGameRules,
  toDiscardId: number,
  resolve: any
) => {
  const player = gamePlay.players[gamePlay.currentPlayerId];
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
  logGameState(gameId, gamePlay, false).then(() => {
    if (!team.isDown && points > 0) {
      team.isDown = true;
    }

    // check to see if this discard ends the round
    // if so and ask end round is true - then send ask message
    const hasClean = Object.values(team.melds).some(
      (meld) => meld.type === "clean"
    );
    const hasDirty = Object.values(team.melds).some(
      (meld) => meld.type === "dirty"
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
      console.log(cards, toDiscardId);
      throw new Error("card not found");
    }
    const card = cards[discardCardIndex];
    card.pinValue === 0;
    gamePlay.discard.unshift(...cards.splice(discardCardIndex, 1));
    if (cards.length === 0) {
      player.isInHand = false;
      addMessageFoot(gamePlay, false);
    } else {
      rePinCards(cards);
    }
    // check for any complete melds (can happen when overflow meld is true)
    Object.keys(team.melds).forEach((meldId) => {
      const meld = team.melds[meldId];
      if (meld.cards.length > 6 && !meld.isComplete) {
        meld.isComplete = true;
      }
    });

    // check to see if this discard ends the round
    if (canEndRound) {
      endRound(gamePlay, gameRules);
      return resolve(null);
    }

    startNewTurn(gamePlay, gameRules);

    resolve(null);
  });
};

export default discardCard;
