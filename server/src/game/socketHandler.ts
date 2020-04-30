import { IAction, IGameJson } from "Game";
import addPlayer from "./functions/addPlayer";
import setSortOrder from "./functions/setSortOrder";
import moveCard from "./functions/moveCard";
import pinCard from "./functions/pinCard";
import drawCardPlayer from "./functions/drawCardPlayer";
import discardCard from "./functions/discardCard";
import playCards from "./functions/playCards";
import { ACTION_RESPONSE } from '../../constants';

const socketHandler = (
  game: IGameJson,
  action: IAction,
): { logIt: boolean, canUndo: boolean, sendToAll: boolean; message: string } => {
  switch (action.type) {
    case "addPlayer":
      return {
        message: addPlayer(
          game,
          action.value.playerId,
          action.value.teamId,
          action.value.position
        ),
        ...ACTION_RESPONSE[action.type]
      };
    case "setSortOrder":
      return {
        message: setSortOrder(game, action.value.playerId, action.value.sortOrder),
        ...ACTION_RESPONSE[action.type]
      };
    case "moveCard":
      return {
        message: moveCard(
        game,
        action.value.playerId,
        action.value.movingCardId,
        action.value.destCardId
        ),
        ...ACTION_RESPONSE[action.type]
      };
    case "setPin":
      return {
        message: pinCard(game, action.value.playerId, action.value.cardId),
        ...ACTION_RESPONSE[action.type]
      };
    case "drawCard":
      return {
        message: drawCardPlayer(game, action.value.playerId),
        ...ACTION_RESPONSE[action.type]
      };
    case "discardCard":
      return {
        message: discardCard(game, action.value.playerId, action.value.toDiscard),
        ...ACTION_RESPONSE[action.type]
      };
    case "playCards":
      return {
        message: playCards(
        game,
        action.value.playerId,
        action.value.cardIds,
        action.value.meldId,
        action.value.meldType,
        action.value.meldRank
        ),
        ...ACTION_RESPONSE[action.type]
      };
    case "disconnect":
      game.gameState = "waitingToReStart";
      return {
        message: "",
        ...ACTION_RESPONSE[action.type]
       };
    default:
      console.log(action);
      throw new Error("unknown action type");
  }
};

export default socketHandler;
