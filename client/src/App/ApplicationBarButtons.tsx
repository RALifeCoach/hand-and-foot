import React, {useCallback, useContext, useState} from 'react';
import {
  Tabs, IconButton, Icon, Menu, MenuItem,
} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import {themeColors} from "../theme";
import FlexRow from "../shared/flex-grid/FlexRow";
import Spacer from "../shared/Spacer";
import AppMenuItem from "./AppMenuItem";
import MainContext from "./MainContext";

const MENU_ITEMS = [
  {
    title: 'Trips',
    value: 'trips',
    roles: ['general', 'super'],
  },
  {
    title: 'Users',
    value: 'users',
    roles: ['users', 'super'],
  },
];

const useStyles = makeStyles(() => ({
  indicator: {
    backgroundColor: `${themeColors.brand[900]} !important`,
  },
}));

interface IProps {
  tabValue: string;
}

const ApplicationBarButtons = ({tabValue}: IProps) => {
  const {mainState: {user, windowSize}, mainDispatch} = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const classes = useStyles();

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const filteredMenuItems = MENU_ITEMS
    .filter(menu => {
      if (!user) {
        return false;
      }
      return menu.roles.indexOf(user?.role) > -1;
    });

  if (filteredMenuItems.length === 1) {
    return (
      <FlexRow>
        <Spacer multiplier={2}/>
      </FlexRow>
    );
  }

  if (windowSize === 'phone') {
    return (
      <>
        <FlexRow>
          <IconButton
            style={{width: 24}}
            onClick={(event: any) => setAnchorEl(event.target)}
          >
            <Icon>menu</Icon>
          </IconButton>
        </FlexRow>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl as Element}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          {filteredMenuItems.map(menu => (
            <MenuItem
              onClick={() => {
                mainDispatch({type: 'menu', value: menu.value});
                handleClose();
              }}
              key={menu.value}
            >
              {menu.title}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <FlexRow>
      <Tabs
        value={tabValue}
        classes={{indicator: classes.indicator}}
      >
        {filteredMenuItems.map(menu => (
          <AppMenuItem
            title={menu.title}
            value={menu.value}
            key={menu.value}
          />
        ))}
      </Tabs>
      <Spacer multiplier={2}/>
    </FlexRow>
  );
};

export default ApplicationBarButtons;
