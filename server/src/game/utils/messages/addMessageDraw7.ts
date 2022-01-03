import {IGamePlay, IPlayer} from '../../../models/game'
import { ICard } from "../../../../../models/game";
import getCurrentPlayer from '../../functions/getCurrentPlayer'

const addMessageDraw7 = (gamePlay: IGamePlay, players: IPlayer[], card: ICard) => {
  const player = getCurrentPlayer(gamePlay, players)

  gamePlay.messages.push({
    isSent: false,
    type: "draw7",
    playerName: player.playerName,
    text: `drew the ${card.suit}-${card.rank}`,
  });
};

export default addMessageDraw7;
