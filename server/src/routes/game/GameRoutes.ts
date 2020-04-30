import * as express from "express";
import Database from "../../Database";
import bcrypt from "bcrypt";
import userValidate from "../../user/UserValidate";
import startGame from "../../game/functions/startGame";

const GameRoutes = () => {
  const router = express.Router();
  router.get("/restart/:gameName/:numberOfPlayers", (req: any, res: any) => {
    const game = startGame(req.params.numberOfPlayers);
    const sql = `truncate game`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        throw err;
      }
      const sql = `insert into game (GameName, GameJson) values ('${
        req.params.gameName
      }', '${JSON.stringify(game)}')`;
      Database.exec(sql, (err: Error | null) => {
        if (err) {
          throw err;
        }
        const sql = `SELECT LAST_INSERT_ID()`;
        Database.query(sql, (data) => {
          if (data.length !== 1) {
            console.log("invalid data", data);
            throw new Error("yikes!");
          }
          res.json({ gameId: data[0]["LAST_INSERT_ID()"] });
        });
      });
    });
  });

  return router;
};

export default GameRoutes;
