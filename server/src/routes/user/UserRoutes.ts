import * as express from 'express';
import Database from '../../Database';
import bcrypt from 'bcrypt';
import userValidate from '../../user/UserValidate';

const UserRoutes = () => {
  const router = express.Router();
  router.get('/query', (req, res) => {
    const sql = 'Select UserId as userId, UserEmail as userEmail, UserName as userName, role from user';
    Database.query(sql, (rows: any[]) => {
      res.json(rows);
    });
  });

  router.post('/delete', (req, res) => {
    if (!userValidate.isValidDelete(req.body)) {
      res.json({status: 'failure', message: 'Invalid message body'});
      return;
    }
    const sql = `Delete from user where UserId = ${req.body.userId}`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        res.json({status: 'failure', message: err});
        return;
      }
      res.json({status: 'success'});
    });
  });

  router.post('/update', (req, res) => {
    if (req.body.userId && !userValidate.isValidUpdate(req.body)) {
      res.json({status: 'failure', message: 'Invalid message body'});
      return;
    }
    if (!req.body.userId && !userValidate.isValidInsert(req.body)) {
      res.json({status: 'failure', message: 'Invalid message body'});
      return;
    }
    const sql = req.body.id
      ? `Update user
      set userEmail = '${req.body.userEmail}',
          userName = '${req.body.userName}',
          role = '${req.body.role}'
      where id = ${req.body.userId}`
      : `insert into user
      (userId, userName, role, password) values
      (
        '${req.body.userId}',
        '${req.body.userName}',
        '${req.body.role}',
        '${req.body.password}'
      )
    `;
    Database.exec(sql, (err: Error|null) => {
      if (err) {
        res.json({status: 'failure', message: err});
        return;
      }
      res.json({status: 'success'});
    });
  });

  router.post('/changePassword', (req:any, res) => {
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const sql = `SELECT * FROM user where id = '${req.userId}'`;
    Database.query(sql, (rows: any[]) => {
      if (rows.length !== 1) {
        res.status(500).json({error: "Not Authorized"});
        return;
      }

      bcrypt.compare(req.body.oldPassword, rows[0].password, function (err: Error|null, success:boolean) {
        if (!success) {
          res.status(500).json({error: "Not Authorized"});
          return;
        }
        const sql = `Update user set password = '${newPassword}' where id = ${req.userId}`;
        Database.exec(sql, (err: Error|null) => {
          if (err) {
            res.json({status: 'failure', message: err});
            return;
          }
          res.json({status: 'success'});
        });
      });
    });
  });

  router.post('/resetPassword', (req, res) => {
    if (!userValidate.isValidReset(req.body)) {
      res.json({status: 'failure', message: 'Invalid message body'});
      return;
    }
    const sql = `Update user set password = '${req.body.password}' where id = ${req.body.id}`;
    Database.exec(sql, (err: Error|null) => {
      if (err) {
        res.json({status: 'failure', message: err});
        return;
      }
      res.json({status: 'success'});
    });
  });

  return router;
}

export default UserRoutes;
