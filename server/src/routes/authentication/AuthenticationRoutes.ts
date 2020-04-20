import * as express from 'express';
import Database from '../../Database';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import redis from '../../Redis';

const AuthenticationRoutes = () => {
  const router = express.Router();

  router.post('/login/', (req: any, res) => {
    const sql = `SELECT * FROM users where userId = '${req.body.userId}'`;
    Database.query(sql, (rows) => {
      if (rows.length !== 1) {
        res.status(500).json({error: "Not Authorized"});
        return;
      }

      bcrypt.compare(req.body.password, rows[0].password, function (err: Error, success: boolean) {
        if (!success) {
          res.status(500).json({error: "Not Authorized"});
          return;
        }

        const privateKey = fs.readFileSync('./private.pem', 'utf8');
        const expiry = new Date().getTime() + (24 * 60 * 60);
        const role = rows[0].role;
        const userName = rows[0].userName;
        const userId = req.body.userId;
        const id = rows[0].id;
        const redisKey = uuid.v4();
        const redisBody = {
          "userId": userId,
          "userName": userName,
          "expiry": expiry,
          "role": role,
          "id": id,
          "ip": req.clientIp,
        };
        const token = jwt.sign(
          {
            "redisKey": redisKey,
          },
          privateKey,
          {algorithm: 'HS256'}
        );
        redis.redisSet({key: redisKey, value: JSON.stringify(redisBody), expiry});
        res.send({token, role, userName, userId, id});
      });
    });
  });

  router.post('/setPassword/', (req, res) => {
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const sql = `SELECT * FROM users where password = '${req.body.password}'`;
    Database.query(sql, (rows) => {
      if (rows.length !== 1) {
        res.status(500).json({error: "Not Authorized"});
        return;
      }

      const sql = `Update users set password = '${newPassword}' where id = ${rows[0].id}`;
      Database.exec(sql, (err: Error) => {
        if (err) {
          res.json({status: 'failure', message: err});
          return;
        }
        res.json({status: 'success'});
      });
    });
  });

  return router;
};

export default AuthenticationRoutes;
