import { IGameJson, ICard } from "Game";
import sortCards from "./sortCards";
import drawCards from "./drawCards";
const drawCardPlayer = (
  game: IGameJson,
  playerId: number
): { sendToAll: boolean; message: string } => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  if (player.isInHand) {
    player.hand.push(...drawCards(game.deck, 1));
  } else {
    player.foot.push(...drawCards(game.deck, 1));
  }

  return {
    sendToAll: true,
    message: '',
  };
};

export default drawCardPlayer;
