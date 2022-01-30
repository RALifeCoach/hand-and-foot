import React, { useCallback, useState } from 'react'
import {
  IconButton, Menu, MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { menuAtom, userAtom } from '../atoms/main'
import { useNavigate } from 'react-router-dom'

const MENU_ITEMS = [
  {
    title: 'Games',
    value: '/games',
    roles: ['general', 'super'],
  },
  {
    title: 'Users',
    value: '/users',
    roles: ['users', 'super'],
  },
]

const ApplicationBarButtons = () => {
  const user = useRecoilValue(userAtom)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const navigate = useNavigate()

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    return item.roles.indexOf(user!.role) > -1
  })

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <IconButton
        style={{ width: 24 }}
        onClick={(event: any) => setAnchorEl(event.target)}
      >
        <MenuIcon style={{ width: 30, height: 30, color: '#FFF' }}/>
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl as Element}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {filteredMenuItems.map(menu => (
          <MenuItem
            onClick={() => {
              navigate(menu.value)
            }}
            key={menu.value}
          >
            {menu.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ApplicationBarButtons
