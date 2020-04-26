import * as WebSocket from "ws";
import processMessages from "./processMessages";

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
  wss.on("connection", (socket: WebSocket, req: any) => {
    let gameId = "";
    let playerId = "";
    socket.on("message", (message: string) => {
      const data: { type: string; value: any } = JSON.parse(message);

      if (!gameController[data.value.gameId]) {
        gameController[data.value.gameId] = { players: {} };
        gameId = data.value.gameId;
      }
      gameController[data.value.gameId].players[data.value.playerId] = socket;
      playerId = data.value.playerId;

      messageStack.push(data);
      if (messageStack.length > 1) {
        return;
      }

      processMessages(messageStack, gameController);
    });
    wss.on("close", () => {
      socket.removeAllListeners();
      delete gameController[gameId].players[playerId];
      if (Object.keys(gameController[gameId].players).length === 0) {
        delete gameController[gameId];
      }
    });
  });
};

export default socketManager;
