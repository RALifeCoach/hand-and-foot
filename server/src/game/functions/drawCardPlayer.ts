import {IGamePlay, IPlayer} from '../../models/game'
import drawCards from "../utils/drawCards";
const drawCardPlayer = (
  gamePlay: IGamePlay,
  players: IPlayer[],
  pileIndex: number
) => {
  console.log('draw card player', pileIndex);
  const player = players[gamePlay.currentPlayerIndex];
  const cards = player.isInHand ? player.hand : player.foot;

  if (player.numberOfCardsToDraw) {
    cards.push(...drawCards(gamePlay.pickupPiles[pileIndex], 1));
    player.numberOfCardsToDraw--;
    if (player.playerState === "draw" && player.numberOfCardsToDraw === 0) {
      player.playerState = "playing";
    }
  }

  return null;
};

export default drawCardPlayer;
