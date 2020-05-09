import { IGameJson } from "Game";
import drawCards from "../utils/drawCards";
const drawCardPlayer = (
  game: IGameJson,
  pileIndex: number
) => {
  const player = game.players[game.currentPlayerId];
  const cards = player.isInHand ? player.hand : player.foot;

  cards.push(...drawCards(game.pickupPiles[pileIndex], 1));
  player.numberOfCardsToDraw--;
  if (player.playerState === "draw" && player.numberOfCardsToDraw === 0) {
    player.playerState = "playing";
  }

  return null;
};

export default drawCardPlayer;
