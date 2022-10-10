import {IGamePlay} from '../../models/game'
import logger from '../../util/logger'
import endGame from "./endGame";

const resignResponse = (
  gamePlay: IGamePlay,
  partnerAgreed: boolean,
  resolve: any
) => {
  logger.debug(`resign response: ${partnerAgreed}`)
  gamePlay.gameState = "inPlay";
  if (!partnerAgreed) {
    resolve(null)
    return
  }
  endGame(gamePlay)
  resolve(null)
};

export default resignResponse;
