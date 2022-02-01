import React, { memo } from 'react'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import { IconButton, Tooltip } from '@mui/material'
import styled from '@emotion/styled'
import { IGamesPlayer } from 'Game'

const BiggerTooltip = styled(Tooltip)`
  font-size: 16px
`

interface IProps {
  player: IGamesPlayer;
  isPlayerPresent: boolean;
  isCurrentUser: boolean;
  handleSit: () => void;
}

const SitButton = ({ player, isPlayerPresent, isCurrentUser, handleSit }: IProps) => {
  const title = player
    ? `Seat currently being played by ${player.playerName}`
    : 'Empty seat'

  const color = isPlayerPresent
    ? isCurrentUser
      ? '#0F0'
      : '#F00'
    : Boolean(player)
      ? '#F00'
      : '#0F0'

  return (
    <div className="h-14 w-14">
      <IconButton
        style={{ color }}
        onClick={() => {
          handleSit()
        }}
      >
        <BiggerTooltip
          placement="top"
          title={title}
          arrow
        >
          <div className="flex flex-col items-center">
            <EventSeatIcon
              style={{ width: 30, height: 30 }}
            />
            {!!player && (
              <div style={{ color: '#00F' }}>
                {player.playerName}
              </div>
            )}
          </div>
        </BiggerTooltip>
      </IconButton>
    </div>
  )
}

export default memo(SitButton)
