import React from 'react';
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import { ITeam } from 'Game';

interface IProps {
  playerName: string;
  isPlayerTurn: boolean;
  cards: number;
  isInHand: boolean;
  team: ITeam;
}

const PlayerStats = ({ playerName, isPlayerTurn, cards, isInHand, team }: IProps) => {
  return (
    <FlexColumn
      style={{
        marginTop: 18,
        backgroundColor: isPlayerTurn ? '#0000D2' : '#FFF',
        color: isPlayerTurn ? '#FFF' : '#000',
        padding: 6
      }}>
      <div>{playerName}</div>
      <div>Cards: {cards}</div>
      <div>In: {isInHand ? 'Hand' : 'Foot'}</div>
    </FlexColumn>
  );
};

export default PlayerStats;
