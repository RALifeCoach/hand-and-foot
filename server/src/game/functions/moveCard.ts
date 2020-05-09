import { IGameJson, ICard } from "Game";
import sortCards from "../utils/sortCards";
import rePinCards from "./rePinCards";

const buildNewCards = (
  cards: ICard[],
  sourceCardId: number,
  destCardId: number
) => {
  const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
  const sourceIndex = newCards.findIndex((findCard) => {
    return findCard.cardId === sourceCardId;
  });
  newCards[sourceIndex].pinValue = 0;
  if (!destCardId) {
    return [
      ...newCards.slice(0, sourceIndex),
      ...newCards.slice(sourceIndex + 1),
      {
        ...newCards[sourceIndex],
        selected: false,
      },
    ];
  }
  const destIndex = newCards.findIndex(
    (findCard) => findCard.cardId === destCardId
  );
  if (sourceIndex < destIndex) {
    return [
      ...newCards.slice(0, sourceIndex),
      ...newCards.slice(sourceIndex + 1, destIndex),
      {
        ...newCards[sourceIndex],
        selected: false,
      },
      ...newCards.slice(destIndex),
    ];
  }
  if (sourceIndex > destIndex) {
    return [
      ...newCards.slice(0, destIndex),
      {
        ...newCards[sourceIndex],
        selected: false,
      },
      ...newCards.slice(destIndex, sourceIndex),
      ...newCards.slice(sourceIndex + 1),
    ];
  }
  return newCards;
};

const moveCard = (
  game: IGameJson,
  playerId: number,
  sourceCardId: number,
  destCardId: number
) => {
  const player = game.players[playerId];

  if (player.isInHand) {
    player.hand = rePinCards(
      buildNewCards(player.hand, sourceCardId, destCardId)
    );
  } else {
    player.foot = rePinCards(
      buildNewCards(player.foot, sourceCardId, destCardId)
    );
  }

  return {
    type: "moveCard",
    value: { cards: player.isInHand ? player.hand : player.foot },
  };
};

export default moveCard;
