import React, { memo } from 'react';
import { IMeld, IGamePlay, ICard, IGameBase } from 'Game';
import FlexRow from '../../shared/flex-grid/FlexRow';
import Meld from './Meld';
import { Tooltip } from '@material-ui/core';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import buildMeldDisplay from '../functions/buildMeldDisplay';
import getCardValue from '../functions/getCardValue';

interface IProps {
  melds: IMeld[];
  title: string;
  gamePlay: IGamePlay;
  gameBase: IGameBase;
  isCurrentPlayer?: boolean;
  selectedCards: ICard[];
}

const TeamMeld = ({ melds, gamePlay, gameBase, title, isCurrentPlayer, selectedCards }: IProps) => {
  const complete = melds.filter(meld => meld.isComplete);
  const incomplete = melds.filter(meld => !meld.isComplete).sort((meldA, meldB) =>
    (getCardValue(meldA.rank) || 0) < (getCardValue(meldB.rank) || 0) ? 1 : -1);

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
              <div style={{ width: 100 }}>{title}:&nbsp;</div>
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>{complete.length}</div>
            </FlexRow>
          </div>
        </Tooltip>
        {incomplete.map(meld => (
          <Meld
            gamePlay={gamePlay}
            gameBase={gameBase}
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
