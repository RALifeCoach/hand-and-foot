import { IGameJson } from "Game";
import * as uuid from "uuid";
import Database from "../Database";

const logGameState = (
  gameId: number,
  game: IGameJson,
  canUndo: boolean,
) => {
  return new Promise(resolve => {
    const logId = uuid.v4();
    const sql = `insert into game_log values ('${logId}', ${gameId}, '${JSON.stringify(
      game
    )}')`;
    Database.exec(sql, (err: Error) => {
      if (err) {
        console.log(err);
        throw err;
      }
      game.transactionLog.push({
        canUndo,
        logId,
      });
      resolve();
    });
  });
};

export default logGameState;
