import { IGamePlay, IPlayer } from '../../models/game'
import { IGameBase } from '../../../../models/game'
import getNextPlayer from './getNextPlayer'
import startPlay from './startPlay'

const startNewTurn = (gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[]) => {
  console.log('start new turn')
  const nextPlayer = getNextPlayer(players, gamePlay.currentPlayerId)

  gamePlay.currentPlayerId = nextPlayer.playerId
  startPlay(nextPlayer)
}

export default startNewTurn
