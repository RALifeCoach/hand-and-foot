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
  playerId: number,
  resolve: any
) => {
  socketHandler(gamePlay, gameRules, gameId, playerId, data).then((message) => {
    startPlaying(
      ACTION_RESPONSE[data.type].sendToAll,
      gamePlay,
      gameRules,
      gameController,
      gameId
    );
    resolve({
      newGamePlay: gamePlay,
      message: message === null ? "" : JSON.stringify(message),
    });
  });
};

export default doTransaction;
