import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import FlexRow from '../shared/flex-grid/FlexRow';
import MenuIcon from "@material-ui/icons/Menu";
import Notifications from "./Notifications";
import ApplicationBarButtons from './ApplicationBarButtons';
import MainContext from './MainContext';

interface IProps {
  notifications: boolean;
}

const ApplicationBar = ({ notifications }: IProps) => {
  const { mainState: { menu } } = useContext(MainContext);
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
          <ApplicationBarButtons tabValue={menu} />
          {notifications && (
            <Notifications />
          )}
        </FlexRow>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
