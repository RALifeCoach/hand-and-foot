import * as redis from "redis";
import { promisify } from "util";

class Redis {
  public getAsync: (key: string) => any;
  public setAsync: (key: string, value: string) => any;
  public expireAsync: (key: string, expiry: number) => any;
  constructor() {
    const client = redis.createClient(process.env.REDIS as any);

    client.on("error", function (error: any) {
      console.error(error);
    });

    this.getAsync = promisify(client.get).bind(client);
    this.setAsync = promisify(client.set).bind(client);
    this.expireAsync = promisify(client.expire).bind(client);
  }

  redisGet(key: string, callback: any) {
    this.getAsync(key)
      .then((value: string) => callback(value))
      .catch(console.log);
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
    this.setAsync(key, value)
      .then(() => {
        if (expiry) {
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
      .catch(console.log);
  }
}

export default new Redis();
