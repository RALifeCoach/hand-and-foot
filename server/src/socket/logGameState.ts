import * as uuid from "uuid";
import Database from "../Database";
import logger from "../util/logger";
import {IGamePlay, IPlayer} from '../models/game'

const logGameState = (gameId: number, gamePlay: IGamePlay, players: IPlayer[], canUndo: boolean) => {
  return new Promise<void>((resolve) => {
    const logId = uuid.v4();
    const sql = `insert into handf.game_log values ('${logId}', ${gameId}, '${JSON.stringify(
      gamePlay
    )}', '${JSON.stringify(
      players
    )}')`;
    Database.query(sql, (err: Error) => {
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
