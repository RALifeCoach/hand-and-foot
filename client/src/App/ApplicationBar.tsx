import React, { useState } from 'react'
import { AppBar, Button, Popover, Toolbar } from '@mui/material'
import FlexRow from '../shared/flex-grid/FlexRow'
import Notifications from './Notifications'
import ApplicationBarMenu from './ApplicationBarMenu'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms/main'
import { Person } from '@mui/icons-material'
import { User } from 'User'
import { useNavigate } from 'react-router-dom'

interface IProps {
  notifications?: boolean;
}

const ApplicationBar = ({ notifications = false }: IProps) => {
  const [user, setUser] = useRecoilState(userAtom)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const doLogout = () => {
    setUser({} as User)
    localStorage.clear()
    navigate('/login')
  }

  return (
    <>
      <AppBar position="static" style={{ width: '100%' }}>
        <Toolbar style={{ width: '100%' }}>
          <FlexRow justify="space-between" className="w-full">
            <ApplicationBarMenu/>
            <div className="text-xl font-semibold text-white mt-6">
              Hand & Foot (brought to the family by Bob White)
            </div>
            <div className="flex gap-3">
              {notifications
                ? (
                  <Notifications/>
                )
                : (
                  <div/>
                )
              }
              {Object.keys(user).length && (
                <Button onClick={event => setAnchorEl(event.currentTarget)}>
                  <div className="text-white">
                    <Person color="inherit"/>
                  </div>
                </Button>
              )}
            </div>
          </FlexRow>
        </Toolbar>
      </AppBar>
      {anchorEl && (
        <Popover
          open={true}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div>
            <Button
              onClick={doLogout}
              color="primary"
              variant="contained">
              Logout
            </Button>
          </div>
        </Popover>
      )}
    </>
  )
}

export default ApplicationBar
