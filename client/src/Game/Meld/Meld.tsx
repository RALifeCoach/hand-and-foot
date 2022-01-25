import React, { useMemo, useState, useCallback } from 'react';
import { IGamePlay } from 'Game';
import { IMeld, ICard, IGameBase } from '../../../models/game';
import { Paper, Tooltip } from '@mui/material';
import useCanPlay from '../hooks/useCanPlay';
import useSendMessage from '../hooks/useSendMessage';
import SnackAlert from "../../shared/SnackAlert";
import buildMeldDisplay from '../functions/buildMeldDisplay';
import { SUIT_IMAGES } from '../../constants';

interface IProps {
  options: any;
  gamePlay: IGamePlay,
  gameBase: IGameBase,
  meld: IMeld,
  isCurrentPlayer?: boolean;
  selectedCards: ICard[];
}

const Meld = ({ meld, gamePlay, gameBase, isCurrentPlayer, selectedCards }: IProps) => {
  const { cards } = meld;
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState('');
  const display = useMemo(() => {
    return (
      <>
        {cards.map((card, cardIndex) => (
          <span key={card.cardId}>
            {card.suit === 'J' ? '' : card.rank}
            <span style={{ color: SUIT_IMAGES[card.suit].color }}>
              {SUIT_IMAGES[card.suit].image}
            </span>
            {cardIndex < cards.length - 1 && ', '}
          </span>
        ))}
      </>
    )
  }, [cards]);

  const getPlayValues = useCanPlay(gamePlay, gameBase, meld);
  const sendMessage = useSendMessage();

  const handleClick = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    const playValues = getPlayValues(selectedCards);
    if (isCurrentPlayer && playValues) {
      if (playValues.error) {
        setError(playValues.error);
        return;
      }
      sendMessage('playCards', { cardIds: selectedCards.map(card => card.cardId), ...playValues })
    }
  }, [getPlayValues, selectedCards, sendMessage, isCurrentPlayer]);

  const displayValues = useMemo(() =>
    buildMeldDisplay(meld)
    , [meld]);

  const style = {
    marginLeft: 6,
    backgroundColor: isOver ? '#3D3D3D' : '#D3D3D3',
    padding: '0, 6px',
    color: isOver ? '#FFFFFF' : '#000000',
  }
  return (
    <>
      <Paper
        style={style}
        onMouseEnter={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        onClick={handleClick}
      >
        <Tooltip
          title={displayValues}
          placement="top"
          arrow
        >
          <div>{display}</div>
        </Tooltip>
      </Paper>
      <SnackAlert
        open={!!error}
        text={error}
        severity="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default Meld;
