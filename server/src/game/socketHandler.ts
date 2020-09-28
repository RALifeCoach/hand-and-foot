import { IAction, IGamePlay, IGameRules } from "Game";
import addPlayer from "./functions/addPlayer";
import setSortOrder from "./functions/setSortOrder";
import moveCard from "./functions/moveCard";
import pinCard from "./functions/pinCard";
import drawCardPlayer from "./functions/drawCardPlayer";
import discardCard from "./functions/discardCard";
import playCards from "./functions/playCards";
import draw7 from "./functions/draw7";
import endRoundResponse from "./functions/endRoundResponse";
import logger from "../util/logger";

const socketHandler = (gamePlay: IGamePlay, gameRules: IGameRules, gameId: number, action: IAction): Promise<object|null> => {
  return new Promise(resolve => {
    switch (action.type) {
      case "addPlayer":
        addPlayer(
          gamePlay,
          action.value.playerId,
          action.value.teamId,
          action.value.position,
          resolve
        );
        break;
      case "setSortOrder":
        resolve(
          setSortOrder(gamePlay, action.value.playerId, action.value.sortOrder)
        );
        break;
      case "moveCard":
        resolve(
          moveCard(
            gamePlay,
            action.value.playerId,
            action.value.movingCardId,
            action.value.destCardId
          )
        );
        break;
      case "setPin":
        resolve(pinCard(gamePlay, action.value.playerId, action.value.cardId));
      case "drawCard":
        resolve(drawCardPlayer(gamePlay, action.value.pileIndex));
        break;
      case "draw7":
        draw7(gamePlay, gameId, resolve);
        break;
      case "discardCard":
        discardCard(
          gameId,
          gamePlay,
          gameRules,
          action.value.toDiscard,
          resolve
        );
        break;
      case "endRound":
        resolve(endRoundResponse(gamePlay, gameRules, action.value));
        break;
      case "playCards":
        playCards(
          gameId,
          gamePlay,
          gameRules,
          action.value.cardIds,
          action.value.meldId,
          action.value.meldType,
          action.value.meldRank,
          resolve
        );
        break;
      case "disconnect":
        gamePlay.gameState = "waitingToReStart";
        resolve(null);
      default:
        logger.error(`unknown action ${action}`);
        throw new Error("unknown action type");
    }
  });
};

export default socketHandler;
