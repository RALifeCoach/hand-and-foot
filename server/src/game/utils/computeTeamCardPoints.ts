import { ITeam, IGameJson } from "Game";
import getCardPoints from "./getCardPoints";

const computeTeamCardPoints = (game: IGameJson, team: ITeam) => {
  return Object.values(team.melds).reduce((points, meld) => {
    if (meld.type === "3s") {
      return points;
    }
    return meld.cards.reduce((cardPoints, card) => {
      return cardPoints + getCardPoints(card);
    }, points);
  }, 0);
};

export default computeTeamCardPoints;
