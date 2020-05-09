import React, { useMemo, useState, useCallback } from 'react';
import { IGame, IMeld, ICard } from 'Game';
import mapMeldCards from '../functions/mapMeldCards';
import { Paper, Tooltip, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useCanPlay from '../hooks/useCanPlay';
import useSendMessage from '../hooks/useSendMessage';
import SnackMessage from "../../shared/SnackMessage";
import buildMeldDisplay from '../functions/buildMeldDisplay';

const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 14,
  },
}));

interface IProps {
  options: any;
  game: IGame,
  meld: IMeld,
  isCurrentPlayer?: boolean;
  selectedCards: ICard[];
}

const Meld = ({ meld, game, isCurrentPlayer, selectedCards }: IProps) => {
  const { cards, rank, type } = meld;
  const mappedMeld = mapMeldCards(cards);
  const [isOver, setIsOver] = useState(false);
  const classes = useStyles();
  const [error, setError] = useState('');
  const display = useMemo(() => {
    switch (type) {
      case 'clean':
        return `${rank}-${cards.length}`;
      case 'dirty':
        return `${rank}-${cards.length} (${mappedMeld.naturals}/${mappedMeld.wild})`;
      case 'run':
        return `${cards[0].suit} (${cards[0].rank}-${cards[cards.length - 1].rank})`;
      case 'wild':
        return `${cards.length}`;
    }
  }, [type, cards, rank, mappedMeld]);

  const getPlayValues = useCanPlay(game, meld);
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
          classes={classes}
        >
          <div>{display}</div>
        </Tooltip>
      </Paper>
      <SnackMessage
        open={Boolean(error)}
        message={error}
        type="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default Meld;
