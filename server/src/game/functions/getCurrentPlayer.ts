import { IGamePlay, IPlayer } from '../../models/game'

const getCurrentPlayer = (gamePlay: IGamePlay, players: IPlayer[]) => {
  const currentPlayer = players.find(player => player.playerId === gamePlay.currentPlayerId)
  if (!currentPlayer) {
    throw new Error('player not found')
  }
  return currentPlayer as IPlayer
}

export default getCurrentPlayer
