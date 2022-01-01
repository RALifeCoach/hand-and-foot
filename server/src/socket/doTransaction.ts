import {IGamePlay, IPlayer} from '../models/game'
import { IGameBase } from "../../../models/game";
import socketHandler from "../game/socketHandler";
import startPlaying from "../game/utils/startPlaying";
import { ACTION_RESPONSE } from "../../constants";
import { IGameController } from "./socketManager";

const doTransaction = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  data: any,
  gameController: IGameController,
  gameId: number,
  playerId: number,
  resolve: any
) => {
  socketHandler(gamePlay, gameRules, players, gameId, playerId, data).then((message) => {
    startPlaying(
      ACTION_RESPONSE[data.type].sendToAll,
      gamePlay,
      gameRules,
      players,
      gameController,
      gameId
    );
    resolve({
      newGamePlay: gamePlay,
      newPlayers: players,
      message: message === null ? "" : JSON.stringify(message),
    });
  });
};

export default doTransaction;
