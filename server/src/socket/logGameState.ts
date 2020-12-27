import { IGamePlay } from "Game";
import * as uuid from "uuid";
import Database from "../Database";
import logger from "../util/logger";

const logGameState = (gameId: number, gamePlay: IGamePlay, canUndo: boolean) => {
  return new Promise<void>((resolve) => {
    const logId = uuid.v4();
    const sql = `insert into game_log values ('${logId}', ${gameId}, '${JSON.stringify(
      gamePlay
    )}')`;
    Database.exec(sql, (err: Error) => {
      if (err) {
        logger.error(`logGameState: error inserting game log ${JSON.stringify(err)} for sql ${sql}`);
        throw err;
      }
      gamePlay.transactionLog.unshift({
        canUndo,
        logId,
      });
      resolve();
    });
  });
};

export default logGameState;
