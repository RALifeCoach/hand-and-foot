import React, { useState, useContext, useCallback } from 'react';
import { IconButton, Drawer, Typography } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GameContext from '../Game/GameContext';
import FlexColumn from '../shared/flex-grid/FlexColumn';
import FlexRow from '../shared/flex-grid/FlexRow';

const Notifications = () => {
  const { gameState: { newMessages, messages }, gameDispatch } = useContext(GameContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    gameDispatch({ type: 'messagesSeen', value: null });
  }, [gameDispatch]);
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => setDrawerOpen(true)}
      >
        {!newMessages
          ? (
            <NotificationsNoneOutlinedIcon style={{ width: 30, height: 30 }} />
          )
          : (
            <NotificationsActiveOutlinedIcon style={{ width: 30, height: 30 }} />
          )
        }
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleClose}
      >
        <FlexColumn style={{ width: 300, height: '100%' }}>
          <FlexRow justify="space-between">
            <Typography variant="subtitle1">Notifications</Typography>
            <IconButton
              onClick={handleClose}
            >
              <HighlightOffIcon />
            </IconButton>
          </FlexRow>
          {[...messages].reverse().map((message, index) => (
            <div
              style={{fontWeight: message.isSent ? 'normal' : 'bold'}}
              key={index}
            >
              {`${message.playerName} ${message.text}`}
            </div>
          ))}
        </FlexColumn>
      </Drawer>
    </div>
  )
};

export default Notifications;
