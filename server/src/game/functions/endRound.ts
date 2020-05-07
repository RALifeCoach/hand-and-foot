import { IGameJson } from "Game";
import scoreTeam from "../utils/scoreTeam";
import scoreCards from "../utils/scoreCards";
import endGame from "./endGame";

const endRound = (game: IGameJson) => {
  const currentRound = game.rounds[game.currentRound];
  Object.keys(game.teams).forEach(teamId => {
    const team = game.teams[teamId];
    const scores = scoreTeam(game, team);
    // deduct cards left in players hand
    Object.keys(game.players)
      .filter(playerId => game.players[playerId].teamId === teamId)
      .forEach(playerId => {
        scores.scoreCards -= scoreCards(game, game.players[playerId].hand);
        scores.scoreCards -= scoreCards(game, game.players[playerId].foot);
      });
    currentRound.teams[teamId] = scores;
    team.scoreBase += scores.scoreBase;
    team.scoreCards += scores.scoreCards;
  });
  const completedRounds = game.rounds.filter(round => !round.played);
  if (completedRounds.length === 0) {
    endGame(game);
  }
};

export default endRound;
