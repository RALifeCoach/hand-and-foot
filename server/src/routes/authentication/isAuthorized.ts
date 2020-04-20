import jwt from 'jsonwebtoken';
import fs from 'fs';
import redis from '../../Redis';

function isAuthorized(req: any, res: any, next: any) {
  if (typeof req.headers.authorization !== "undefined") {
    const token = req.headers.authorization;
    const privateKey = fs.readFileSync('./private.pem', 'utf8');
    jwt.verify(token, privateKey, {algorithms: ["HS256"]}, (err: Error | null, redisBody: any) => {
      if (err) {
        res.status(500).json({error: "Not Authorized"});
        throw new Error("Not Authorized");
      }
      redis.redisGet(redisBody.redisKey, (userStr: string) => {
        const user = JSON.parse(userStr);
        if (!user) {
          res.json({status: 'failure', message: 'Token Expired'});
          return;
        }
        if (user.ip !== req.clientIp) {
          res.json({status: 'failure', message: 'Token Expired'});
          return;
        }
        req.role = user.role;
        req.userId = user.id;
        return next();
      });
    });
  } else {
    res.status(500).json({error: "Not Authorized"});
    throw new Error("Not Authorized");
  }
}

export default  isAuthorized;
