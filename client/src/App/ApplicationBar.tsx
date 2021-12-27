import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import FlexRow from '../shared/flex-grid/FlexRow';
import Notifications from "./Notifications";
import ApplicationBarMenu from './ApplicationBarMenu';

interface IProps {
  notifications: boolean;
}

const ApplicationBar = ({ notifications }: IProps) => {
  return (
    <AppBar position="static" style={{ width: '100%' }}>
      <Toolbar style={{ width: '100%' }}>
        <FlexRow justify="space-between" style={{ width: '100%' }}>
          <ApplicationBarMenu />
          <Typography variant="h2" style={{ color: '#FFF', marginTop: 12 }}>
            {'Hand & Foot (brought to the family by Bob White)'}
          </Typography>
          {notifications
            ? (
              <Notifications />
            )
            : (
              <div />
            )
          }
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
