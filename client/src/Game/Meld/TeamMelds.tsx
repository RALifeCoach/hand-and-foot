import React, { memo } from 'react';
import { ITeam } from 'Game';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import TeamMeld from './TeamMeld';

interface IProps {
  team: ITeam;
}

const TeamMelds = ({ team }: IProps) => {
  const redThrees = Object.values(team.melds).filter(meld => meld.type === '3s');
  const clean = Object.values(team.melds).filter(meld => meld.type === 'clean');
  const dirty = Object.values(team.melds).filter(meld => meld.type === 'dirty');
  const runs = Object.values(team.melds).filter(meld => meld.type === 'run');
  const wild = Object.values(team.melds).filter(meld => meld.type === 'wild');
  return (
    <FlexColumn>
      <div>{team.teamId}</div>
      <TeamMeld
        melds={redThrees}
        type="3s"
        title="Red Threes"
      />
      <TeamMeld
        melds={clean}
        type="clean"
        title="Clean Melds"
      />
      <TeamMeld
        melds={dirty}
        type="dirty"
        title="Dirty Melds"
      />
      <TeamMeld
        melds={runs}
        type="run"
        title="Runs"
      />
      <TeamMeld
        melds={wild}
        type="wild"
        title="Wild Cards"
      />
    </FlexColumn>
  );
}

export default memo(TeamMelds);
