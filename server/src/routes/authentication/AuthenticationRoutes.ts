import * as express from "express";
import Database from "../../Database";
import * as bcrypt from "bcrypt";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import redis from "../../Redis";

const AuthenticationRoutes = () => {
  const router = express.Router();

  router.post("/login/", (req: any, res) => {
    const sql = `SELECT * FROM user where UserEmail = '${req.body.userId}'`;

    Database.query(sql, (rows) => {
      if (rows.length !== 1) {
        console.log("user not found");
        res.status(500).json({ error: "Not Authorized" });
        return;
      }

      bcrypt.compare(
        req.body.password,
        rows[0].Password,
        (err: Error, success: boolean) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Not Authorized" });
            return;
          }
          if (!success) {
            console.log("password not matched");
            res.status(500).json({ error: "Not Authorized" });
            return;
          }

          const privateKey = fs.readFileSync("./private.pem", "utf8");
          const expiry = new Date().getTime() + 24 * 60 * 60;
          const role = rows[0].role;
          const userName = rows[0].UserName;
          const userId = rows[0].UserId;
          const userEmail = rows[0].UserEmail;
          const redisKey = uuid.v4();
          const redisBody = {
            userEmail: userEmail,
            userName: userName,
            expiry: expiry,
            role: role,
            userId: userId,
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
          res.send({ token, role, userName, userId, userEmail });
        }
      );
    });
  });

  router.post("/setPassword/", (req, res) => {
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const sql = `SELECT * FROM user where password = '${req.body.password}'`;
    console.log(sql);
    Database.query(sql, (rows) => {
      console.log(rows);
      if (rows.length !== 1) {
        res.status(500).json({ error: "Not Authorized" });
        return;
      }

      const sql = `Update user set password = '${newPassword}' where UserId = ${rows[0].UserId}`;
      console.log(sql);
      Database.exec(sql, (err: Error) => {
        if (err) {
          console.log("failed");
          res.json({ status: "failure", message: err });
          return;
        }
        console.log("success");
        res.json({ status: "success" });
      });
    });
  });

  return router;
};

export default AuthenticationRoutes;
