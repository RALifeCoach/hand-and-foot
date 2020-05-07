import React, { memo, useMemo } from "react";
import { IGame } from "Game";
import { Button } from "@material-ui/core";
import useSendMessage from "../hooks/useSendMessage";
import FlexColumn from "../../shared/flex-grid/FlexColumn";

interface IProps {
  game: IGame;
}

const PlayerAction = ({ game }: IProps) => {
  const sendMessage = useSendMessage();
  const canDraw = useMemo(() => {
    if (game.gameState !== 'inPlay' || !game.currentPlayer.isPlayerTurn) {
      return false;
    }
    return game.currentPlayer.numberOfCardsToDraw > 0;
  }, [game.gameState, game.currentPlayer.isPlayerTurn, game.currentPlayer.numberOfCardsToDraw]);

  const canPlay = game.gameState === 'inPlay' && game.currentPlayer.isPlayerTurn;

  if (canDraw) {
    return (
      <Button
        variant="contained"
        style={{ maxWidth: 60, maxHeight: 60, minWidth: 60, minHeight: 60, marginTop: 24, marginLeft: 8 }}
      >
        <FlexColumn>
          <div style={{ fontSize: 18 }}>Draw</div>
          <div style={{ fontSize: 14 }}>{game.currentPlayer.numberOfCardsToDraw}</div>
        </FlexColumn>
      </Button>
    );
  }

  if (canPlay) {
    return (
      <Button
        variant="contained"
        style={{ fontSize: 20, maxWidth: 100, maxHeight: 80, minWidth: 100, minHeight: 80 }}
        onClick={() => sendMessage('undo', {})}
      >
        Undo
      </Button>
    );
  }

  return (
    <div style={{ width: 110, display: 'block' }} />
  );
};

export default memo(PlayerAction);
