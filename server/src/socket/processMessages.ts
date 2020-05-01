import { IGameJson } from "Game";
import { IGameController } from "./socketManager";
import Database from "../Database";
import undoTransaction from "./undoTransaction";
import doTransaction from "./doTransaction";
import sendResponse from "./sendResponse";

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
  const playerId = data.value.playerId;
  console.log(
    "about to process",
    data.type,
    data.value.gameId,
    data.value.playerId
  );

  const sqlGame = `select * from game where gameId = '${data.value.gameId}'`;
  Database.query(sqlGame, (games) => {
    if (games.length !== 1) {
      console.log(sqlGame);
      throw new Error("game does not exist");
    }
    const game: IGameJson = JSON.parse(games[0].GameJson);

    new Promise<{ game: IGameJson; message: string }>((resolve) => {
      if (data.type === "undo") {
        undoTransaction(game, resolve);
      } else {
        doTransaction(game, data, gameController, gameId, resolve);
      }
    }).then(({ game, message }: { game: IGameJson; message: string }) => {
      sendResponse(
        game,
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
    });
  });
};

export default processMessages;
