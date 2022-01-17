import { ITeam, IGameBase } from "../../../models/game";
import computeTeamCardPoints from "./computeTeamCardPoints";
import scoreCards from "./scoreCards";

const scoreTeam = (
  gameRules: IGameBase,
  team: ITeam
): { scoreBase: number; scoreCards: number; scoreOnTable: number } => {
  const score = {
    scoreBase: 0,
    scoreCards: computeTeamCardPoints(gameRules, team),
    scoreOnTable: 0,
  };
  Object.values(team.melds).forEach((meld) => {
    switch (meld.type) {
      case "3s":
        score.scoreBase += gameRules.redThreeScore;
        break;
      case "wild":
        if (meld.isComplete) {
          score.scoreBase += gameRules.wildCardMeldScore;
        } else {
          score.scoreBase -= gameRules.wildCardMeldScore;
        }
        score.scoreOnTable += scoreCards(gameRules, meld.cards);
        break;
      case "run":
        if (meld.isComplete) {
          score.scoreBase += gameRules.runScore;
        } else {
          score.scoreBase -= gameRules.runScore;
        }
        score.scoreOnTable += scoreCards(gameRules, meld.cards);
        break;
      case "clean":
        if (meld.isComplete) {
          score.scoreBase += gameRules.cleanScore;
        }
        score.scoreOnTable += scoreCards(gameRules, meld.cards);
        break;
      case "dirty":
        if (meld.isComplete) {
          score.scoreBase += gameRules.dirtyScore;
        }
        score.scoreOnTable += scoreCards(gameRules, meld.cards);
        break;
    }
  });

  return score;
};

export default scoreTeam;
