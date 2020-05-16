import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import FlexRow from '../shared/flex-grid/FlexRow';
import Notifications from "./Notifications";
import ApplicationBarMenu from './ApplicationBarMenu';
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
          <ApplicationBarMenu tabValue={menu} />
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
