import React, { memo } from 'react';
import { ITeam, IGamePlay, ICard, IGameBase } from 'Game';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import TeamMeld from './TeamMeld';
import { Typography } from '@material-ui/core';
import FlexRow from '../../shared/flex-grid/FlexRow';
import scoreCards from '../functions/scoreCards';

interface IProps {
  team: ITeam;
  gamePlay: IGamePlay;
  gameBase: IGameBase;
  isCurrentPlayer?: boolean;
  selectedCards: ICard[],
}

const TeamMelds = ({ team, gamePlay, gameBase, isCurrentPlayer, selectedCards }: IProps) => {
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
            gameBase={gameBase}
            melds={redThrees}
            title="Red Threes"
            gamePlay={gamePlay}
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            gameBase={gameBase}
            melds={clean}
            title="Clean Melds"
            gamePlay={gamePlay}
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            gameBase={gameBase}
            melds={dirty}
            title="Dirty Melds"
            gamePlay={gamePlay}
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            gameBase={gameBase}
            melds={runs}
            title="Runs"
            gamePlay={gamePlay}
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
          <TeamMeld
            gameBase={gameBase}
            melds={wild}
            title="Wild Cards"
            gamePlay={gamePlay}
            isCurrentPlayer={isCurrentPlayer}
            selectedCards={selectedCards}
          />
        </FlexColumn>
      </FlexRow>
    </FlexColumn >
  );
}

export default memo(TeamMelds);
