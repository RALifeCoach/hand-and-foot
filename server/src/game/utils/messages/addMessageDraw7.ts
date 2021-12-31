import {IGamePlay, IPlayer} from '../../../models/game'
import { ICard } from "../../../../../models/game";

const addMessageDraw7 = (gamePlay: IGamePlay, players: IPlayer[], card: ICard) => {
  gamePlay.messages.push({
    isSent: false,
    type: "draw7",
    playerName: players[gamePlay.currentPlayerIndex].playerName,
    text: `drew the ${card.suit}-${card.rank}`,
  });
};

export default addMessageDraw7;
