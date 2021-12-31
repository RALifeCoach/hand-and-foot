import {IGamePlay, IPlayer} from '../../models/game'
import sortCards from "../utils/sortCards";

const setSortOrder = (gamePlay: IGamePlay, players: IPlayer[], playerId: number, sortOrder: string) => {
  const player = players.find(player => player.playerId === playerId)
  if (!player) {
    throw new Error("player not found");
  }

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
