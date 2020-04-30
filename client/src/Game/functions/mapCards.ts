import { ICard } from "Game";

const mapCards = (cards: ICard[]) => {
  return cards.reduce(
    (mapping, card) => {
      if (card.suit === "J" || card.rank === "2") {
        if (!mapping.others["wild"]) {
          mapping.others["wild"] = 0;
        }
        mapping.others["wild"] += 1;
        return mapping;
      }
      if (card.rank === "3") {
        if (["C", "S"].indexOf(card.suit) > -1) {
          if (!mapping.others["black3"]) {
            mapping.others["black3"] = 0;
          }
          mapping.others["black3"] += 1;
        } else {
          if (!mapping.others["red3"]) {
            mapping.others["red3"] = 0;
          }
          mapping.others["red3"] += 1;
        }
        return mapping;
      }
      if (!mapping.suits[card.suit]) {
        mapping.suits[card.suit] = 0;
      }
      mapping.suits[card.suit] += 1;
      if (!mapping.ranks[card.rank]) {
        mapping.ranks[card.rank] = 0;
      }
      mapping.ranks[card.rank] += 1;
      return mapping;
    },
    { others: {}, suits: {}, ranks: {} } as {
      others: { [type: string]: number };
      suits: { [suit: string]: number };
      ranks: { [rank: string]: number };
    }
  );
};

export default mapCards;
