import { IGameJson, ITeam } from "Game";

const canGoDown = (game: IGameJson, team: ITeam, points: number): boolean => {
  if (points > 0 && points < game.minimumPoints) {
    return true;
  }
  if (game.currentRound < game.minimumRoundNatural7) {
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
