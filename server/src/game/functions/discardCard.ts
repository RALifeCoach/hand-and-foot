import { IGameJson } from "Game";
import startNewTurn from "./startNewTurn";
import computeTeamCardPoints from '../utils/computeTeamCardPoints';
import logGameState from "../../socket/logGameState";

const discardCard = (
  gameId: number,
  game: IGameJson,
  playerId: number,
  toDiscardId: number,
  resolve: any,
) => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  const team = game.teams[player.teamId];
  const points = computeTeamCardPoints(game, team);
  if (!team.isDown) {
    if (points > 0 && points < game.minimumPoints) {
      resolve({
        type: "unmetMin",
        value: { cards: player.isInHand ? player.hand : player.foot },
      });
    }
  }
  logGameState(gameId, game, false)
    .then(() => {
      if (!team.isDown && points > 0) {
        team.isDown = true;
      }
      const cards = player.isInHand ? player.hand : player.foot;
      const discardCardIndex = cards.findIndex(card => card.cardId === toDiscardId);
      if (discardCardIndex === -1) {
        console.log(cards, toDiscardId);
        throw new Error('card not found');
      }
      game.discard.unshift(...cards.splice(discardCardIndex, 1));
      startNewTurn(game);

      resolve(null);
    });
};

export default discardCard;
