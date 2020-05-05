import React, { memo } from 'react';
import { ITeam, IGame, ICard } from 'Game';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import TeamMeld from './TeamMeld';
import { Typography } from '@material-ui/core';

interface IProps {
  team: ITeam;
  game: IGame;
  isCurrentPlayer?: boolean;
  selectedCards: ICard[],
}

const TeamMelds = ({ team, game, isCurrentPlayer, selectedCards }: IProps) => {
  const redThrees = Object.values(team.melds).filter(meld => meld.type === '3s');
  const clean = Object.values(team.melds).filter(meld => meld.type === 'clean');
  const dirty = Object.values(team.melds).filter(meld => meld.type === 'dirty');
  const runs = Object.values(team.melds).filter(meld => meld.type === 'run');
  const wild = Object.values(team.melds).filter(meld => meld.type === 'wild');
  return (
    <FlexColumn style={{width: '100%'}}>
      <Typography variant="h4">{team.teamId}</Typography>
      <TeamMeld
        melds={redThrees}
        title="Red Threes"
        game={game}
        isCurrentPlayer={isCurrentPlayer}
        selectedCards={selectedCards}
      />
      <TeamMeld
        melds={clean}
        title="Clean Melds"
        game={game}
        isCurrentPlayer={isCurrentPlayer}
        selectedCards={selectedCards}
      />
      <TeamMeld
        melds={dirty}
        title="Dirty Melds"
        game={game}
        isCurrentPlayer={isCurrentPlayer}
        selectedCards={selectedCards}
      />
      <TeamMeld
        melds={runs}
        title="Runs"
        game={game}
        isCurrentPlayer={isCurrentPlayer}
        selectedCards={selectedCards}
      />
      <TeamMeld
        melds={wild}
        title="Wild Cards"
        game={game}
        isCurrentPlayer={isCurrentPlayer}
        selectedCards={selectedCards}
      />
    </FlexColumn>
  );
}

export default memo(TeamMelds);
