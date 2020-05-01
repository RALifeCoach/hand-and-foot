import React, { memo } from 'react';
import { IMeld, IMeldType } from 'Game';
import FlexRow from '../../shared/flex-grid/FlexRow';
import Meld from './Meld';

interface IProps {
  melds: IMeld[];
  type: IMeldType;
  title: string;
}

const TeamMeld = ({ melds, type, title }: IProps) => {
  const complete = melds.filter(meld => meld.isComplete);
  const incomplete = melds.filter(meld => !meld.isComplete);

  return (
    <>
      <FlexRow style={{width: '100%'}}>
        <FlexRow>
          <div>{title}:&nbsp;</div>
          <div>{complete.length}</div>
        </FlexRow>
        {incomplete.map(meld => (
          <Meld
            options={{}}
            cards={meld.cards}
            type={type}
            rank={meld.rank}
            key={meld.meldId}
          />
        ))}
      </FlexRow>
    </>
  );
}

export default memo(TeamMeld);
