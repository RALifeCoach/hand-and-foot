import { IGameJson, IMeldType } from "Game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageStarted = (game: IGameJson, type: IMeldType) => {
  game.messages.push({
    isSent: false,
    type: "started",
    playerName: game.players[game.currentPlayerId].playerName,
    text: `started a ${getMessageTypeText(type)}`,
  });
};

export default addMessageStarted;
