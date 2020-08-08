import { ITeam, IPlayer, IGameRules } from "Game";

const endTurn = (team: ITeam, player: IPlayer) => {
  console.debug("end turn");

  // check for any complete melds (can happen when overflow meld is true)
  Object.keys(team.melds).forEach((meldId) => {
    const meld = team.melds[meldId];
    if (meld.cards.length > 6 && !meld.isComplete) {
      meld.isComplete = true;
    }
  });

  player.playerState = "waiting";
};

export default endTurn;
