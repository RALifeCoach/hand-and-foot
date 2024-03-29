import { IGamePlay, IPlayer } from '../../models/game'
import { IGameBase } from '../../../models/game'
import drawCards from '../utils/drawCards'
import dealCards from './dealCards'
import getNextPlayer from './getNextPlayer'
import startPlay from './startPlay'

const ROUND_MINIMUM = [50, 90, 120, 150, 190, 220, 250, 290]

const startNewRound = (gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[]) => {
  console.debug('start new round')
  gamePlay.deck = dealCards()
  if (gameRules.roundSequence === 'random') {
    const unplayedRounds = gamePlay.rounds.filter((round) => !round.played)
    gamePlay.currentRound = Math.min(
      Math.floor(Math.random() * unplayedRounds.length),
      unplayedRounds.length - 1
    )
  } else {
    gamePlay.currentRound = gamePlay.currentRound + 1
  }
  players.forEach((player) => {
    player.hand = drawCards(gamePlay.deck, 11)
    player.foot = drawCards(gamePlay.deck, 11)
    player.playerState = 'waiting'
    player.isInHand = true
    player.numberOfCardsToReplace = 0
    player.numberOfCardsToDraw = 0
  })
  gamePlay.minimumPoints = ROUND_MINIMUM[gamePlay.currentRound]
  Object.keys(gamePlay.teams).forEach((teamId) => {
    const team = gamePlay.teams[teamId]
    team.isDown = false
    team.melds = {}
    team.scoreBase = 0
    team.scoreCards = 0
  })
  gamePlay.pickupPiles = [[], [], [], []]
  gamePlay.discard = []
  do {
    const pileIndex = Math.min(Math.floor(Math.random() * 4), 3)
    gamePlay.pickupPiles[pileIndex].push(...drawCards(gamePlay.deck, 1))
  } while (gamePlay.deck.length > 0)

  const nextPlayer = getNextPlayer(players, gamePlay.roundStartPlayerId)
  gamePlay.currentPlayerId = nextPlayer.playerId
  gamePlay.roundStartPlayerId = nextPlayer.playerId
  startPlay(nextPlayer)
}

export default startNewRound
