import * as WebSocket from "ws";
import buildPlayerInfo from "./game/buildPlayerInfo";
import socketHandler from "./game/socketHandler";
import { IPlayer } from "Game";
import Database from "./Database";

interface IGameController {
  [gameId: string]: {
    players: {
      [playerId: string]: WebSocket;
    };
  };
}

const gameController: IGameController = {};

const socketManager = (server: any) => {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (socket: WebSocket) => {
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

      const sql = `select * from game where gameId = '${data.value.gameId}'`;
      Database.query(sql, (games) => {
        if (games.length !== 1) {
          throw new Error("game does not exist");
        }
        const game = JSON.parse(games[0].GameJson);
        const sendToAll = socketHandler(game, data);
        const newGameStr = JSON.stringify(game);
        const sql = `update game set GameJson= '${newGameStr}' where GameId = '${game.gameId}'`;
        Database.exec(sql, (err: Error | null) => {
          if (err) {
            throw err;
          }
          if (sendToAll) {
            try {
              (Object.values(game.players) as IPlayer[]).forEach((player) => {
                const playerInfo = JSON.stringify({
                  type: "updateGame",
                  game: buildPlayerInfo(game, player.playerId),
                });
                gameController[game.gameId].players[player.playerId].send(
                  playerInfo
                );
              });
            } catch (ex) {
              console.log("failed to send");
            }
          } else {
            const playerInfo = JSON.stringify({
              type: "updateGame",
              game: buildPlayerInfo(game, data.value.playerId),
            });
            socket.send(playerInfo);
          }
        });
      });
    });
  });
};

export default socketManager;
