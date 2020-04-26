import { IGameJson } from "Game";
import sortCards from "./sortCards";

const setSortOrder = (
  game: IGameJson,
  playerId: string,
  sortOrder: string
): { sendToAll: boolean; message: string } => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  player.sortOrder = sortOrder;
  if (player.isInHand) {
    player.hand = sortCards(player.hand, sortOrder);
  } else {
    player.foot = sortCards(player.foot, sortOrder);
  }

  return {
    sendToAll: false,
    message: JSON.stringify({
      type: 'sortOrder', value: { sortOrder, cards: player.isInHand ? player.hand : player.foot }
    }),
  };
};

export default setSortOrder;
