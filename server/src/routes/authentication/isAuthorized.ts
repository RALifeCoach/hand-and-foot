import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import redis from "../../Redis";
import logger from '../../util/logger'

const isAuthorized = (token: string, clientIp: string, resolve: (user: any) => void, reject: () => void) => {
  logger.info(1)
  const privateKey = fs.readFileSync("./private.pem", "utf8");
  logger.info('priv', privateKey)
  jwt.verify(
    token,
    privateKey,
    { algorithms: ["HS256"] },
    (err: Error | null, redisBody: any) => {
      logger.info('err', err)
      if (err) {
        return reject();
      }
      redis.redisGet(redisBody.redisKey, (userStr: string) => {
        const user = JSON.parse(userStr);
        logger.info('isAuthorized', user, token, privateKey, clientIp)
        if (!user) {
          return reject();
        }
        // if (clientIp && user.ip !== clientIp) {
        //   return reject();
        // }

        // rewrite the token with a new expiry
        const expiry = new Date().getTime() + 60 * 60;
        redis.redisSet({
          key: redisBody.redisKey,
          value: JSON.stringify(redisBody),
          expiry,
        });

        resolve(user);
      });
    }
  );
};

export default isAuthorized;
