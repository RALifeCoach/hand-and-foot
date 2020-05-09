import { IGameJson } from "Game";
import logGameState from "../../socket/logGameState";
import addMessageDraw7 from "../utils/messages/addMessageDraw7";

const draw7 = (game: IGameJson, gameId: number, resolve: any) => {
  const player = game.players[game.currentPlayerId];

  logGameState(gameId, game, true).then(() => {
    const cards = player.isInHand ? player.hand : player.foot;
    cards.push({ ...game.discard[0], isFromPile: true });
    player.numberOfCardsToDraw = 0;
    player.playerState = "draw7";
    addMessageDraw7(game, game.discard[0]);

    resolve(null);
  });
};

export default draw7;
