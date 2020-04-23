import React, {useContext} from "react";
import GameContext from "./GameContext";
import Player from "./Player/Player";

const Game = () => {
  const { gameState: { game }} = useContext(GameContext);
  return (
    <>
      {Boolean(game?.currentPlayer) && (
        <Player
          player={game?.currentPlayer || {}}
          key={game?.currentPlayer.playerId}
        />
      )}
    </>
  )
};

export default Game;
