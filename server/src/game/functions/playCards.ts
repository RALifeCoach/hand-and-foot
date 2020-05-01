import { IGameJson, IMeldType, IRank } from "Game";
import * as uuid from "uuid";
import logGameState from "../../socket/logGameState";

const playCards = (
  gameId: number,
  game: IGameJson,
  playerId: number,
  cardIds: number[],
  meldId: string,
  meldType: IMeldType | undefined,
  meldRank: IRank | undefined,
  resolve: any
) => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  const team = game.teams[game.players[game.currentPlayerId].teamId];
  if (!team) {
    throw new Error("team not found");
  }

  logGameState(gameId, game, true).then(() => {
    const cards = player.isInHand ? player.hand : player.foot;
    const thisMeldId = meldId || uuid.v4();
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

    resolve(null);
  });
};

export default playCards;
