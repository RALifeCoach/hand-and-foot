import { IGameJson, IMeldType, IRank } from "Game";
import startNewTurn from "./startNewTurn";
import * as uuid from "uuid";

const playCards = (
  game: IGameJson,
  playerId: number,
  cardIds: number[],
  meldId: string,
  meldType?: IMeldType,
  meldRank?: IRank
): string => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  const cards = player.isInHand ? player.hand : player.foot;
  const thisMeldId = meldId || uuid.v4();
  const team = game.teams[game.players[game.currentPlayerId].teamId];
  if (!team) {
    throw new Error("team not found");
  }
  if (!meldId) {
    team.melds[thisMeldId] = {
      meldId: thisMeldId,
      cards: [],
      isComplete: false,
      type: meldType as IMeldType,
      rank: meldRank,
    };
  }
  cardIds.forEach((cardId) => {
    const playCardIndex = cards.findIndex((card) => card.cardId === cardId);
    if (playCardIndex === -1) {
      console.log(cards, cardId);
      throw new Error("card not found");
    }
    const meld = team.melds[thisMeldId];
    meld.cards.push(...cards.splice(playCardIndex, 1));
  });

  return '';
};

export default playCards;
