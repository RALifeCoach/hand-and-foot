import React, {useContext} from "react";
import GameContext from "./GameContext";
import Player from "./Player/Player";

const Game = () => {
  const {game} = useContext(GameContext);
  return (
    <>
      {game.players.map(player => (
        <Player
          player={player}
          key={player.playerId}
        />
      ))}
    </>
  )
};

export default Game;
