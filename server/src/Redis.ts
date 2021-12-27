import * as redis from "redis";
import { promisify } from "util";
import logger from "./util/logger";

class Redis {
  public getAsync: ((key: string) => any) | null = null;
  public setAsync: ((key: string, value: string) => any) | null = null;
  public expireAsync: ((key: string, expiry: number) => any) | null = null;
  connect() {
    console.log('redis', process.env.REDIS)
    const client = redis.createClient({
      host: process.env.REDIS as string,
      port: 6379
    });

    client.on("error", function (error: any) {
      console.error(error);
    });

    this.getAsync = promisify(client.get).bind(client);
    this.setAsync = promisify(client.set).bind(client);
    this.expireAsync = promisify(client.expire).bind(client);
  }

  redisGet(key: string, callback: any) {
    if (!this.getAsync) {
      return
    }
    this.getAsync(key)
      .then((value: string) => callback(value))
      .catch(logger.error);
  }

  redisSet({
    key,
    value,
    expiry,
    callback,
  }: {
    key: string;
    value: string;
    expiry: number;
    callback?: any;
  }) {
    if (!this.setAsync) {
      return
    }
    this.setAsync(key, value)
      .then(() => {
        if (expiry) {
          if (!this.expireAsync) {
            return
          }
          this.expireAsync(key, expiry).then(() => {
            if (callback) {
              callback(null);
            }
          });
          return;
        }
        if (callback) {
          callback(null);
        }
      })
      .catch(logger.error);
  }
}

export default new Redis();
