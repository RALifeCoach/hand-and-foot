const mysql = require('mysql');

class Database {
  private connection:any;
  constructor() {
    this.connection = {};
  }

  connect() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    this.connection.connect(function (err:Error) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("connected");
    });
  }

  query(sql: string, callback: (rows:any) => void) {
    this.connection.query(sql, (err: Error, rows: any[]) => {
      if (err) {
        console.log(err);
        throw err;
      }

      callback(rows);
    });
  }

  exec(sql: string, callback:any) {
    this.connection.query(sql, (err: Error, rows: any[]) => {
      callback(err);
    });
  }
}

export default new Database();
