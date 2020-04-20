import * as WebSocket from "ws";
import startGame from "./game/startGame";
import buildPlayerInfo from "./game/buildPlayerInfo";
import socketHandler from "./game/socketHandler";
import * as redis from "redis";
import {IPlayer} from 'Game';

const client = redis.createClient();

const socketManager = (server: any) => {
  const wss = new WebSocket.Server({server});
  wss.on('connection', (socket: WebSocket) => {
    socket.on('message', (message: string) => {
      const data: { type: string, value: any } = JSON.parse(message);

      console.log(data);
      client.get(data.value.gameId, (err, gameStr) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        if (data.type === 'newGame') {
          if (gameStr) {
            throw new Error('game already exists');
          }
          client.set(data.value.gameId, JSON.stringify(startGame(data.value.numberOfPlayers)));
          return;
        }
        if (!gameStr) {
          throw new Error('game does not exist');
        }
        const game = JSON.parse(gameStr);
        const sendToAll = socketHandler(game, data, socket);
        if (sendToAll) {
          (Object.values(game.players) as IPlayer[])
            .forEach(player => {
              const playerInfo = JSON.stringify(buildPlayerInfo(game, player.playerId));
              player.socket.send(playerInfo);
            });
        } else {
          const playerInfo = JSON.stringify(buildPlayerInfo(game, data.value.playerId));
          socket.send(playerInfo);
        }
        const newGameStr = JSON.stringify(game);
        client.set(data.value.gameId, newGameStr);
      });
    });
  });
};

export default socketManager;
