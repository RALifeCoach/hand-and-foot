import * as express from "express";
import Database from "../../Database";
import startGame from "../../game/functions/startGame";
import { IGame, IGamePlay, IGameRules } from "Game";
import truncateDatabase from "../../game/utils/truncateDatabase";
import logger from "../../util/logger";

const GameRoutes = () => {
  const router = express.Router();
  router.post(
    "/restart/:gameName/:numberOfPlayers/:truncate",
    (req: any, res: any) => {
      const game = startGame(req.params.numberOfPlayers);
      truncateDatabase(req.params.truncate)
        .then(() => {
          const sql = `insert into game (GameName, GamePlay, GameRules) values ('${
            req.params.gameName
          }', '${JSON.stringify(game.GamePlay)}', '${JSON.stringify(
            game.GameRules
          )}')`;
          return new Promise<void>((resolve) => {
            Database.exec(sql, (err: Error | null) => {
              if (err) {
                throw err;
              }
              resolve();
            });
          });
        })
        .then(() => {
          const sql = `SELECT LAST_INSERT_ID()`;
          Database.query(sql, (data) => {
            if (data.length !== 1) {
              logger.error(
                `GameRoutes:restart: wrong number of rows returned ${data.length} for query(${sql})`
              );
              throw new Error("invalid data");
            }
            res.json({ gameId: data[0]["LAST_INSERT_ID()"] });
          });
        });
    }
  );

  router.get("/query", (req: any, res: any) => {
    const sql = `select * from game`;
    Database.query(sql, (data: any[]) => {
      const games = data
        .map(
          (row) =>
            ({
              GameId: row.GameId,
              GameName: row.GameName,
              GamePlay: JSON.parse(row.GamePlay) as IGamePlay,
              GameRules: JSON.parse(row.GameRules) as IGameRules,
            } as IGame)
        )
        .filter((game) => {
          return game.GamePlay.gameState !== "finished";
        })
        .map((game) => ({
          gameId: game.GameId,
          gameName: game.GameName,
          gameState: game.GamePlay.gameState,
          ...game.GameRules,
          players: Object.values(game.GamePlay.players).reduce(
            (players, player) =>
              Object.assign(players, {
                [player.position]: {
                  name: player.playerName || `Player: ${player.playerId}`,
                  playerId: player.playerId,
                },
              }),
            {} as { [position: string]: { name: string; playerId: number } }
          ),
        }));
      res.json(games);
    });
  });

  router.get("/query/:gameId", (req: any, res: any) => {
    const sql = `select * from game where GameId = ${req.params.gameId}`;
    Database.query(sql, (data: any[]) => {
      if (data.length !== 1) {
        logger.error(
          `GameRoutes:query: wrong number of rows returned ${data.length} for query(${sql})`
        );
        throw new Error("Game not found");
      }
      const game = data[0];
      const rules = JSON.parse(game.GameRules);
      res.json({
        gameId: game.GameId,
        gameName: game.GameName,
        ...rules,
      });
    });
  });

  router.post("/create", (req: any, res: any) => {
    const game: IGame = startGame(req.body.numberOfPlayers);
    const sql = `insert into game (GameName, GameRules, GamePlay) values ('${
      req.body.gameName
    }', '${JSON.stringify(game.GameRules)}', '${JSON.stringify(
      game.GamePlay
    )}')`;
    new Promise<void>((resolve) => {
      Database.exec(sql, (err: Error | null) => {
        if (err) {
          throw err;
        }
        resolve();
      });
    }).then(() => {
      const sql = `SELECT LAST_INSERT_ID()`;
      Database.query(sql, (data) => {
        if (data.length !== 1) {
          logger.error(
            `GameRoutes:create: wrong number of rows returned ${data.length} for query(${sql})`
          );
          throw new Error("yikes!");
        }
        res.json({ gameId: data[0]["LAST_INSERT_ID()"] });
      });
    });
  });

  router.post("/update", (req: any, res: any) => {
    const sql = `update game set GameName = '${req.body.gameName}' where GameId = ${req.body.gameId}`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        logger.error(
          `GameRoutes:update: error in update ${JSON.stringify(err)} for query(${sql})`
        );
        throw err;
      }
      res.json({ status: "success" });
    });
  });

  router.post("/delete", (req: any, res: any) => {
    const sql = `delete from game where GameId = ${req.body.gameId}`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        logger.error(
          `GameRoutes:delete: error in delete ${JSON.stringify(
            err
          )} for query(${sql})`
        );
        throw err;
      }
      res.json({ status: "success" });
    });
  });

  return router;
};

export default GameRoutes;
