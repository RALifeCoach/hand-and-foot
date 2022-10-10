import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase } from "../../../models/game";
import scoreTeam from "../utils/scoreTeam";
import scoreCards from "../utils/scoreCards";
import endGame from "./endGame";
import startNewRound from './startNewRound'

const endRound = (gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[]) => {
  console.debug('end round');
  const currentRound = gamePlay.rounds[gamePlay.currentRound];
  Object.keys(gamePlay.teams).forEach(teamId => {
    const team = gamePlay.teams[teamId];
    const scores = scoreTeam(gameRules, team);
    // deduct cards left in players hand
    players
      .filter(player => player.teamId === teamId)
      .forEach(player => {
        scores.scoreCards -= scoreCards(gameRules, player.hand);
        scores.scoreCards -= scoreCards(gameRules, player.foot);
      });
    currentRound.teams[teamId] = scores;
    team.scoreBase += scores.scoreBase;
    team.scoreCards += scores.scoreCards;
  });
  const incompleteRounds = gamePlay.rounds.filter(round => !round.played);
  if (incompleteRounds.length === 0) {
    endGame(gamePlay);
    return
  }

  startNewRound(gamePlay, gameRules, players)
};

export default endRound;
