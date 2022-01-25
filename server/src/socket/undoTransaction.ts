import { IGamePlay, IPlayer } from '../models/game'
import Database from '../Database'
import logger from '../util/logger'

const undoTransaction = (gamePlay: IGamePlay, players: IPlayer[], override: boolean, resolve: any) => {
  if (!gamePlay.transactionLog.length) {
    resolve({
      newGamePlay: gamePlay,
      newPlayers: players,
      message: JSON.stringify({
        type: 'cannotUndo',
        value: '',
      }),
    })
    return
  }
  const undo = gamePlay.transactionLog[0]
  if (undo.canUndo || override) {
    const undoSql = `select * from handf.game_log where LogId = '${undo.logId}'`
    Database.query(undoSql, (games: any) => {
      if (games.length !== 1) {
        logger.error(`undoTransaction: wrong number of rows ${games.length} for query ${undoSql}`)
        throw new Error(`undo game does not exist ${undo.logId}`)
      }
      const undoGame: IGamePlay = games[0].gameplay
      const undoPlayers: IPlayer[] = games[0].players
      resolve({ newGamePlay: undoGame, newPlayers: undoPlayers, message: '' })
    })
  } else {
    resolve({
      newGamePlay: gamePlay,
      newPlayers: players,
      message: JSON.stringify({
        type: 'cannotUndo',
        value: '',
      }),
      isError: false
    })
  }
}

export default undoTransaction
