import { IGamePlay, IGameRules } from "Game";
import scoreTeam from "../utils/scoreTeam";
import scoreCards from "../utils/scoreCards";
import endGame from "./endGame";

const endRound = (gamePlay: IGamePlay, gameRules: IGameRules) => {
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
  const completedRounds = gamePlay.rounds.filter(round => !round.played);
  if (completedRounds.length === 0) {
    endGame(gamePlay);
  }
};

export default endRound;
