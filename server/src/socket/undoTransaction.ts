import { IGameJson } from "Game";
import Database from "../Database";

const undoTransaction = (game: IGameJson, resolve: any) => {
  const undo = game.transactionLog[0];
  if (undo?.canUndo) {
    const undoSql = `select * from game_log where LogId = '${undo.logId}'`;
    Database.query(undoSql, (games: any) => {
      if (games.length !== 1) {
        console.log(undoSql);
        throw new Error(`undo game does not exist ${undo.logId}`);
      }
      const undoGame: IGameJson = JSON.parse(games[0].GameJson);
      resolve({ game: undoGame, message: "" });
    });
  } else {
    resolve({
      game,
      message: JSON.stringify({
        type: "cannotUndo",
        value: "",
      }),
    });
  }
};

export default undoTransaction;
