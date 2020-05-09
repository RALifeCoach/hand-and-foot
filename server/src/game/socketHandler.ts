import { IAction, IGameJson } from "Game";
import addPlayer from "./functions/addPlayer";
import setSortOrder from "./functions/setSortOrder";
import moveCard from "./functions/moveCard";
import pinCard from "./functions/pinCard";
import drawCardPlayer from "./functions/drawCardPlayer";
import discardCard from "./functions/discardCard";
import playCards from "./functions/playCards";
import draw7 from "./functions/draw7";

const socketHandler = (game: IGameJson, gameId: number, action: IAction): Promise<object|null> => {
  return new Promise(resolve => {
    switch (action.type) {
      case "addPlayer":
        resolve(addPlayer(
          game,
          action.value.playerId,
          action.value.teamId,
          action.value.position
        ));
        break;
      case "setSortOrder":
        resolve(setSortOrder(game, action.value.playerId, action.value.sortOrder));
        break;
      case "moveCard":
        resolve(moveCard(
          game,
          action.value.playerId,
          action.value.movingCardId,
          action.value.destCardId
        ));
        break;
      case "setPin":
        resolve(pinCard(game, action.value.playerId, action.value.cardId));
      case "drawCard":
        resolve(drawCardPlayer(game, action.value.pileIndex));
        break;
      case "draw7":
        draw7(game, gameId, resolve);
        break;
      case "discardCard":
        discardCard(gameId, game, action.value.toDiscard, resolve);
        break;
      case "playCards":
        playCards(
          gameId,
          game,
          action.value.cardIds,
          action.value.meldId,
          action.value.meldType,
          action.value.meldRank,
          resolve,
        );
        break;
      case "disconnect":
        game.gameState = "waitingToReStart";
        resolve(null);
      default:
        console.log(action);
        throw new Error("unknown action type");
    }
  });
};

export default socketHandler;
