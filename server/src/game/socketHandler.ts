import {IAction, IGame} from "Game";
import addPlayer from "./addPlayer";
import * as WebSocket from "ws";

const socketHandler = (game: IGame, action: IAction, socket: WebSocket): boolean => {
  switch (action.type) {
    case 'addPlayer':
      return addPlayer(game, action.value.playerId, action.value.teamId, action.value.position, socket);
    default:
      throw new Error('unknown action type');
  }
};

export default socketHandler;
