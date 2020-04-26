import buildPlayerInfo from "./game/buildPlayerInfo";
import socketHandler from "./game/socketHandler";
import { IPlayer, IGameJson, IGameState } from "Game";
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
    const game: IGameJson = JSON.parse(games[0].GameJson);
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
        if (game.gameState !== "finished") {
          game.gameState =
            game.numberOfPlayers ===
            Object.keys(gameController[gameId].players).length
              ? "inPlay"
              : "waitingToStart";
          if (game.gameState === "inPlay" && game.currentPlayerId === 0) {
            const currentPlayerIndex = Math.floor(
              Math.random() * game.numberOfPlayers
            );
            console.log("index", currentPlayerIndex);
            game.currentPlayerId = Object.values(game.players)[
              currentPlayerIndex
            ].playerId;
            game.players[game.currentPlayerId].playerState === "playing";
          }
        }
        try {
          (Object.values(game.players) as IPlayer[]).forEach((player) => {
            const playerInfo =
              message ||
              JSON.stringify({
                type: "updateGame",
                game: buildPlayerInfo(game, player.playerId),
              });
            if (gameController[gameId].players[player.playerId]) {
              console.log(player.playerId, "sent", playerInfo);
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
