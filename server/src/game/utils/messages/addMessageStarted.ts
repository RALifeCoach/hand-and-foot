import {IGamePlay, IPlayer} from '../../../models/game'
import { IMeldType } from "../../../../models/game";
import getMessageTypeText from "./getMessageTypeText";
import getCurrentPlayer from '../../functions/getCurrentPlayer'

const addMessageStarted = (gamePlay: IGamePlay, players: IPlayer[], type: IMeldType) => {
  const player = getCurrentPlayer(gamePlay, players)

  gamePlay.messages.push({
    isSent: false,
    type: "started",
    playerName: player.playerName,
    text: `started a ${getMessageTypeText(type)}`,
  });
};

export default addMessageStarted;
