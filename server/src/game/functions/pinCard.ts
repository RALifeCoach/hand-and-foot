import {IGamePlay, IPlayer} from '../../models/game'
import { ICard } from "../../../models/game";
import sortCards from "../utils/sortCards";
import logger from "../../util/logger";

const pinCard = (gamePlay: IGamePlay, players: IPlayer[], playerId: number, cardId: number) => {
  const player = players.find(player => player.playerId == playerId)
  if (!player) {
    throw new Error("player not found");
  }

  const cards = player.isInHand ? player.hand : player.foot;
  const newCards: ICard[] = JSON.parse(JSON.stringify(cards));

  const updateCard = newCards.find((findCard) => findCard.cardId === cardId);
  if (!updateCard) {
    logger.error(`pinCard: card not found ${JSON.stringify(newCards)}, ${cardId}`);
    throw new Error("card not found");
  }

  if (updateCard.pinValue) {
    newCards.forEach(
      (card) =>
        (card.pinValue =
          card.pinValue > updateCard.pinValue
            ? card.pinValue - 1
            : card.pinValue)
    );
    updateCard.pinValue = 0;
  } else {
    updateCard.pinValue = cards.filter((card) => card.pinValue).length + 1;
  }

  if (player.isInHand) {
    player.hand = sortCards(newCards, player.sortOrder);
  } else {
    player.foot = sortCards(newCards, player.sortOrder);
  }

  return {
    type: "pinCard",
    value: { cards: player.isInHand ? player.hand : player.foot },
  };
};

export default pinCard;
