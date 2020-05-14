
import { IGamePlay, IMeldType } from "Game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageCompleted = (gamePlay: IGamePlay, type: IMeldType) => {
  gamePlay.messages.push({
    isSent: false,
    type: "completed",
    playerName: gamePlay.players[gamePlay.currentPlayerId].playerName,
    text: `completed a ${getMessageTypeText(type)}`,
  });
};

export default addMessageCompleted;
