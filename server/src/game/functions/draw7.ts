import {IGamePlay, IPlayer} from '../../models/game'
import logGameState from "../../socket/logGameState";
import addMessageDraw7 from "../utils/messages/addMessageDraw7";

const draw7 = (gamePlay: IGamePlay, players: IPlayer[], gameId: number, resolve: any) => {
  console.debug('draw 7');
  const player = players[gamePlay.currentPlayerIndex];

  logGameState(gameId, gamePlay, players, true).then(() => {
    const cards = player.isInHand ? player.hand : player.foot;
    cards.push({ ...gamePlay.discard[0], isFromPile: true });
    player.numberOfCardsToDraw = 0;
    player.playerState = "draw7";
    addMessageDraw7(gamePlay, players, gamePlay.discard[0]);

    resolve(null);
  });
};

export default draw7;
