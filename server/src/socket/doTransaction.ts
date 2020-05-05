import { IGameJson } from "Game";
import socketHandler from "../game/socketHandler";
import startPlaying from "../game/utils/startPlaying";
import { ACTION_RESPONSE } from "../../constants";
import { IGameController } from "./socketManager";

const doTransaction = (
  game: IGameJson,
  data: any,
  gameController: IGameController,
  gameId: number,
  resolve: any
) => {
  socketHandler(game, gameId, data)
    .then(message => {
      startPlaying(
        ACTION_RESPONSE[data.type].sendToAll,
        game,
        gameController,
        gameId
      );
      if (
        ACTION_RESPONSE[data.type].sendToAll &&
        game.gameState === "waitingToReStart" &&
        game.numberOfPlayers === Object.keys(gameController[gameId].players).length
      ) {
        game.gameState = "inPlay";
      }
      resolve({ newGame: game, message: message === null ? '' : JSON.stringify(message) });
  })
};

export default doTransaction;
