import { IGamePlay, IMeldType } from "Game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageStarted = (gamePlay: IGamePlay, type: IMeldType) => {
  gamePlay.messages.push({
    isSent: false,
    type: "started",
    playerName: gamePlay.players[gamePlay.currentPlayerId].playerName,
    text: `started a ${getMessageTypeText(type)}`,
  });
};

export default addMessageStarted;
