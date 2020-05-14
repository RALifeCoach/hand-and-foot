import React, { memo } from 'react';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { IconButton, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const BiggerTooltip = withStyles({
  tooltip: {
    fontSize: 16
  }
})(Tooltip);

interface IProps {
  player: any;
  top: number;
  left: number;
  isPlayerPresent: boolean;
  isCurrentUser: boolean;
  handleSit: () => void;
}

const SitButton = ({ top, left, player, isPlayerPresent, isCurrentUser, handleSit }: IProps) => {
  const title = player
    ? `Seat currently being played by ${player.name}`
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
      onClick={handleSit}
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
          {Boolean(player) && (
            <div style={{ position: 'relative', left: -38, color: '#00F', maxWidth: 40 }}>
              {player.name}
            </div>
          )}
        </>
      </BiggerTooltip>
    </IconButton>
  );
};

export default memo(SitButton);
