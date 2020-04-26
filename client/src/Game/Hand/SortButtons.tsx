import React from 'react';
import useSortStyles from "../hooks/useSortStyles";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import { IDispatch } from 'General';

interface IProps {
  gameDispatch: IDispatch;
  sortOrder: string;
  config: any;
  gameId: number;
  playerId: number;
}

const SortButtons = ({ gameDispatch, sortOrder, config, gameId, playerId }: IProps) => {
  const { styleSortRank, styleSortSuit } = useSortStyles(sortOrder, config);
  return (
    <FlexColumn style={{ width: 80, padding: 10 }}>
      <div
        style={styleSortRank}
        onClick={() => gameDispatch({
          type: 'sendMessage',
          value: {
            type: 'setSortOrder', value: { gameId, playerId, sortOrder: 'rank' }
          }
        })}
      >
        A-4
        </div>
      <div
        style={styleSortSuit}
        onClick={() => gameDispatch({
          type: 'sendMessage',
          value: {
            type: 'setSortOrder', value: { gameId, playerId, sortOrder: 'suit' }
          }
        })}
      >
        {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
      </div>
    </FlexColumn>
  );
};

export default SortButtons;
