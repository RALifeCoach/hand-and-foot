import { IGamePlay, IGameRules } from "Game";
import socketHandler from "../game/socketHandler";
import startPlaying from "../game/utils/startPlaying";
import { ACTION_RESPONSE } from "../../constants";
import { IGameController } from "./socketManager";

const doTransaction = (
  gamePlay: IGamePlay,
  gameRules: IGameRules,
  data: any,
  gameController: IGameController,
  gameId: number,
  resolve: any
) => {
  socketHandler(gamePlay, gameRules, gameId, data).then((message) => {
    startPlaying(
      ACTION_RESPONSE[data.type].sendToAll,
      gamePlay,
      gameRules,
      gameController,
      gameId
    );
    console.log('handle', ACTION_RESPONSE[data.type].sendToAll,
      gamePlay.gameState === "waitingToStart",
      gameRules.numberOfPlayers,
      Object.keys(gameController[gameId].players).length)
    if (
      ACTION_RESPONSE[data.type].sendToAll &&
      gamePlay.gameState === "waitingToStart" &&
      gameRules.numberOfPlayers ===
        Object.keys(gameController[gameId].players).length
    ) {
      gamePlay.gameState = "inPlay";
    }
    resolve({
      newGamePlay: gamePlay,
      message: message === null ? "" : JSON.stringify(message),
    });
  });
};

export default doTransaction;
