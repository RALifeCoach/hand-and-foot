import {IGamePlay, IPlayer} from '../../../models/game'
import { IMeldType } from "../../../../../models/game";
import getMessageTypeText from "./getMessageTypeText";

const addMessageStarted = (gamePlay: IGamePlay, players: IPlayer[], type: IMeldType) => {
  gamePlay.messages.push({
    isSent: false,
    type: "started",
    playerName: players[gamePlay.currentPlayerIndex].playerName,
    text: `started a ${getMessageTypeText(type)}`,
  });
};

export default addMessageStarted;
