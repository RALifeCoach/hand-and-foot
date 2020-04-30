import { IGameJson } from "Game";
import startNewTurn from "./startNewTurn";

const discardCard = (
  game: IGameJson,
  playerId: number,
  toDiscardId: number,
): string => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  const cards = player.isInHand ? player.hand : player.foot;
  const discardCardIndex = cards.findIndex(card => card.cardId === toDiscardId);
  if (discardCardIndex === -1) {
    console.log(cards, toDiscardId);
    throw new Error('card not found');
  }
  game.discard.unshift(...cards.splice(discardCardIndex, 1));
  startNewTurn(game);

  return '';
};

export default discardCard;
