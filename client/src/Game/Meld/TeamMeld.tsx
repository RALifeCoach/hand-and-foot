import React, { memo } from 'react';
import { IMeld, IGame, ICard } from 'Game';
import FlexRow from '../../shared/flex-grid/FlexRow';
import Meld from './Meld';
import { Tooltip } from '@material-ui/core';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import buildMeldDisplay from '../functions/buildMeldDisplay';

interface IProps {
  melds: IMeld[];
  title: string;
  game: IGame;
  isCurrentPlayer?: boolean;
  selectedCards: ICard[];
}

const TeamMeld = ({ melds, game, title, isCurrentPlayer, selectedCards }: IProps) => {
  const complete = melds.filter(meld => meld.isComplete);
  const incomplete = melds.filter(meld => !meld.isComplete);

  const completeMeldsDisplay = complete.map(meld =>
    buildMeldDisplay(meld)
  );

  return (
    <>
      <FlexRow style={{ width: '100%' }}>
        <Tooltip
          title={complete.length > 0
            ? (
              <FlexColumn>
                {completeMeldsDisplay.map((display, index) => (
                  <div key={index} style={{ fontSize: 14, lineHeight: '16px' }}>{display}</div>
                ))}
              </FlexColumn>
            )
            : (
              ''
            )}
          placement="top"
          arrow
        >
          <div>
            <FlexRow>
              <div>{title}:&nbsp;</div>
              <div>{complete.length}</div>
            </FlexRow>
          </div>
        </Tooltip>
        {incomplete.map(meld => (
          <Meld
            game={game}
            options={{}}
            meld={meld}
            key={meld.meldId}
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
        ))}
      </FlexRow>
    </>
  );
}

export default memo(TeamMeld);
