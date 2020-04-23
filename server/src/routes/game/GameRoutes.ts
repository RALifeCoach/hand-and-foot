import * as express from "express";
import Database from "../../Database";
import bcrypt from "bcrypt";
import userValidate from "../../user/UserValidate";
import startGame from "../../game/startGame";

const GameRoutes = () => {
  const router = express.Router();
  router.get("/restart", (req, res) => {
    const game = startGame("test game", 4);
    const sql = `insert into game values ('${game.gameId}', '${JSON.stringify(
      game
    )}')`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        throw err;
      }
      res.json({ gameId: game.gameId });
    });
  });

  return router;
};

export default GameRoutes;
