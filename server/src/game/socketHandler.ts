import { IAction, IGameJson } from "Game";
import addPlayer from "./addPlayer";
import setSortOrder from "./setSortOrder";
import moveCard from "./moveCard";
import pinCard from "./pinCard";
import drawCardPlayer from './drawCardPlayer';

const socketHandler = (
  game: IGameJson,
  action: IAction
): { sendToAll: boolean; message: string } => {
  switch (action.type) {
    case "addPlayer":
      return addPlayer(
        game,
        action.value.playerId,
        action.value.teamId,
        action.value.position
      );
    case "setSortOrder":
      return setSortOrder(game, action.value.playerId, action.value.sortOrder);
    case "moveCard":
      return moveCard(
        game,
        action.value.playerId,
        action.value.movingCardId,
        action.value.destCardId
      );
    case "moveCard":
      return moveCard(
        game,
        action.value.playerId,
        action.value.movingCardId,
        action.value.destCardId
      );
    case "setPin":
      return pinCard(game, action.value.playerId, action.value.cardId);
    case "drawCard":
      return drawCardPlayer(game, action.value.playerId);
    default:
      console.log(action);
      throw new Error("unknown action type");
  }
};

export default socketHandler;
