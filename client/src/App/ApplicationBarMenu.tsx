import React, { useCallback, useContext, useState } from 'react';
import {
  IconButton, Menu, MenuItem,
} from '@material-ui/core';
import MainContext from "./MainContext";
import MenuIcon from '@material-ui/icons/Menu';

const MENU_ITEMS = [
  {
    title: 'Games',
    value: 'games',
    roles: ['general', 'super'],
  },
  {
    title: 'Users',
    value: 'users',
    roles: ['users', 'super'],
  },
];

interface IProps {
  tabValue: string;
}

const ApplicationBarButtons = ({ tabValue }: IProps) => {
  const { mainState: { user }, mainDispatch } = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    return item.roles.indexOf(user!.role) > -1
  });

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton
        style={{ width: 24 }}
        onClick={(event: any) => setAnchorEl(event.target)}
      >
        <MenuIcon style={{ width: 30, height: 30, color: '#FFF' }} />
      </IconButton>
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
              mainDispatch({ type: 'menu', value: menu.value });
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
};

export default ApplicationBarButtons;
