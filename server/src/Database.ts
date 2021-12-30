import {Client, QueryResult} from 'pg'
import {IGamePlay, IGameRules} from 'Game'
import logger from './util/logger'


class Database {
  private readonly cache: {[gameId: string]: {gamePlay: IGamePlay, gameRules: IGameRules}}

  constructor() {
    this.cache = {}
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
          .then(async (result: QueryResult<any>) => {
            await client.end()
            callback(result.rows)
          })
          .catch(async (err: Error) => {
            await client.end()
            console.log(err)
          })
      })
      .catch((err: Error) => console.log(err))
  }

  readGame(gameId: number, callback: (rows: any) => void) {
    if (this.cache[gameId]) {
      callback(this.cache[gameId])
      return
    }
    const sqlGame = `select * from handf.game where gameid = '${gameId}'`;
    this.query(sqlGame, (data) => {
      if (data.length !== 1) {
        logger.error(`ProcessMessages: wrong number of games returned ${data.length} for gameId ${sqlGame}`)
        throw new Error('game does not exist')
      }
      this.cache[gameId] = {
        gamePlay: data[0].gameplay,
        gameRules: data[0].gamerules,
      }
      callback(this.cache[gameId])
    })
  }

  updateGame(gameId: number, gamePlay: IGamePlay, callback:  (rows: any) => void) {
    this.cache[gameId].gamePlay = gamePlay
    const sql = `update handf.game
        set gameplay = '${JSON.stringify(gamePlay)}', gamestate = '${gamePlay.gameState}'
        where GameId = '${gameId}'`
    this.query(sql, callback)
  }
}

export default new Database()
