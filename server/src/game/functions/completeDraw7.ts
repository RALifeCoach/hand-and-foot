import { IGameJson } from "Game";
import logGameState from "../../socket/logGameState";
import canGoDown from "../utils/canGoDown";
import computeTeamCardPoints from "../utils/computeTeamCardPoints";

const completeDraw7 = (game: IGameJson, gameId: number) => {
  const player = game.players[game.currentPlayerId];
  const team = game.teams[player.teamId];
  const points = computeTeamCardPoints(game, team);

  return new Promise(resolve => {
    if (player.playerState !== 'draw7') {
      return resolve(null);
    }
    if (!team.isDown) {
      if (!canGoDown(game, team, points)) {
        return resolve(null);
      }
    }

    logGameState(gameId, game, false).then(() => {
      const cards = player.isInHand ? player.hand : player.foot;
      // remove from discard the top card (already added to the player's hand)
      game.discard.splice(0, 1);
      // now add the next six cards to the player's hand
      cards.push(...game.discard.splice(0, 6));
      player.playerState = "playing";
      resolve(null);
    });
  })
};

export default completeDraw7;
