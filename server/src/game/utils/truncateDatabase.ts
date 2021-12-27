import Database from "../../Database";
import logger from "../../util/logger";

const truncateDatabase = (truncate: string) => {
  return new Promise<void>((resolve) => {
    if (truncate !== "yes") {
      return resolve();
    }
    const sql = `truncate game`;
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        throw err;
      }
      const sql = `truncate game_log`;
      Database.exec(sql, (err: Error | null) => {
        if (err) {
          throw err;
        }
        resolve();
      });
    });
  });
};

export default truncateDatabase;
