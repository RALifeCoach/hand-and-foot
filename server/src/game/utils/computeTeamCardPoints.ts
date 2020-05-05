import { ITeam, IGameJson } from "Game";
import scoreCards from "./scoreCards";

const computeTeamCardPoints = (game: IGameJson, team: ITeam) => {
  return Object.values(team.melds).reduce((points, meld) => {
    if (meld.type === "3s") {
      return points;
    }
    return points + scoreCards(game, meld.cards);
  }, 0);
};

export default computeTeamCardPoints;
