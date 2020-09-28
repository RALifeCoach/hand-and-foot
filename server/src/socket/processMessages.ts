import { IGamePlay, IGameRules } from "Game";
import { IGameController } from "./socketManager";
import Database from "../Database";
import undoTransaction from "./undoTransaction";
import doTransaction from "./doTransaction";
import sendResponse from "./sendResponse";
import logger from "../util/logger";

const processMessages = (
  messageStack: any[],
  gameController: IGameController
) => {
  const data = messageStack[0];

  if (!gameController[data.value.gameId]) {
    gameController[data.value.gameId] = { players: {} };
  }
  gameController[data.value.gameId].players[data.value.playerId] = data.socket;

  const gameId = data.value.gameId;
  logger.debug(`About to process ${data.type} for gameId ${data.value.gameId} and player ${data.value.playerId}`);

  const sqlGame = `select * from game where gameId = '${data.value.gameId}'`;
  Database.query(sqlGame, (games) => {
    if (games.length !== 1) {
      logger.error(`ProcessMessages: wrong number of games returned ${games.length} for query ${sqlGame}`)
      throw new Error("game does not exist");
    }
    const gamePlay: IGamePlay = JSON.parse(games[0].GamePlay);
    const gameRules: IGameRules = JSON.parse(games[0].GameRules);

    new Promise<{ newGamePlay: IGamePlay; message: string }>((resolve) => {
      if (data.type === "undo") {
        undoTransaction(gamePlay, resolve);
      } else {
        doTransaction(
          gamePlay,
          gameRules,
          data,
          gameController,
          gameId,
          resolve
        );
      }
    }).then(
      ({
        newGamePlay,
        message,
      }: {
        newGamePlay: IGamePlay;
        message: string;
      }) => {
        sendResponse(
          newGamePlay,
          gameRules,
          message,
          gameController,
          data.value.gameId,
          data.value.playerId,
          data.type
        );
        messageStack.splice(0, 1);
        if (messageStack.length) {
          processMessages(messageStack, gameController);
        }
      }
    );
  });
};

export default processMessages;
