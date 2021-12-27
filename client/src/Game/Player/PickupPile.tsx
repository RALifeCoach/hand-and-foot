import React, { memo, useState, useCallback } from "react";
import { IGamePlay } from "Game";
import useSendMessage from "../hooks/useSendMessage";
import PlayingCard from "../PlayingCard/PlayingCard";
import SnackAlert from "../../shared/SnackAlert";
import {useRecoilValue} from 'recoil'
import {gamePlayAtom} from '../../atoms/game'

interface IProps {
  pileIndex: number;
}

const PickupPile = ({ pileIndex }: IProps) => {
  const gamePlay = useRecoilValue(gamePlayAtom) as IGamePlay
  const pickupPile = gamePlay.pickupPiles[pileIndex]
  const sendMessage = useSendMessage();
  const [error, setError] = useState('');
  const handleClick = useCallback(() => {
    if (gamePlay.gameState !== 'inPlay' || !gamePlay.currentPlayer.isPlayerTurn) {
      setError("It isn't your turn");
      return;
    }
    if (gamePlay.currentPlayer.numberOfCardsToDraw === 0) {
      setError("It isn't time to draw cards");
      return;
    }
    sendMessage('drawCard', { pileIndex });
  }, [gamePlay, sendMessage, pileIndex]);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 500 }} >
        <PlayingCard
          card={{
            cardText: (
              <div style={{ textAlign: 'center', fontSize: 12 }} onClick={handleClick}>
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
      <SnackAlert
        open={Boolean(error)}
        text={error}
        severity="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default memo(PickupPile);
