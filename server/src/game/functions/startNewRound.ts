import { IGameJson } from "Game";
import startNewTurn from "./startNewTurn";

const ROUND_MINIMUM = [
  50, 90, 120, 150, 190, 220, 250, 290
];

const startNewRound = (game: IGameJson) => {
  if (game.roundSequence === 'random') {
    const unplayedRounds = game.rounds.filter(round => !round.played);
    const roundIndex = Math.max(Math.floor(Math.random() * unplayedRounds.length), unplayedRounds.length - 1);
    game.currentRound = roundIndex;
  } else {
    game.currentRound = game.currentRound + 1;
  }
  game.minimumPoints = ROUND_MINIMUM[game.currentRound];
  Object.keys(game.teams).forEach(teamId => {
    const team = game.teams[teamId];
    team.isDown = false;
    team.melds = {};
  });
  startNewTurn(game);
};

export default startNewRound;
