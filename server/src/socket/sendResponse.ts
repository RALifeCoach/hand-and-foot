import { IGamePlay, IPlayer, IMessage, IGameRules, ITeam } from "Game";
import Database from "../Database";
import { ACTION_RESPONSE } from "../../constants";
import buildPlayerInfo from "../game/utils/buildPlayerInfo";
import { IGameController } from "./socketManager";
import * as uuid from "uuid";
import logger from "../util/logger";

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
      logger.error(
        `sendResponse: error in update ${JSON.stringify(err)} for sql ${sql}`
      );
      throw err;
    }

    const messageId = uuid.v4();
    if (gamePlay.gameState === "askRoundEnd") {
      try {
        const team = gamePlay.teams[gamePlay.players[playerId].teamId];
        (Object.values(gamePlay.players) as IPlayer[]).forEach((player) => {
          const playerTeam = gamePlay.teams[player.teamId];
          const otherTeam = Object.values(gamePlay.teams).find(
            (team: ITeam) => team.teamId !== player.teamId
          );
          const message = `${player.playerName} has asked to end this round. If ended ${playerTeam.teamId} will
                score ${playerTeam.scoreBase} base points and ${otherTeam} will score ${otherTeam?.scoreBase}
                base points.`;
          const buttons =
            player.playerId === playerId || player.teamId === team.teamId
              ? []
              : [
                  {
                    text: "End Round",
                    sendType: "endRound",
                    sendValue: true,
                  },
                  {
                    text: "End Round",
                    sendType: "endRound",
                    sendValue: false,
                  },
                ];
          if (gameController[gameId].players[player.playerId]) {
            gameController[gameId].players[player.playerId].send(message);
          }
        });
      } catch (ex) {
        logger.error(
          `sendResponse: failed to send response ${JSON.stringify(ex)}`
        );
      }
    } else if (ACTION_RESPONSE[transactionType].sendToAll) {
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
        logger.error(
          `sendResponse: failed to send response ${JSON.stringify(ex)}`
        );
      }
    } else {
      const playerInfo =
        message ||
        JSON.stringify({
          type: "updateGame",
          messageId,
          game: buildPlayerInfo(
            gamePlay,
            gameRules,
            gameId,
            playerId,
            [],
            false
          ),
        });
      gameController[gameId].players[playerId].send(playerInfo);
    }
  });
};

export default sendResponse;
