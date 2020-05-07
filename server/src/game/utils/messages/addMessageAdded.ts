import { IGameJson, IMeldType, ICard } from "Game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageAdded = (
  game: IGameJson,
  type: IMeldType,
  cards: ICard[]
) => {
  if (type === "3s") {
    game.messages.push({
      isSent: false,
      type: "added",
      playerName: game.players[game.currentPlayerId].playerName,
      text: `added ${cards.length} ${getMessageTypeText(type)}${
        cards.length > 1 ? "s" : ""
      }`,
    });
    return;
  }
  const cardDisplays = cards
    .map((card) => {
      return card.suit === "J" ? "*" : `${card.suit}-${card.rank}`;
    })
    .join(", ");
  game.messages.push({
    isSent: false,
    type: "added",
    playerName: game.players[game.currentPlayerId].playerName,
    text: `added ${cardDisplays} to a ${getMessageTypeText(type)}`,
  });
};

export default addMessageAdded;
