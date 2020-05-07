import { IGameJson } from "Game";
import drawCards from "../utils/drawCards";
const drawCardPlayer = (
  game: IGameJson,
  playerId: number,
  pileIndex: number
) => {
  const player = game.players[playerId];
  if (!player) {
    console.log(playerId, game.players);
    throw new Error("player is missing");
  }

  const cards = player.isInHand ? player.hand : player.foot;
  cards.push(...drawCards(game.pickupPiles[pileIndex], 1));
  player.numberOfCardsToDraw--;
  if (player.playerState === "draw" && player.numberOfCardsToDraw === 0) {
    player.playerState = "playing";
  }

  return null;
};

export default drawCardPlayer;
