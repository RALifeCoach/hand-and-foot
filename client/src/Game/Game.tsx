import React, { useContext } from "react";
import GameContext from "./GameContext";
import Player from "./Player/Player";
import { IPlayerCurrent } from "Game";
import ApplicationBar from "../App/ApplicationBar";
import MainContext from "../App/MainContext";

const Game = () => {
  const { mainState: { menu } } = useContext(MainContext);
  const { gameState: { game, selected, sortOrder, cardMoving } } = useContext(GameContext);
  if (!game) {
    return null;
  }
  return (
    <>
      <ApplicationBar
        tabValue={menu}
        notifications
      />
      {Boolean(game?.currentPlayer) && (
        <Player
          player={game.currentPlayer as IPlayerCurrent}
          game={game}
          selected={selected}
          sortOrder={sortOrder}
          cardMoving={cardMoving}
          key={game?.currentPlayer.playerId}
        />
      )}
    </>
  )
};

export default Game;
