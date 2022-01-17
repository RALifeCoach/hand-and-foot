import { IGamePlay, IPlayer } from '../../models/game'
import { IGameBase, ITeam } from '../../../models/game'
import computeTeamCardPoints from '../utils/computeTeamCardPoints'
import canGoDown from '../utils/canGoDown'
import discardCardDo from './discardCardDo'
import getCurrentPlayer from './getCurrentPlayer'

const discardCardCheck = (
  gameId: number,
  playerId: number,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  toDiscardId: number,
  resolve: any
) => {
  const player = getCurrentPlayer(gamePlay, players)
  if (playerId !== player.playerId) {
    resolve(null)
  }
  const team: ITeam = gamePlay.teams[player.teamId]
  const points = computeTeamCardPoints(gameRules, team)
  if (!team.isDown) {
    const melds = Object.keys(team.melds).filter(
      (meldId) => team.melds[meldId].type !== '3s'
    )
    if (melds.length > 0 && !canGoDown(gamePlay, gameRules, team, points)) {
      resolve({
        type: 'unmetMin',
        value: { cards: player.isInHand ? player.hand : player.foot },
      })
      return
    }
  }

  // check to see if this discard ends the round
  // if so and ask end round is true - then send ask message
  const hasClean = Object.values(team.melds).some(
    (meld) => meld.type === 'clean' && meld.cards.length > 6
  )
  const hasDirty = Object.values(team.melds).some(
    (meld) => meld.type === 'dirty' && meld.cards.length > 6
  )
  const canEndRound =
    !player.isInHand && player.foot.length === 1 && hasClean && hasDirty
  if (canEndRound) {
    if (gameRules.askRoundEnd) {
      gamePlay.gameState = 'askRoundEnd'
      gamePlay.toDiscardId = toDiscardId
      return resolve(null)
    }
  }

  discardCardDo(gameId,
    playerId,
    gamePlay,
    gameRules,
    players,
    toDiscardId,
    player,
    team,
    points,
    canEndRound,
    resolve)
}

export default discardCardCheck
