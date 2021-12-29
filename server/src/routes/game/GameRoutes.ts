import * as express from 'express'
import Database from '../../Database'
import startGame from '../../game/functions/startGame'
import {IGame, IGamePlay, IGameRules} from 'Game'
import truncateDatabase from '../../game/utils/truncateDatabase'
import logger from '../../util/logger'
import * as url from 'url'
import * as queryString from 'querystring'

const STATES = {
  '1': ['waitingToStart', 'inPlay', 'waitingToReStart', 'askRoundEnd'],
  '2': ['finished']
} as { [key: string]: string[] }

const GameRoutes = () => {
  const router = express.Router()
  router.get(
    '/restart/:gameName/:numberOfPlayers/:truncate',
    (req: any, res: any) => {
      const game = startGame(req.params.numberOfPlayers)
      truncateDatabase(req.params.truncate)
        .then(() => {
          const sql = `insert into handf.game (gamename, gamestate, gameplay, gamerules) values ('${
            req.params.gameName
          }', '${game.GamePlay.gameState}', '${JSON.stringify(game.GamePlay)}', '${JSON.stringify(
            game.GameRules
          )}') RETURNING gameid;`
          return new Promise<void>((resolve) => {
            Database.exec(sql, (data: any) => {
              console.log({gameId: data[0].gameid})
              res.json({gameId: data[0].gameid})
              resolve()
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  )

  router.get('/query', (req: any, res: any) => {
    const search = url.parse(req.url).search
    const params = queryString.parse((search ?? ' ').substr(1) ?? '')
    const baseSql = `select * from handf.game`
    const sql = baseSql +
      (params.status ? ` where gamestate in ("${STATES[params.status as string].join('", "')}");` : ';')
    console.log(sql)
    Database.query(sql, (data: any[]) => {
      console.log('query', data)
      const games = data
        .map(
          (row) =>
            ({
              GameId: row.gameid,
              GameName: row.gamename,
              GamePlay: JSON.parse(row.gameplay) as IGamePlay,
              GameRules: JSON.parse(row.gamerules) as IGameRules,
            } as IGame)
        )
        .filter((game) => {
          return game.GamePlay.gameState !== 'finished'
        })
        .map((game) => ({
          gameId: game.GameId,
          gameName: game.GameName,
          gameState: game.GamePlay.gameState,
          ...game.GameRules,
          players: Object.values(game.GamePlay.players).reduce(
            (players, player) =>
              Object.assign(players, {
                [player.position]: {
                  name: player.playerName || `Player: ${player.playerId}`,
                  playerId: player.playerId,
                },
              }),
            {} as { [position: string]: { name: string; playerId: number } }
          ),
        }))
      res.json(games)
    })
  })

  router.get('/query/:gameId', (req: any, res: any) => {
    const gameId = parseInt(req.params.gameId)
    const sql = `select * from handf.game where gameid = ${gameId}`
    Database.query(sql, (data: any[]) => {
      if (data.length !== 1) {
        logger.error(
          `GameRoutes:query: wrong number of rows returned ${data.length} for query(${sql})`
        )
        throw new Error('Game not found')
      }
      const game = data[0]
      const rules = JSON.parse(game.gamerules)
      res.json({
        gameId: game.gameid,
        gameName: game.gamename,
        ...rules,
      })
    })
  })

  router.post('/create', (req: any, res: any) => {
    const game: IGame = startGame(req.body.numberOfPlayers)
    const sql = `insert into game (gamename, gamerules, gameplay, gamestate) values ('${
      req.body.gameName
    }', '${JSON.stringify(game.GameRules)}', '${JSON.stringify(
      game.GamePlay
    )}, 'waitingToStart') returning gameid`
    new Promise<void>((resolve) => {
      Database.exec(sql, (data: any[]) => {
        res.json({gameId: data[0].gameid})
        resolve()
      })
    })
  })

  router.post('/update', (req: any, res: any) => {
    const sql = `update game set GameName = '${req.body.gameName}' where GameId = ${req.body.gameId}`
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        logger.error(
          `GameRoutes:update: error in update ${JSON.stringify(err)} for query(${sql})`
        )
        throw err
      }
      res.json({status: 'success'})
    })
  })

  router.post('/delete', (req: any, res: any) => {
    const sql = `delete from game where GameId = ${req.body.gameId}`
    Database.exec(sql, (err: Error | null) => {
      if (err) {
        logger.error(
          `GameRoutes:delete: error in delete ${JSON.stringify(
            err
          )} for query(${sql})`
        )
        throw err
      }
      res.json({status: 'success'})
    })
  })

  return router
}

export default GameRoutes
