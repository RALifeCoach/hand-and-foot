import { IGamePlay } from "../../models/game";
import { ITeam, IGameBase } from "../../../models/game";
import logger from '../../util/logger'

const canGoDown = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  team: ITeam,
  points: number
): boolean => {
  logger.info({type: 'can go down', points, minPoints: gamePlay.minimumPoints})
  if (points > 0 && points >= gamePlay.minimumPoints) {
    return true;
  }
  if (gamePlay.currentRound < gameRules.minimumRoundNatural7) {
    return false;
  }
  if (Object.keys(team.melds).length !== 1) {
    return false;
  }
  return Object.values(team.melds).some(
    (meld) =>
      meld.cards.length > 6 && ["clean", "wild", "run"].indexOf(meld.type) > -1
  );
};

export default canGoDown;
