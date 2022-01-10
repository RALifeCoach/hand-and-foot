import React, {useCallback, useEffect, useState} from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  Tooltip,
} from '@mui/material'
import {Delete, Edit, VpnKey} from '@mui/icons-material'
import Spacer from '../shared/Spacer'
import {User} from 'User'
import FlexRow from '../shared/flex-grid/FlexRow'
import WarningDialog from '../shared/WarningDialog'
import useFetchSave from '../hooks/useFetchSave'
import EditUser from './EditUser'
import Loading from '../shared/Loading'
import {v4 as uuidV4} from 'uuid'
import SnackAlert from '../shared/SnackAlert'

interface IProps {
  user: User;
  refreshUsers: () => void;
}

const UsersRowButtons = ({user, refreshUsers}: IProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openReset, setOpenReset] = useState(false)
  const [openDeleteError, setOpenDeleteError] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const [deleteStatus, performDelete] = useFetchSave()
  const [resetStatus, performReset] = useFetchSave()
  const handleDelete = useCallback(() => {
    const body = {id: user.id}
    performDelete(body, 'api/users/delete')
  }, [user, performDelete])

  const handleReset = useCallback(() => {
    const body = {
      id: user?.id || 0,
      password: uuidV4().toString(),
    }
    alert(`To reset the password use url: ${window.location.origin}/?id=${body.password}`)
    performReset(body, 'api/users/resetPassword')
  }, [user, performReset])

  useEffect(() => {
    if (deleteStatus.status === 'success') {
      refreshUsers()
      setOpenDelete(false)
    }
    if (deleteStatus.status === 'failure') {
      setOpenDelete(false)
      setOpenDeleteError(true)
    }
  }, [deleteStatus, refreshUsers])

  useEffect(() => {
    if (resetStatus.status === 'success') {
      setOpenReset(false)
    }
  }, [resetStatus])

  return (
    <>
      <TableCell>
        <FlexRow>
          <IconButton
            onClick={() => setOpenEdit(true)}
          >
            <Tooltip
              title="Edit"
              placement="top"
              arrow
            >
              <Edit style={{width: 30, height: 30}}/>
            </Tooltip>
          </IconButton>
          {user.userEmail !== 'admin' && (
            <>
              <Spacer/>
              <IconButton
                onClick={() => setOpenDelete(true)}
              >
                <Tooltip
                  placement="top"
                  title="Delete"
                  arrow
                >
                  <Delete style={{width: 30, height: 30}}/>
                </Tooltip>
              </IconButton>
            </>
          )}
          <Spacer/>
          <IconButton
            onClick={() => setOpenReset(true)}
          >
            <Tooltip
              placement="top"
              title="Reset"
              arrow
            >
              <VpnKey style={{width: 30, height: 30}}/>
            </Tooltip>
          </IconButton>
        </FlexRow>
      </TableCell>
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
        <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
        <MenuItem onClick={() => setOpenDelete(true)}>Delete</MenuItem>
        <MenuItem onClick={() => setOpenReset(true)}>Password Reset</MenuItem>
      </Menu>
      <WarningDialog
        open={openDelete}
        topText="Warning: Delete User"
        middleText={`Are you sure you want to delete this user?`}
        proceedText="Delete"
        cancelText="Return"
        onClose={() => setOpenDelete(false)}
        onProceed={handleDelete}
        height={250}
      />
      <WarningDialog
        open={openReset}
        topText="Warning: Reset User"
        middleText={`Are you sure you want to reset the password for this user?`}
        proceedText="Reset"
        cancelText="Return"
        onClose={() => setOpenReset(false)}
        onProceed={handleReset}
        height={250}
      />
      {openEdit && (
        <EditUser
          user={user}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          refreshUsers={refreshUsers}
        />
      )}
      <Loading open={deleteStatus === 'in progress'} title="Deleting trip"/>
      <SnackAlert
        open={openDeleteError}
        text="This user has associated games. Delete their games before deleting the user." severity="error"
        onClose={() => setOpenDeleteError(false)}
      />
    </>
  )
}

export default UsersRowButtons
