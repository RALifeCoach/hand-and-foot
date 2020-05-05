import { IGameJson } from "Game";
import scoreTeam from "../utils/scoreTeam";

const endRound = (game: IGameJson) => {
  const currentRound = game.rounds[game.currentRound];
  Object.keys(game.teams).forEach(teamId => {
    const scores = scoreTeam(game, game.teams[teamId]);
    // deduct cards left in players hand
    currentRound.teams[teamId] = scores;
  });
  const completedRounds = game.rounds.filter(round => round.played).length;
};

export default endRound;
