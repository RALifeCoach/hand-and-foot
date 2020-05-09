import { IGameJson } from "Game";
import startNewTurn from "./startNewTurn";
import computeTeamCardPoints from "../utils/computeTeamCardPoints";
import logGameState from "../../socket/logGameState";
import endRound from "./endRound";
import addMessageFoot from "../utils/messages/addMessageFoot";
import canGoDown from "../utils/canGoDown";
import rePinCards from "./rePinCards";

const discardCard = (
  gameId: number,
  game: IGameJson,
  toDiscardId: number,
  resolve: any
) => {
  const player = game.players[game.currentPlayerId];
  const team = game.teams[player.teamId];
  const points = computeTeamCardPoints(game, team);
  if (!team.isDown) {
    const melds = Object.keys(team.melds).filter(
      (meldId) => team.melds[meldId].type !== "3s"
    );
    if (melds.length > 0 && !canGoDown(game, team, points)) {
      resolve({
        type: "unmetMin",
        value: { cards: player.isInHand ? player.hand : player.foot },
      });
    }
  }
  logGameState(gameId, game, false).then(() => {
    if (!team.isDown && points > 0) {
      team.isDown = true;
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
    game.discard.unshift(...cards.splice(discardCardIndex, 1));
    if (cards.length === 0) {
      player.isInHand = false;
      addMessageFoot(game, false);
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
    if (!player.isInHand && player.foot.length === 0) {
      const hasClean = Object.values(team.melds).some(
        (meld) => meld.type === "clean"
      );
      const hasDirty = Object.values(team.melds).some(
        (meld) => meld.type === "dirty"
      );
      if (hasClean && hasDirty) {
        if (game.askRoundEnd) {
          game.gameState = "askRoundEnd";
        } else {
          endRound(game);
        }
        resolve(null);
      }
    }

    startNewTurn(game);

    resolve(null);
  });
};

export default discardCard;
