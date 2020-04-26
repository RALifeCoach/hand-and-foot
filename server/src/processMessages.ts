import buildPlayerInfo from "./game/buildPlayerInfo";
import socketHandler from "./game/socketHandler";
import { IPlayer } from "Game";
import Database from "./Database";
import { IGameController } from "./socketManager";

const processMessages = (
  messageStack: any[],
  gameController: IGameController
) => {
  const data = messageStack[0];
  const gameId = data.value.gameId;
  const playerId = data.value.playerId;

  const sql = `select * from game where gameId = '${data.value.gameId}'`;
  Database.query(sql, (games) => {
    if (games.length !== 1) {
      throw new Error("game does not exist");
    }
    const game = JSON.parse(games[0].GameJson);
    console.log("process", data);
    const { sendToAll, message } = socketHandler(game, data);
    if (message) {
      console.log(sendToAll, message);
    }
    const newGameStr = JSON.stringify(game);
    const sql = `update game set GameJson= '${newGameStr}' where GameId = '${data.value.gameId}'`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        throw err;
      }
      if (sendToAll) {
        try {
          (Object.values(game.players) as IPlayer[]).forEach((player) => {
            const playerInfo =
              message ||
              JSON.stringify({
                type: "updateGame",
                game: buildPlayerInfo(game, player.playerId),
              });
            if (gameController[gameId].players[player.playerId]) {
              gameController[gameId].players[player.playerId].send(playerInfo);
            }
          });
        } catch (ex) {
          console.log(ex);
          console.log("failed to send");
        }
      } else {
        const playerInfo =
          message ||
          JSON.stringify({
            type: "updateGame",
            game: buildPlayerInfo(game, data.value.playerId),
          });
        gameController[gameId].players[playerId].send(playerInfo);
      }
      messageStack.splice(0, 1);
      if (messageStack.length) {
        processMessages(messageStack, gameController);
      }
    });
  });
};

export default processMessages;
