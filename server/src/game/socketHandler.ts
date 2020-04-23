import { IAction, IGame } from "Game";
import addPlayer from "./addPlayer";

const socketHandler = (
  game: IGame,
  action: IAction,
): boolean => {
  switch (action.type) {
    case "addPlayer":
      console.log(game.players, action.value);
      return addPlayer(
        game,
        action.value.playerId,
        action.value.teamId,
        action.value.position
      );
    default:
      throw new Error("unknown action type");
  }
};

export default socketHandler;
