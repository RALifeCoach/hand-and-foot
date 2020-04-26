import React from 'react';
import FlexRow from "../../shared/flex-grid/FlexRow";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import { IGame } from 'Game';
import Spacer from '../../shared/Spacer';

interface IProps {
  game: IGame;
}

const OtherPlayers = ({ game }: IProps) => {
  return (
    <FlexRow>
      {game.otherPlayers.map(player => (
        <FlexRow key={player.playerId}>
          <Spacer multiplier={2} />
          <FlexColumn style={{marginTop: 18}}>
            <div>Player: {player.playerName || player.playerId}</div>
            <div>Cards: {player.cards}</div>
            <div>In: {player.isInHand ? 'Hand' : 'Foot'}</div>
          </FlexColumn>
        </FlexRow>
      ))}
    </FlexRow>
  );
};

export default OtherPlayers;
