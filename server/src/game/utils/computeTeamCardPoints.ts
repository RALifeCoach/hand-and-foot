import { ITeam, IGameBase } from "../../../models/game";
import scoreCards from "./scoreCards";

const computeTeamCardPoints = (gameRules: IGameBase, team: ITeam) => {
  return Object.values(team.melds).reduce((points, meld) => {
    if (meld.type === "3s") {
      return points;
    }
    return points + scoreCards(gameRules, meld.cards);
  }, 0);
};

export default computeTeamCardPoints;
