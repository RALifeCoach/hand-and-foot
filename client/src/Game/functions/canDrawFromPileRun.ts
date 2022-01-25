import { IPlayerCurrent } from "Game";
import { ICard } from "../../../models/game";
import { ICardMapping } from "./mapCards";

const canDrawFromPileRun = (
  discardCard: ICard,
  mapping: ICardMapping,
  player: IPlayerCurrent
) => {
  if (mapping.suits[discardCard.suit] > 1) {
    const spots = player.cards
      .filter((card) => card.suit === discardCard.suit)
      .reduce(
        (spots, card) => Object.assign(spots, { [card.rank || "X"]: true }),
        {} as { [rank: string]: boolean }
      );

    switch (discardCard.rank) {
      case "4":
        if (spots["5"] && spots["6"]) {
          return "";
        }
        break;
      case "5":
        if (spots["4"] && spots["6"]) {
          return "";
        }
        if (spots["6"] && spots["7"]) {
          return "";
        }
        break;
      case "6":
        if (spots["4"] && spots["5"]) {
          return "";
        }
        if (spots["5"] && spots["7"]) {
          return "";
        }
        if (spots["7"] && spots["8"]) {
          return "";
        }
        break;
      case "7":
        if (spots["5"] && spots["6"]) {
          return "";
        }
        if (spots["6"] && spots["8"]) {
          return "";
        }
        if (spots["8"] && spots["9"]) {
          return "";
        }
        break;
      case "8":
        if (spots["6"] && spots["7"]) {
          return "";
        }
        if (spots["7"] && spots["9"]) {
          return "";
        }
        if (spots["9"] && spots["10"]) {
          return "";
        }
        break;
      case "9":
        if (spots["7"] && spots["8"]) {
          return "";
        }
        if (spots["8"] && spots["10"]) {
          return "";
        }
        if (spots["10"] && spots["J"]) {
          return "";
        }
        break;
      case "10":
        if (spots["8"] && spots["9"]) {
          return "";
        }
        if (spots["9"] && spots["J"]) {
          return "";
        }
        if (spots["J"] && spots["Q"]) {
          return "";
        }
        break;
      case "J":
        if (spots["9"] && spots["10"]) {
          return "";
        }
        if (spots["10"] && spots["Q"]) {
          return "";
        }
        if (spots["Q"] && spots["K"]) {
          return "";
        }
        break;
      case "Q":
        if (spots["10"] && spots["J"]) {
          return "";
        }
        if (spots["J"] && spots["K"]) {
          return "";
        }
        if (spots["K"] && spots["A"]) {
          return "";
        }
        break;
      case "K":
        if (spots["J"] && spots["Q"]) {
          return "";
        }
        if (spots["Q"] && spots["A"]) {
          return "";
        }
        break;
      case "A":
        if (spots["Q"] && spots["K"]) {
          return "";
        }
        break;
    }
  }

  return "You do not have the cards in your hand needed for drawing from the pile";
};

export default canDrawFromPileRun;
