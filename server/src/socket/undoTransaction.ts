import { IGamePlay } from "Game";
import Database from "../Database";
import logger from "../util/logger";

const undoTransaction = (gamePlay: IGamePlay, resolve: any) => {
  const undo = gamePlay.transactionLog[0];
  if (undo?.canUndo) {
    const undoSql = `select * from game_log where LogId = '${undo.logId}'`;
    Database.query(undoSql, (games: any) => {
      if (games.length !== 1) {
        logger.error(`undoTransaction: wrong number of rows ${games.length} for query ${undoSql}`);
        throw new Error(`undo game does not exist ${undo.logId}`);
      }
      const undoGame: IGamePlay = JSON.parse(games[0].GamePlay);
      resolve({ newGamePlay: undoGame, message: "" });
    });
  } else {
    resolve({
      newGamePlay: gamePlay,
      message: JSON.stringify({
        type: "cannotUndo",
        value: "",
      }),
    });
  }
};

export default undoTransaction;
