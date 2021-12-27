import React from 'react';
import useSortStyles from "../hooks/useSortStyles";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import useSendMessage from '../hooks/useSendMessage';

interface IProps {
  config: any;
}

const SortButtons = ({ config }: IProps) => {
  const { styleSortRank, styleSortSuit } = useSortStyles(config);
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
