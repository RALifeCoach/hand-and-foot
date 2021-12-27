import React, { useState, useCallback } from 'react';
import { IconButton, Drawer, Typography } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FlexColumn from '../shared/flex-grid/FlexColumn';
import FlexRow from '../shared/flex-grid/FlexRow';
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {messagesAtom, messagesSeenAtom, newMessagesAtom} from '../atoms/game'

const Notifications = () => {
  const newMessages = useRecoilValue(newMessagesAtom)
  const messages = useRecoilValue(messagesAtom)
  const setMessagesSeen = useSetRecoilState(messagesSeenAtom)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    setMessagesSeen(null)
  }, [setMessagesSeen]);
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
