import { IGamePlay, IPlayer, IMessage, IGameRules } from "Game";
import Database from "../Database";
import { ACTION_RESPONSE } from "../../constants";
import buildPlayerInfo from "../game/utils/buildPlayerInfo";
import { IGameController } from "./socketManager";
import * as uuid from "uuid";

const sendResponse = (
  gamePlay: IGamePlay,
  gameRules: IGameRules,
  message: string,
  gameController: IGameController,
  gameId: number,
  playerId: number,
  transactionType: string
) => {
  const messages: IMessage[] = [];
  if (ACTION_RESPONSE[transactionType].sendToAll) {
    const newMessages = gamePlay.messages.filter(
      (message) => transactionType === "addPlayer" || !message.isSent
    );
    messages.push(...JSON.parse(JSON.stringify(newMessages)));
    newMessages.forEach((message) => (message.isSent = true));
  }
  const newGamePlayStr = JSON.stringify(gamePlay);
  const sql = `update game set GamePlay = '${newGamePlayStr}' where GameId = '${gameId}'`;
  Database.exec(sql, (err: Error | null) => {
    if (err) {
      throw err;
    }
    const messageId = uuid.v4();
    if (ACTION_RESPONSE[transactionType].sendToAll) {
      try {
        (Object.values(gamePlay.players) as IPlayer[]).forEach((player) => {
          const playerInfo =
            message ||
            JSON.stringify({
              type: "updateGame",
              messageId,
              game: buildPlayerInfo(
                gamePlay,
                gameRules,
                gameId,
                player.playerId,
                messages,
                player.playerId === playerId
              ),
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
          messageId,
          game: buildPlayerInfo(gamePlay, gameRules, gameId, playerId, [], false),
        });
      gameController[gameId].players[playerId].send(playerInfo);
    }
  });
};

export default sendResponse;
