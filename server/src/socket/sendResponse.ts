import { IGameJson, IPlayer } from "Game";
import Database from "../Database";
import { ACTION_RESPONSE } from "../../constants";
import buildPlayerInfo from "../game/utils/buildPlayerInfo";
import { IGameController } from "./socketManager";

const sendResponse = (
  game: IGameJson,
  message: string,
  gameController: IGameController,
  gameId: number,
  playerId: number,
  transactionType: string,
) => {
  const newGameStr = JSON.stringify(game);
  const sql = `update game set GameJson= '${newGameStr}' where GameId = '${gameId}'`;
  Database.exec(sql, (err: Error | null) => {
    if (err) {
      throw err;
    }
    if (ACTION_RESPONSE[transactionType].sendToAll) {
      try {
        (Object.values(game.players) as IPlayer[]).forEach((player) => {
          const playerInfo =
            message ||
            JSON.stringify({
              type: "updateGame",
              game: buildPlayerInfo(game, gameId, player.playerId),
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
          game: buildPlayerInfo(game, gameId, playerId),
        });
      gameController[gameId].players[playerId].send(playerInfo);
    }
  });
};

export default sendResponse;
