import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase, ITeam } from '../../../../models/game'
import computeTeamCardPoints from '../utils/computeTeamCardPoints'
import getCurrentPlayer from './getCurrentPlayer'
import discardCardDo from './discardCardDo'

const endRoundResponse = (
  gameId: number,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  partnerAgreed: boolean,
  resolve: any
) => {
  console.log('end round response')
  gamePlay.gameState = "inPlay";
  if (!partnerAgreed) {
    gamePlay.toDiscardId = 0;
    resolve(null)
    return
  }
  const player = getCurrentPlayer(gamePlay, players)
  const team: ITeam = gamePlay.teams[player.teamId]
  const points = computeTeamCardPoints(gameRules, team)

  discardCardDo(gameId,
    player.playerId,
    gamePlay,
    gameRules,
    players,
    gamePlay.toDiscardId,
    player,
    team,
    points,
    true,
    resolve)
};

export default endRoundResponse;
