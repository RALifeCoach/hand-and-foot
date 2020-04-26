import React, {useContext} from "react";
import GameContext from "./GameContext";
import Player from "./Player/Player";
import { IPlayerCurrent } from "Game";

const Game = () => {
  const { gameState: { game, cards, sortOrder, cardMoving } } = useContext(GameContext);
  if (!game) {
    return null;
  }
  return (
    <>
      {Boolean(game?.currentPlayer) && (
        <Player
          player={game.currentPlayer as IPlayerCurrent}
          cards={cards}
          sortOrder={sortOrder}
          cardMoving={cardMoving}
          key={game?.currentPlayer.playerId}
        />
      )}
    </>
  )
};

export default Game;
