import { ICard } from "Game";

const mapMeldCards = (cards: ICard[]) => {
  return cards.reduce((mapping, card) => {
    if (card.suit === 'J' || card.rank === '2') {
      mapping.wild += 1;
    } else {
      mapping.naturals += 1;
    }
    return mapping;
  }, { wild: 0, naturals: 0} as { wild: number, naturals: number });
}

export default mapMeldCards;
