import React, { memo } from 'react';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { IconButton, Tooltip } from '@mui/material';
import styled from '@emotion/styled'
import { IGamesPlayer } from 'Game'

const BiggerTooltip = styled(Tooltip)`
  font-size: 16px
`

interface IProps {
  player: IGamesPlayer;
  top: number;
  left: number;
  isPlayerPresent: boolean;
  isCurrentUser: boolean;
  handleSit: () => void;
}

const SitButton = ({ top, left, player, isPlayerPresent, isCurrentUser, handleSit }: IProps) => {
  const title = player
    ? `Seat currently being played by ${player.playerName}`
    : 'Empty seat';

  const color = isPlayerPresent
    ? isCurrentUser
      ? '#0F0'
      : '#F00'
    : Boolean(player)
      ? '#F00'
      : '#0F0';

  return (
    <IconButton
      style={{ position: 'absolute', top, left, color }}
      onClick={() => {
        handleSit()}}
    >
      <BiggerTooltip
        placement="top"
        title={title}
        arrow
      >
        <>
          <EventSeatIcon
            style={{ width: 40, height: 40 }}
          />
          {!!player && (
            <div style={{ position: 'relative', left: -38, color: '#00F', maxWidth: 40 }}>
              {player.playerName}
            </div>
          )}
        </>
      </BiggerTooltip>
    </IconButton>
  );
};

export default memo(SitButton);
