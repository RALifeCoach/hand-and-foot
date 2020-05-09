import { ITeam, IGameJson } from "Game";
import computeTeamCardPoints from "./computeTeamCardPoints";
import scoreCards from "./scoreCards";

const scoreTeam = (
  game: IGameJson,
  team: ITeam
): { scoreBase: number; scoreCards: number; scoreOnTable: number } => {
  const score = {
    scoreBase: 0,
    scoreCards: computeTeamCardPoints(game, team),
    scoreOnTable: 0,
  };
  Object.values(team.melds).forEach((meld) => {
    switch (meld.type) {
      case "3s":
        score.scoreBase += game.redThreeScore;
        break;
      case "wild":
        if (meld.isComplete) {
          score.scoreBase += game.wildCardMeldScore;
        } else {
          score.scoreBase -= game.wildCardMeldScore;
        }
        score.scoreOnTable += scoreCards(game, meld.cards);
        break;
      case "run":
        if (meld.isComplete) {
          score.scoreBase += game.runScore;
        } else {
          score.scoreBase -= game.runScore;
        }
        score.scoreOnTable += scoreCards(game, meld.cards);
        break;
      case "clean":
        if (meld.isComplete) {
          score.scoreBase += game.cleanScore;
        }
        score.scoreOnTable += scoreCards(game, meld.cards);
        break;
      case "dirty":
        if (meld.isComplete) {
          score.scoreBase += game.dirtyScore;
        }
        score.scoreOnTable += scoreCards(game, meld.cards);
        break;
    }
  });

  return score;
};

export default scoreTeam;
