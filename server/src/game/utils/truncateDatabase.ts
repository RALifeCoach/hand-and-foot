import Database from "../../Database";
import logger from "../../util/logger";

const truncateDatabase = (truncate: string) => {
  return new Promise<void>((resolve) => {
    if (truncate !== "yes") {
      return resolve();
    }
    const sql = `truncate handf.game_log`;
    Database.exec(sql, () => {
      const sql = `truncate handf.game`;
      Database.exec(sql, () => {
        resolve();
      });
    });
  });
};

export default truncateDatabase;
