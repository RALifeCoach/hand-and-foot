import {IGamePlay, IPlayer} from '../../../models/game'
import { IMeldType } from "../../../../../models/game";
import getMessageTypeText from "./getMessageTypeText";
import getCurrentPlayer from '../../functions/getCurrentPlayer'

const addMessageCompleted = (gamePlay: IGamePlay, players: IPlayer[], type: IMeldType) => {
  const player = getCurrentPlayer(gamePlay, players)

  gamePlay.messages.push({
    isSent: false,
    type: "completed",
    playerName: player.playerName,
    text: `completed a ${getMessageTypeText(type)}`,
  });
};

export default addMessageCompleted;
