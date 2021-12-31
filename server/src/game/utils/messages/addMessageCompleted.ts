import {IGamePlay, IPlayer} from '../../../models/game'
import { IMeldType } from "../../../../../models/game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageCompleted = (gamePlay: IGamePlay, players: IPlayer[], type: IMeldType) => {
  gamePlay.messages.push({
    isSent: false,
    type: "completed",
    playerName: players[gamePlay.currentPlayerIndex].playerName,
    text: `completed a ${getMessageTypeText(type)}`,
  });
};

export default addMessageCompleted;
