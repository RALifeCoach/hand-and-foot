import React, { memo, useCallback, useState } from "react";
import { IGamePlay, IGameBase } from "Game";
import useCanDiscard from "../hooks/useCanDiscard";
import PlayingCard from '../PlayingCard/PlayingCard';
import useCanDrawFromPile from "../hooks/useCanDrawFromPile";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedCards from "../hooks/useSelectedCards";
import SnackMessage from "../../shared/SnackMessage";
import { LockOutlined } from '@material-ui/icons';

interface IProps {
  gamePlay: IGamePlay;
  gameBase: IGameBase;
  selected: { [cardId: string]: boolean };
}

const DiscardPile = ({ gamePlay, gameBase, selected }: IProps) => {
  const canDiscard = useCanDiscard(gamePlay, gameBase, selected);
  const canDraw7 = useCanDrawFromPile();
  const sendMessage = useSendMessage();
  const selectedCards = useSelectedCards(gamePlay.currentPlayer.cards, selected);
  const [error, setError] = useState('');

  const handleClick = useCallback(() => {
    if (gamePlay.currentPlayer.playerState === 'draw7') {
      return setError("You cannot discard while still drawing 7");
    }
    const drawMessage: string | null = canDraw7(gamePlay, gameBase);
    if (drawMessage === '') {
      return sendMessage('draw7', {});
    }
    if (drawMessage !== null) {
      return setError(drawMessage);
    }
    const message = canDiscard();
    if (!message) {
      return sendMessage('discardCard', { toDiscard: selectedCards[0].cardId });
    }
    setError(message);
  }, [canDiscard, canDraw7, sendMessage, selectedCards, gamePlay, gameBase]);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 500 }} >
        <PlayingCard
          card={gamePlay.currentPlayer.playerState === 'draw7'
            ? { cardText: 'Draw 7' }
            : gamePlay.discardCard === null
              ? { cardText: 'Empty' }
              : gamePlay.discardCard
          }
          imageLocation="below"
          left={0}
          top={0}
          onSelect={handleClick}
        />
        <div style={{ position: 'absolute', top: 22, left: 30 }}>
          <span style={{ fontSize: 18, color: '#881111' }}>{gamePlay.discardCount.toString()}</span>
        </div>
        {gamePlay.pileIsLocked && (
          <div style={{ position: 'absolute', top: 60, left: 22 }}>
            <LockOutlined style={{ width: 25, height: 25 }} />
          </div>
        )}
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

export default memo(DiscardPile);
