import React, { memo, useMemo } from "react";
import { IGame } from "Game";
import { Button } from "@material-ui/core";
import { IDispatch } from "General";

interface IProps {
  game: IGame;
  gameDispatch: IDispatch;
  gameId: number;
  playerId: number;
}

const DrawCard = ({ game, gameDispatch, gameId, playerId }: IProps) => {
  const canShow = useMemo(() => {
    if (game.gameState !== 'inPlay' || !game.currentPlayer.isPlayerTurn) {
      return false;
    }
    return game.currentPlayer.numberOfCardsToDraw > 0;
  }, [game.gameState, game.currentPlayer.isPlayerTurn, game.currentPlayer.numberOfCardsToDraw]);

  if (!canShow) {
    return null;
  }

  return (
    <Button
      variant="contained"
      style={{ fontSize: 24 }}
      onClick={() => gameDispatch({
        type: 'sendMessage',
        value: { type: 'drawCard', value: { gameId, playerId } }
      })}
    >
      Draw
    </Button>
  );
};

export default memo(DrawCard);
