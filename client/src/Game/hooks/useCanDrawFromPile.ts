import { IGame } from "Game";
import useGetGameRule from "./useGetGameRule";

const useCanDrawFromPile = (game: IGame) => {
  const canDraw7 = useGetGameRule("canDraw7");
  return game.gameState === "inPlay" &&
    game.currentPlayer.isPlayerTurn &&
    game.currentPlayer.playerState === 'draw' &&
    game.currentPlayer.numberOfCardsToDraw === 2 &&
    game.discardCard !== null &&
    canDraw7;
};

export default useCanDrawFromPile;
