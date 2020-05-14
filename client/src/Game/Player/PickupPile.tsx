import React, { memo, useState, useCallback } from "react";
import { IGamePlay } from "Game";
import useSendMessage from "../hooks/useSendMessage";
import PlayingCard from "../PlayingCard/PlayingCard";
import SnackMessage from "../../shared/SnackMessage";

interface IProps {
  gamePlay: IGamePlay;
  pickupPile: number;
  pileIndex: number;
}

const PickupPile = ({ gamePlay, pickupPile, pileIndex }: IProps) => {
  const sendMessage = useSendMessage();
  const [error, setError] = useState('');
  const handleClick = useCallback(() => {
    if (gamePlay.gameState !== 'inPlay' || !gamePlay.currentPlayer.isPlayerTurn) {
      setError("It isn't your turn");
      return;
    }
    if (gamePlay.currentPlayer.numberOfCardsToDraw === 0) {
      setError("It isn't time to draw cards");
    }
    sendMessage('drawCard', { pileIndex });
  }, [gamePlay, sendMessage, pileIndex]);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 500 }} >
        <PlayingCard
          card={{
            cardText: (
              <div style={{ textAlign: 'center', fontSize: 12 }}>
                Pickup<br /><span style={{ fontSize: 18, color: '#881111' }}>{pickupPile.toString()}</span>
              </div>
            )
          }}
          imageLocation="below"
          left={0}
          top={0}
          onSelect={handleClick}
        />
      </div>
      <SnackMessage
        open={Boolean(error)}
        message={error}
        type="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default memo(PickupPile);
