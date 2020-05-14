import { IGamePlay } from "Game";
import logGameState from "../../socket/logGameState";
import addMessageDraw7 from "../utils/messages/addMessageDraw7";

const draw7 = (gamePlay: IGamePlay, gameId: number, resolve: any) => {
  const player = gamePlay.players[gamePlay.currentPlayerId];

  logGameState(gameId, gamePlay, true).then(() => {
    const cards = player.isInHand ? player.hand : player.foot;
    cards.push({ ...gamePlay.discard[0], isFromPile: true });
    player.numberOfCardsToDraw = 0;
    player.playerState = "draw7";
    addMessageDraw7(gamePlay, gamePlay.discard[0]);

    resolve(null);
  });
};

export default draw7;
