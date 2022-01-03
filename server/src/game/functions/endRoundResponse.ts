import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase, ITeam } from '../../../../models/game'
import discardCardDo from './discardCardDo'
import computeTeamCardPoints from '../utils/computeTeamCardPoints'

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
  const player = players[gamePlay.currentPlayerIndex];
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
