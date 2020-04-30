import { IGameJson, ICard } from "Game";
import sortCards from "../utils/sortCards";

const buildNewCards = (
  cards: ICard[],
  sourceCardId: number,
  destCardId: number
) => {
  const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
  const sourceIndex = newCards.findIndex((findCard) => {
    return findCard.cardId === sourceCardId;
  });
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

const rePinCards = (cards: ICard[]) => {
  const newCards = JSON.parse(JSON.stringify(cards));
  const lastPinnedCardReverseIndex = cards
    .reverse()
    .findIndex((card) => card.pinValue);
  if (lastPinnedCardReverseIndex > -1) {
    const lastPinnedCardIndex = cards.length - lastPinnedCardReverseIndex;
    for (let i = 0; i < lastPinnedCardIndex; i++) {
      newCards[i].pinValue = i + 1;
    }
  }
  return newCards;
};

const moveCard = (
  game: IGameJson,
  playerId: string,
  sourceCardId: number,
  destCardId: number
): string => {
  const player = game.players[playerId];
  if (!player) {
    throw new Error("player is missing");
  }

  if (player.isInHand) {
    player.hand = rePinCards(
      buildNewCards(player.hand, sourceCardId, destCardId)
    );
  } else {
    player.foot = rePinCards(
      buildNewCards(player.foot, sourceCardId, destCardId)
    );
  }

  return JSON.stringify({
    type: "moveCard",
    value: { cards: player.isInHand ? player.hand : player.foot },
  });
};

export default moveCard;
