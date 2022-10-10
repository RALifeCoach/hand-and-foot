import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase, ITeam } from '../../../models/game'
import computeTeamCardPoints from '../utils/computeTeamCardPoints'
import getCurrentPlayer from './getCurrentPlayer'
import discardCardDo from './discardCardDo'
import logger from '../../util/logger'
import endGame from "./endGame";

const resignResponse = (
  gameId: number,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  partnerAgreed: boolean,
  resolve: any
) => {
  logger.debug('resign response')
  gamePlay.gameState = "inPlay";
  if (!partnerAgreed) {
    resolve(null)
    return
  }
  endGame(gamePlay)
};

export default resignResponse;
