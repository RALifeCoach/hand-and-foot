import { IGamePlay } from "Game";
import drawCards from "../utils/drawCards";
const drawCardPlayer = (
  gamePlay: IGamePlay,
  pileIndex: number
) => {
  const player = gamePlay.players[gamePlay.currentPlayerId];
  const cards = player.isInHand ? player.hand : player.foot;

  cards.push(...drawCards(gamePlay.pickupPiles[pileIndex], 1));
  player.numberOfCardsToDraw--;
  if (player.playerState === "draw" && player.numberOfCardsToDraw === 0) {
    player.playerState = "playing";
  }

  return null;
};

export default drawCardPlayer;
