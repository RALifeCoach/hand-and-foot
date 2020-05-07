import React from 'react';
import useSortStyles from "../hooks/useSortStyles";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import { IDispatch } from 'General';
import useSendMessage from '../hooks/useSendMessage';

interface IProps {
  gameDispatch: IDispatch;
  sortOrder: string;
  config: any;
  gameId: number;
  playerId: number;
}

const SortButtons = ({ gameDispatch, sortOrder, config, gameId, playerId }: IProps) => {
  const { styleSortRank, styleSortSuit } = useSortStyles(sortOrder, config);
  const sendMessage = useSendMessage();
  return (
    <FlexColumn style={{ width: 60, margin: '8px 8px 8px 8px' }}>
      <div
        style={styleSortRank}
        onClick={() => sendMessage('setSortOrder', { sortOrder: 'rank' })}
      >
        A-4
        </div>
      <div
        style={styleSortSuit}
        onClick={() => sendMessage('setSortOrder', { sortOrder: 'suit' })}
      >
        {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
      </div>
    </FlexColumn>
  );
};

export default SortButtons;
