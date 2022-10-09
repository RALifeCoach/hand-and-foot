import * as redis from "redis";
import logger from "./util/logger";
import {RedisClientType, RedisFunctions, RedisModules, RedisScripts} from "redis";

class Redis {
  private _client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
  constructor() {
    this._client = redis.createClient({
      url: process.env.REDIS as string,
    });

    this._client.connect().then(() => {
      this._client.on("error", function (error: any) {
        console.error(error);
      });
    });
  }

  redisGet(key: string, callback: any) {
    this._client.get(key)
      .then((value: string | null) => {
        callback(value)
      })
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
    this._client.set(key, value)
      .then(() => {
        if (expiry) {
          this._client.expire(key, expiry).then(() => {
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
