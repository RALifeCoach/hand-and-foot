import { IGamePlay, ITeam, IGameRules } from "Game";

const canGoDown = (
  gamePlay: IGamePlay,
  gameRules: IGameRules,
  team: ITeam,
  points: number
): boolean => {
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
