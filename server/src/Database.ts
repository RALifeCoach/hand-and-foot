import {Client, QueryResult} from 'pg'

class Database {
  private conStringPri: string = ''

  connect() {
    const username = 'postgres'
    const password = 'postgrespassword'
    const host = 'localhost'
    this.conStringPri = `postgres://${username}:${password}@${host}/postgres`
  }

  query(sql: string, callback: (rows: any) => void) {
    const client = new Client({
      host: 'localhost',
      user: 'root',
      password: 'postgrespassword',
      database: 'root'
    })
    client.connect()
      .then(() => {
        client.query(sql)
          .then((result: QueryResult<any>) => {
            callback(result.rows)
          })
          .catch((err: Error) => console.log(err))
          .then(() => client.end())
      })
      .catch((err: Error) => console.log(err))
  }

  exec(sql: string, callback: any) {
    const client = new Client({
      host: 'localhost',
      user: 'root',
      password: 'postgrespassword',
      database: 'root'
    })
    client.connect()
      .then(() => {
        client.query(sql)
          .then((result: QueryResult<any>) => {
            callback(result.rows)
          })
          .catch((err: Error) => console.log(err))
          .then(() => client.end())
      })
      .catch((err: Error) => console.log(err))
  }
}

export default new Database()
