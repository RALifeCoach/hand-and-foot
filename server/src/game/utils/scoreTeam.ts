import { ITeam, IGameJson } from "Game";
import computeTeamCardPoints from "./computeTeamCardPoints";

const scoreTeam = (
  game: IGameJson,
  team: ITeam
): { scoreBase: number; scoreCards: number } => {
  const score = { scoreBase: 0, scoreCards: computeTeamCardPoints(game, team) };
  Object.values(team.melds).forEach((meld) => {
    switch (meld.type) {
      case "3s":
        score.scoreBase += game.redThreeScore;
        break;
      case "wild":
        if (meld.isComplete) {
          score.scoreBase += game.wildCardMeldScore;
        }
        break;
      case "run":
        if (meld.isComplete) {
          score.scoreBase += game.runScore;
        }
        break;
      case "clean":
        if (meld.isComplete) {
          score.scoreBase += game.cleanScore;
        }
        break;
      case "dirty":
        if (meld.isComplete) {
          score.scoreBase += game.dirtyScore;
        }
        break;
    }
  });

  return score;
};

export default scoreTeam;
