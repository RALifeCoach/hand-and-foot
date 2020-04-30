import { IGameJson } from "Game";
import drawCards from "../utils/drawCards";
const drawCardPlayer = (
  game: IGameJson,
  playerId: number
): string => {
  const player = game.players[playerId];
  if (!player) {
    console.log(playerId, game.players);
    throw new Error("player is missing");
  }

  if (player.isInHand) {
    player.hand.push(...drawCards(game.deck, 1));
  } else {
    player.foot.push(...drawCards(game.deck, 1));
  }
  player.numberOfCardsToDraw--;
  if (player.playerState === 'draw' && player.numberOfCardsToDraw === 0) {
    player.playerState = 'playing';
  }

  return '';
};

export default drawCardPlayer;
