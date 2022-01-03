import { IPlayer } from '../../models/game'

const getNextPlayer = (players: IPlayer[], playerId: number) => {
  const player = players.find(player => player.playerId === playerId)
  if (!player) {
    throw new Error('player not found')
  }
  player.playerState = 'waiting'

  const position = (player.position + 1) % players.length
  const nextPlayer = players.find(player => player.position === position)
  if (!nextPlayer) {
    throw new Error('player not found')
  }
  return nextPlayer as IPlayer
}

export default getNextPlayer
