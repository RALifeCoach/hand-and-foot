import React, { useMemo } from 'react';
import { ICard, IMeldType, IRank } from 'Game';
import mapMeldCards from '../functions/mapMeldCards';
import { Paper } from '@material-ui/core';

interface IProps {
  options: any;
  cards: ICard[];
  type: IMeldType;
  rank?: IRank;
}

const Meld = ({ cards, type, rank }: IProps) => {
  const mappedMeld = mapMeldCards(cards);
  const display = useMemo(() => {
    switch (type) {
      case 'clean':
        return `${rank}-${cards.length}`;
      case 'dirty':
        return `${rank}-${cards.length} (${mappedMeld.naturals}/${mappedMeld.wild})`;
      case 'run':
        return `${cards[0].suit}-${cards.length} (${cards[cards.length - 1].rank}/${cards[0].rank})`;
      case 'wild':
        return `${cards.length}`;
    }
  }, [type, cards, rank, mappedMeld]);

  return (
    <Paper style={{ marginLeft: 6 }}>
      {display}
    </Paper>
  );
};

export default Meld;
