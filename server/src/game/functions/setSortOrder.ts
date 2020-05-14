import { IGamePlay } from "Game";
import sortCards from "../utils/sortCards";

const setSortOrder = (gamePlay: IGamePlay, playerId: string, sortOrder: string) => {
  const player = gamePlay.players[playerId];

  player.sortOrder = sortOrder;
  if (player.isInHand) {
    player.hand = sortCards(player.hand, sortOrder);
  } else {
    player.foot = sortCards(player.foot, sortOrder);
  }

  return {
    type: "sortOrder",
    value: { sortOrder, cards: player.isInHand ? player.hand : player.foot },
  };
};

export default setSortOrder;
