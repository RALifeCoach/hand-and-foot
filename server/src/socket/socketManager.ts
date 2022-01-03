import * as WebSocket from "ws";
import processMessages from "./processMessages";
import isAuthorized from "../routes/authentication/isAuthorized";

export interface IGameController {
  [gameId: string]: {
    players: {
      [playerId: string]: WebSocket;
    };
  };
}

const gameController: IGameController = {};
const messageStack: any[] = [];

const socketManager = (server: any) => {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (socket: WebSocket) => {
    let gameId = "";
    let playerId = "";
    socket.on("message", (message: string) => {
      const data: { type: string; value: any; token: string } = JSON.parse(
        message
      );
      console.log('arrived', data.type, data.value)

      new Promise<any>((resolve: (user: any) => void, reject: () => void) => {
        isAuthorized(data.token, "", resolve, reject);
      })
        .then(() => {
          gameId = data.value.gameId;
          playerId = data.value.playerId;

          messageStack.push({ ...data, socket });
          if (messageStack.length > 1) {
            return;
          }

          processMessages(messageStack, gameController);
        })
        .catch((err) => {
          console.log('err', err)
          const message = JSON.stringify({ type: "authFailure" });
          socket.send(message);
        });
    });
    wss.on("close", () => {
      socket.removeAllListeners();
      delete gameController[gameId].players[playerId];
      if (Object.keys(gameController[gameId].players).length === 0) {
        delete gameController[gameId];
      }

      messageStack.push({ type: "disconnect", value: { gameId, playerId } });
    });
  });
};

export default socketManager;
