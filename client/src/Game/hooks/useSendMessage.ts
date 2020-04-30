import { useCallback, useContext } from "react"
import GameContext from "../GameContext";
import { IGame } from "Game";

const useSendMessage = () => {
  const { gameState: { game }, gameDispatch } = useContext(GameContext);

  const thisGame = game as IGame;
  return useCallback((type: string, value: any) => {
    gameDispatch({
      type: 'sendMessage',
      value: { type, value: { ...value, gameId: thisGame.gameId, playerId: thisGame.currentPlayer.playerId } }
    });
  }, [thisGame.gameId, thisGame.currentPlayer.playerId, gameDispatch]);
};

export default useSendMessage;
