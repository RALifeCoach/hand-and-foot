import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase } from "../../../models/game";
import logGameState from "../../socket/logGameState";
import canGoDown from "../utils/canGoDown";
import computeTeamCardPoints from "../utils/computeTeamCardPoints";
import getCurrentPlayer from './getCurrentPlayer'

const completeDraw7 = (gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[], gameId: number) => {
  console.debug('complete draw 7');
  const player = getCurrentPlayer(gamePlay, players)
  const team = gamePlay.teams[player.teamId];
  const points = computeTeamCardPoints(gameRules, team);

  return new Promise(resolve => {
    if (player.playerState !== 'draw7') {
      return resolve(null);
    }
    if (!team.isDown) {
      if (!canGoDown(gamePlay, gameRules, team, points)) {
        return resolve(null);
      }
    }

    logGameState(gameId, gamePlay, players, false).then(() => {
      const cards = player.isInHand ? player.hand : player.foot;
      // remove from discard the top card (already added to the player's hand)
      gamePlay.discard.splice(0, 1);
      // now add the next six cards to the player's hand
      cards.push(...gamePlay.discard.splice(0, 6));
      player.playerState = "playing";
      resolve(null);
    });
  })
};

export default completeDraw7;
