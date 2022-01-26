import * as express from "express";
import Database from "../../Database";
import * as bcrypt from "bcrypt";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import redis from "../../Redis";
import logger from "../../util/logger";

const AuthenticationRoutes = () => {
  const router = express.Router();
  redis.connect()

  router.post("/login/", (req: any, res) => {
    const sql = `SELECT * FROM handf.player where Email = '${req.body.userId}'`;

    Database.query(sql, (rows) => {
      if (rows.length !== 1) {
        logger.error(`user not found (${req.body.userId})`);
        res.status(500).json({ error: "Not Authorized" });
        return;
      }

      bcrypt.compare(
        req.body.password,
        rows[0].password,
        (err: Error, success: boolean) => {
          if (err) {
            logger.error(
              `AuthenticationRoutes: error comparing the password ${err}`
            );
            res.status(500).json({ error: "Not Authorized" });
            return;
          }
          if (!success) {
            logger.error(`AuthenticationRoutes: password doesn't match`);
            res.status(500).json({ error: "Not Authorized" });
            return;
          }

          const privateKey = fs.readFileSync("./private.pem", "utf8");
          const expiry = new Date().getTime() + 60 * 60;
          const role = rows[0].role;
          const name = rows[0].name;
          const id = rows[0].id;
          const email = rows[0].email;
          const redisKey = uuid.v4();
          const redisBody = {
            userEmail: email,
            userName: name,
            expiry: expiry,
            role: role,
            userId: id,
            ip: req.clientIp,
          };
          const token = jwt.sign(
            {
              redisKey: redisKey,
            },
            privateKey,
            { algorithm: "HS256" }
          );
          redis.redisSet({
            key: redisKey,
            value: JSON.stringify(redisBody),
            expiry,
          });
          res.send({ token, role, name, id, email });
        }
      );
    });
  });

  router.post("/setPassword/", (req, res) => {
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const sql = `SELECT * FROM handf.player where password = '${req.body.password}'`;
    Database.query(sql, (rows) => {
      if (rows.length !== 1) {
        logger.error(
          `setPassword: wrong number of rows ${rows.length} for query ${sql}`
        );
        res.status(500).json({ error: "Not Authorized" });
        return;
      }

      const updateSql = `Update handf.player set password = '${newPassword}' where id = ${rows[0].id}`;
      Database.query(updateSql, (err: Error) => {
        if (err) {
          logger.error(
            `setPassword: update failed ${JSON.stringify(
              err
            )} for query ${updateSql}`
          );
          res.json({ status: "failure", message: err });
          return;
        }
        logger.info(`User ${rows[0].UserId} successfully changed their password`);
        res.json({ status: "success" });
      });
    });
  });

  return router;
};

export default AuthenticationRoutes;
