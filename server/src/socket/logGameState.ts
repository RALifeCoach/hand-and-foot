import { IGamePlay } from "Game";
import * as uuid from "uuid";
import Database from "../Database";

const logGameState = (gameId: number, gamePlay: IGamePlay, canUndo: boolean) => {
  return new Promise((resolve) => {
    const logId = uuid.v4();
    const sql = `insert into game_log values ('${logId}', ${gameId}, '${JSON.stringify(
      gamePlay
    )}')`;
    Database.exec(sql, (err: Error) => {
      if (err) {
        console.log(err);
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
