import { useCallback, useContext } from "react";
import GameContext from "../GameContext";
import MainContext from "../../App/MainContext";

const useSendMessage = () => {
  const {
    mainState: { gameId, user },
  } = useContext(MainContext);
  const {
    gameState: { playerId },
    gameDispatch,
  } = useContext(GameContext);

  return useCallback(
    (type: string, value: any) => {
      gameDispatch({
        type: "sendMessage",
        value: {
          type,
          token: user?.token,
          value: {
            ...value,
            gameId: gameId,
            playerId: playerId,
          },
        },
      });
    },
    [gameDispatch, gameId, playerId, user]
  );
};

export default useSendMessage;
