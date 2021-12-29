import * as mysql from 'mysql'
import logger from './util/logger'

class Database {
  private connection: any

  constructor() {
    this.connection = {}
  }

  connect() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 27010,
    })
    this.connection.connect(function (err: Error) {
      if (err) {
        logger.error(err)
        process.exit(1)
      }
      logger.debug('connected')
    })
  }

  query(sql: string, callback: (rows: any) => void) {
    this.connection.query(sql, (err: Error, rows: any[]) => {
      if (err) {
        console.log('sql', sql)
        console.log('err', err)
        throw err
      }

      callback(rows)
    })
  }

  exec(sql: string, callback: any) {
    this.connection.query(sql, (err: Error, rows: any[]) => {
      callback(err)
    })
  }
}

export default new Database()
