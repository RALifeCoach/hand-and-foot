import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import FlexRow from '../shared/flex-grid/FlexRow';
import MenuIcon from "@material-ui/icons/Menu";
import Notifications from "./Notifications";
import ApplicationBarButtons from './ApplicationBarButtons';

interface IProps {
  tabValue: string;
  notifications: boolean;
}

const ApplicationBar = ({tabValue, notifications}: IProps) => {
  return (
    <AppBar position="static" style={{ width: '100%' }}>
      <Toolbar style={{ width: '100%' }}>
        <FlexRow justify="space-between" style={{ width: '100%' }}>
          <IconButton edge="start" color="inherit">
            <MenuIcon style={{ width: 30, height: 30 }} />
          </IconButton>
          <Typography variant="h2" style={{ color: '#FFF', marginTop: 12 }}>
            {'Hand & Foot (brought to the family by Bob White)'}
          </Typography>
          <ApplicationBarButtons tabValue={tabValue} />
          {notifications && (
            <Notifications />
          )}
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
