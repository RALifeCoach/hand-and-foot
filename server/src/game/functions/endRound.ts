import { IGamePlay, IGameRules } from "Game";
import scoreTeam from "../utils/scoreTeam";
import scoreCards from "../utils/scoreCards";
import endGame from "./endGame";

const endRound = (gamePlay: IGamePlay, gameRules: IGameRules) => {
  console.debug('end round');
  const currentRound = gamePlay.rounds[gamePlay.currentRound];
  Object.keys(gamePlay.teams).forEach(teamId => {
    const team = gamePlay.teams[teamId];
    const scores = scoreTeam(gameRules, team);
    // deduct cards left in players hand
    Object.keys(gamePlay.players)
      .filter(playerId => gamePlay.players[playerId].teamId === teamId)
      .forEach(playerId => {
        scores.scoreCards -= scoreCards(gameRules, gamePlay.players[playerId].hand);
        scores.scoreCards -= scoreCards(gameRules, gamePlay.players[playerId].foot);
      });
    currentRound.teams[teamId] = scores;
    team.scoreBase += scores.scoreBase;
    team.scoreCards += scores.scoreCards;
  });
  const incompleteRounds = gamePlay.rounds.filter(round => !round.played);
  if (incompleteRounds.length === 0) {
    endGame(gamePlay);
  }
};

export default endRound;
