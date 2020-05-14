import { IGamePlay, IMeldType, ICard } from "Game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageAdded = (
  gamePlay: IGamePlay,
  type: IMeldType,
  cards: ICard[]
) => {
  if (type === "3s") {
    gamePlay.messages.push({
      isSent: false,
      type: "added",
      playerName: gamePlay.players[gamePlay.currentPlayerId].playerName,
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
  gamePlay.messages.push({
    isSent: false,
    type: "added",
    playerName: gamePlay.players[gamePlay.currentPlayerId].playerName,
    text: `added ${cardDisplays} to a ${getMessageTypeText(type)}`,
  });
};

export default addMessageAdded;
