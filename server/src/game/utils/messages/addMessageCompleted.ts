
import { IGameJson, IMeldType } from "Game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageCompleted = (game: IGameJson, type: IMeldType) => {
  game.messages.push({
    isSent: false,
    type: "completed",
    playerName: game.players[game.currentPlayerId].playerName,
    text: `completed a ${getMessageTypeText(type)}`,
  });
};

export default addMessageCompleted;
