import * as uuid from "uuid";
import Database from "../Database";
import {IGamePlay, IPlayer} from '../models/game'

const logGameState = (gameId: number, gamePlay: IGamePlay, players: IPlayer[], canUndo: boolean) => {
  return new Promise<void>((resolve) => {
    const logId = uuid.v4();
    const sql = `insert into handf.game_log (logid, gameid, gameplay, players)
        values ('${logId}', ${gameId}, 
        '${JSON.stringify(gamePlay)}',
        '${JSON.stringify(players)}')`;
    Database.query(sql, () => {
      gamePlay.transactionLog.unshift({
        canUndo,
        logId,
      });
      resolve();
    });
  });
};

export default logGameState;
