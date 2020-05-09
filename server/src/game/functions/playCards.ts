import { IGameJson, IMeldType, IRank, ICard } from "Game";
import * as uuid from "uuid";
import logGameState from "../../socket/logGameState";
import isRedThree from "../utils/isRedThree";
import isWildCard from "../utils/isWildCard";
import scoreTeam from "../utils/scoreTeam";
import addMessageStarted from "../utils/messages/addMessageStarted";
import addMessageAdded from "../utils/messages/addMessageAdded";
import addMessageCompleted from "../utils/messages/addMessageCompleted";
import addMessageFoot from "../utils/messages/addMessageFoot";
import completeDraw7 from "./completeDraw7";
import getCardValue from "../utils/getCardValue";
import rePinCards from "./rePinCards";

const playCards = (
  gameId: number,
  game: IGameJson,
  cardIds: number[],
  meldId: string,
  meldType: IMeldType,
  meldRank: IRank | undefined,
  resolve: any
) => {
  const player = game.players[game.currentPlayerId];
  const team = game.teams[game.players[game.currentPlayerId].teamId];
  if (!team) {
    throw new Error("team not found");
  }

  completeDraw7(game, gameId)
    .then(() => logGameState(gameId, game, true))
    .then(() => {
      const cards = player.isInHand ? player.hand : player.foot;
      let thisMeldId = meldId;
      const selectedCards: ICard[] = [];
      cardIds.forEach((cardId) => {
        const playCardIndex = cards.findIndex((card) => card.cardId === cardId);
        if (playCardIndex === -1) {
          console.log(cards, cardId);
          throw new Error("card not found");
        }
        const card = cards[playCardIndex];
        card.pinValue = 0;
        selectedCards.push(card);
        if (!thisMeldId || isRedThree(card)) {
          if (!isRedThree(card)) {
            addMessageStarted(game, meldType);
          }
          thisMeldId = uuid.v4();
          team.melds[thisMeldId] = {
            meldId: thisMeldId,
            cards: [],
            isComplete: isRedThree(card),
            type: meldType,
            rank: meldRank,
          };
        }
        if (isRedThree(card)) {
          player.numberOfCardsToDraw += 1;
        }
        const meld = team.melds[thisMeldId];
        if (meld.type === "clean" && isWildCard(card)) {
          meld.type = "dirty";
        }
        meld.cards.push(...cards.splice(playCardIndex, 1));
      });

      const meld = team.melds[thisMeldId];
      meld.cards.sort((cardA: ICard, cardB: ICard) => {
        if (isWildCard(cardA) && !isWildCard(cardB)) {
          return -1;
        }
        if (isWildCard(cardB) && !isWildCard(cardA)) {
          return 1;
        }
        if (isWildCard(cardB) && isWildCard(cardA)) {
          return 0;
        }
        if (meld.type === "run") {
          return getCardValue(cardB.rank) - getCardValue(cardA.rank);
        }
        return cardA.suit < cardB.suit ? -1 : 1;
      });

      addMessageAdded(game, meld.type, selectedCards);

      if (!game.canOverFillMeld && team.melds[thisMeldId].cards.length > 6) {
        team.melds[thisMeldId].isComplete = true;
        addMessageCompleted(game, team.melds[thisMeldId].type);
      }

      if (cards.length === 0 && player.playerState !== "draw7") {
        player.isInHand = false;
        addMessageFoot(game, true);
      } else {
        rePinCards(cards);
      }

      const score = scoreTeam(game, team);
      team.scoreBase = score.scoreBase;
      team.scoreCards = score.scoreCards;
      team.scoreOnTable = score.scoreOnTable;

      resolve(null);
    });
};

export default playCards;
