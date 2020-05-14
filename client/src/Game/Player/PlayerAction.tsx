import React, { memo, useMemo } from "react";
import { IGamePlay } from "Game";
import { Button } from "@material-ui/core";
import useSendMessage from "../hooks/useSendMessage";
import FlexColumn from "../../shared/flex-grid/FlexColumn";

interface IProps {
  gamePlay: IGamePlay;
}

const PlayerAction = ({ gamePlay }: IProps) => {
  const sendMessage = useSendMessage();
  const canDraw = useMemo(() => {
    if (gamePlay.gameState !== 'inPlay' || !gamePlay.currentPlayer.isPlayerTurn) {
      return false;
    }
    return gamePlay.currentPlayer.numberOfCardsToDraw > 0;
  }, [gamePlay.gameState, gamePlay.currentPlayer.isPlayerTurn, gamePlay.currentPlayer.numberOfCardsToDraw]);

  const canPlay = gamePlay.gameState === 'inPlay' && gamePlay.currentPlayer.isPlayerTurn;

  if (canDraw) {
    return (
      <Button
        variant="contained"
        style={{ maxWidth: 60, maxHeight: 60, minWidth: 60, minHeight: 60, marginTop: 24, marginLeft: 8 }}
      >
        <FlexColumn>
          <div style={{ fontSize: 18 }}>Draw</div>
          <div style={{ fontSize: 14 }}>{gamePlay.currentPlayer.numberOfCardsToDraw}</div>
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
