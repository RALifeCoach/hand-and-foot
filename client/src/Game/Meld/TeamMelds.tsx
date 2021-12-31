import React, { memo } from 'react';
import { IGamePlay } from 'Game';
import { ITeam, ICard, IGameBase } from '../../../../models/game';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import TeamMeld from './TeamMeld';
import { Typography } from '@mui/material';
import FlexRow from '../../shared/flex-grid/FlexRow';
import scoreCards from '../functions/scoreCards';
import {useRecoilValue} from 'recoil'
import {gameBaseAtom, gamePlayAtom} from '../../atoms/game'

interface IProps {
  team: ITeam;
  isCurrentPlayer?: boolean;
  selectedCards: ICard[],
}

const TeamMelds = ({ team, isCurrentPlayer, selectedCards }: IProps) => {
  const gamePlay = useRecoilValue(gamePlayAtom) as IGamePlay
  const gameBase = useRecoilValue(gameBaseAtom) as IGameBase
  const redThrees = Object.values(team.melds).filter(meld => meld.type === '3s');
  const clean = Object.values(team.melds).filter(meld => meld.type === 'clean');
  const dirty = Object.values(team.melds).filter(meld => meld.type === 'dirty');
  const runs = Object.values(team.melds).filter(meld => meld.type === 'run');
  const wild = Object.values(team.melds).filter(meld => meld.type === 'wild');

  const selectedCardsScore = scoreCards(gameBase, selectedCards);

  return (
    <FlexColumn style={{ width: '100%' }}>
      <Typography variant="h4">{team.teamId}</Typography>
      <FlexRow>
        <FlexColumn style={{ minWidth: 120 }}>
          <div>Selected: {selectedCardsScore}</div>
          <div>On Table: {team.scoreOnTable}</div>
          <div>Minimum: <strong>{gamePlay.minimumPoints}</strong></div>
          <div>Score: {team.scoreBase}</div>
        </FlexColumn>
        <FlexColumn>
          <TeamMeld
            melds={redThrees}
            title="Red Threes"
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            melds={clean}
            title="Clean Melds"
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            melds={dirty}
            title="Dirty Melds"
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            melds={runs}
            title="Runs"
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            melds={wild}
            title="Wild Cards"
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
        </FlexColumn>
      </FlexRow>
    </FlexColumn >
  );
}

export default memo(TeamMelds);
