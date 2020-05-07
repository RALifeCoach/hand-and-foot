import React, { useContext } from "react";
import GameContext from "./GameContext";
import Player from "./Player/Player";
import { IPlayerCurrent } from "Game";
import { Typography, AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FlexRow from "../shared/flex-grid/FlexRow";
import Notifications from "./Notifications";

const Game = () => {
  const { gameState: { game, selected, sortOrder, cardMoving } } = useContext(GameContext);
  if (!game) {
    return null;
  }
  return (
    <>
      <AppBar position="static" style={{ width: '100%' }}>
        <Toolbar style={{ width: '100%' }}>
          <FlexRow justify="space-between" style={{ width: '100%' }}>
            <IconButton edge="start" color="inherit">
              <MenuIcon style={{ width: 30, height: 30 }} />
            </IconButton>
            <Typography variant="h2" style={{ color: '#FFF', marginTop: 12 }}>
              {'Hand & Foot (brought to the family by Bob White)'}
            </Typography>
            <Notifications />
          </FlexRow>
        </Toolbar>
      </AppBar>
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
