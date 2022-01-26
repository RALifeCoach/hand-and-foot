import {Client, QueryResult} from 'pg'
import logger from './util/logger'
import {IGamePlay, IPlayer, IPlayerDb} from './models/game'
import {IGameBase} from '../models/game'


class Database {
  private readonly cache: { [gameId: string]: { gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[] } }
  private readonly options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }

  constructor() {
    this.cache = {}
  }

  query(sql: string, callback: (rows: any) => void) {
    const client = new Client(this.options)
    client.connect()
      .then(() => {
        client.query(sql)
          .then(async (result: QueryResult<any>) => {
            await client.end()
            callback(result.rows)
          })
          .catch(async (err: Error) => {
            await client.end()
            logger.info('catch1', err, sql)
          })
      })
      .catch((err: Error) => logger.info('catch2', err, sql))
  }

  private mapDb(players: IPlayerDb[]) {
    return players.map(player => (
      {
        playerId: player.player_id,
        teamId: player.team,
        position: player.position,
        playerState: player.player_state,
        numberOfCardsToDraw: player.cards_to_draw,
        numberOfCardsToReplace: player.cards_to_replace,
        hand: player.hand,
        foot: player.foot,
        isInHand: player.in_hand,
        sortOrder: player.sort_order,
        playerName: player.player_name
      } as IPlayer
    ))
  }

  readGame(gameId: number, callback: (rows: any) => void) {
    if (this.cache[gameId]) {
      callback(this.cache[gameId])
      return
    }
    const sqlGame = `select * from handf.game where gameid = ${gameId}`
    this.query(sqlGame, (data) => {
      if (data.length !== 1) {
        logger.error(`ProcessMessages: wrong number of games returned ${data.length} for gameId ${sqlGame}`)
        throw new Error('game does not exist')
      }
      const sqlPlayers = `select * from handf.game_player where game_id = ${gameId}`
      this.query(sqlPlayers, (players) => {
        this.cache[gameId] = {
          gamePlay: data[0].gameplay,
          gameRules: data[0].gamerules,
          players: this.mapDb(players)
        }
        callback(this.cache[gameId])
      })
    })
  }

  private async executeQuery(sqls: string[], client: any, callback: Function) {
    if (sqls.length === 0) {
      callback()
      await client.end()
      return
    }
    client.query(sqls[0])
      .then(() => {
        this.executeQuery(sqls.slice(1), client, callback)
      })
      .catch(async (err: Error) => {
        await client.end()
        logger.error('error', err)
        logger.error('error sql', sqls[0])
      })

  }

  updateGame(gameId: number, gamePlay: IGamePlay, players: IPlayer[], callback: (rows: any) => void) {
    this.cache[gameId].gamePlay = gamePlay
    this.cache[gameId].players = players
    const sqls: string[] = []
    sqls.push(`update handf.game
        set gameplay = '${JSON.stringify(gamePlay)}', gamestate = '${gamePlay.gameState}'
        where gameid = ${gameId}`)
    sqls.push(...players.map(player => (`insert into handf.game_player (
        game_id, player_id, position, team, hand, foot, player_state,
        cards_to_draw, cards_to_replace, in_hand, sort_order, player_name) values (
        ${gameId}, ${player.playerId}, ${player.position}, '${player.teamId}', '${JSON.stringify(player.hand)}',
        '${JSON.stringify(player.foot)}', '${player.playerState}', ${player.numberOfCardsToDraw},
        ${player.numberOfCardsToReplace}, ${player.isInHand},
        ${!!player.sortOrder ? '\'' + player.sortOrder + '\'' : 'null'}, '${player.playerName}' 
        ) on conflict on constraint game_player_pkey do update set hand = '${JSON.stringify(player.hand)}',
        foot = '${JSON.stringify(player.foot)}', player_state = '${player.playerState}', 
        cards_to_draw = ${player.numberOfCardsToDraw},
        cards_to_replace = ${player.numberOfCardsToReplace}, in_hand = ${player.isInHand},
        sort_order = ${!!player.sortOrder ? '\'' + player.sortOrder + '\'' : 'null'}`
    )))
    const client = new Client(this.options)
    client.connect()
      .then(() => this.executeQuery(sqls, client, callback))
      .catch((err: Error) => logger.error(err))
  }
}

export default new Database()
