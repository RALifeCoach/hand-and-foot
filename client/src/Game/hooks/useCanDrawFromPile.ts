import { IGame } from "Game";

const useCanDrawFromPile = (game: IGame) => {
  if (game.gameState !== "inPlay" || !game.currentPlayer.isPlayerTurn) {
    return false;
  }
  return (
    game.currentPlayer.playerState === "draw" &&
    game.currentPlayer.numberOfCardsToDraw === 2 &&
    game.discardCard !== null &&
    game.canDraw7
  );
};

export default useCanDrawFromPile;
