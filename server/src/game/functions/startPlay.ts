import { IPlayer } from '../../models/game'

const startPlay = (nextPlayer: IPlayer) => {
  nextPlayer.playerState = 'draw'
  nextPlayer.numberOfCardsToDraw = 2
  nextPlayer.numberOfCardsToReplace = 0
}

export default startPlay
