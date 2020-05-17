import React, { useCallback, useEffect, useReducer } from "react";
import { IAction } from "General";
import { User } from "User";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from "@material-ui/core";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";
import UpdateHandling from "../shared/UpdateHandling";
import Spacer from "../shared/Spacer";
import useFetchSave from "../hooks/useFetchSave";
import SelectField from "../shared/SelectField";
import { v4 as uuidV4 } from 'uuid';

interface IProps {
  user: User;
  open: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

interface IEditUserState extends User {
  emailError: string;
  nameError: string;
  roleError: string;
}

const AskEndRound = ({ user, open, onClose, refreshUsers }: IProps) => {
  const [state, dispatch] = useReducer((state: IEditUserState, action: IAction) => {
    return { ...state, [action.type]: action.value };
  }, {
    ...user,
    emailError: '',
    nameError: '',
    roleError: '',
  });

  const { userId, userEmail, emailError, userName, nameError, role, roleError } = state;

  useEffect(() => {
    if (!userEmail) {
      dispatch({ type: 'emailError', value: 'Required' });
      return;
    }
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    dispatch({ type: 'emailError', value: validEmail || userEmail === 'admin' ? '' : 'Not a valid email' });
  }, [dispatch, userEmail]);

  useEffect(() => {
    dispatch({ type: 'nameError', value: Boolean(userName) ? '' : 'Required' });
  }, [dispatch, userName]);

  useEffect(() => {
    dispatch({ type: 'roleError', value: Boolean(role) ? '' : 'Required' });
  }, [dispatch, role]);

  const [status, performUpdate] = useFetchSave();
  const handleUpdate = useCallback((state) => {
    const { userId, userEmail, emailError, userName, nameError, role, roleError } = state;
    if (emailError || nameError || roleError) {
      return;
    }
    const body = {
      userEmail,
      userName,
      role,
    } as any;
    if (userId) {
      body.userId = userId;;
    } else {
      body.password = uuidV4().toString();
      alert(`For initial login use url: ${window.location.origin}/?id=${body.password}`);
    }
    performUpdate(body, 'api/users/update/');
  }, [performUpdate]);

  useEffect(() => {
    if (status.status) {
      refreshUsers();
      onClose();
    }
  }, [status, onClose, refreshUsers]);

  const width = 350;
  const height = 600;
  return (
    <>
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{
          style: {
            width,
            height,
            maxWidth: width,
            maxHeight: height,
            minWidth: width,
            minHeight: height,
          },
        }}
        onClose={onClose}
      >
        <DialogTitle>
          <Typography variant="h2">
            {Boolean(userId) ? 'Edit User' : 'Add User'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{ width: '100%' }} />
            <Typography variant={"subtitle1"}>User Email</Typography>
            <TextField
              value={userEmail}
              onChange={event => dispatch({ type: 'userEmail', value: event.target.value })}
              error={Boolean(emailError)}
              helperText={emailError}
              disabled={userEmail === 'admin'}
            />
            <Spacer height={16} />
            <Typography variant={"subtitle1"}>User Name</Typography>
            <TextField
              value={userName}
              onChange={event => dispatch({ type: 'userName', value: event.target.value })}
              error={Boolean(nameError)}
              helperText={nameError}
            />
            <Spacer height={16} />
            <Typography variant={"subtitle1"}>Role</Typography>
            <SelectField
              value={role}
              onChange={value => dispatch({ type: 'role', value })}
              error={roleError}
              options={[
                {
                  value: 'general',
                  label: 'General',
                },
                {
                  value: 'admin',
                  label: 'User Admin',
                },
                {
                  value: 'super',
                  label: 'Super',
                },
              ]}
            />
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            <Button
              onClick={onClose}
            >
              <Typography variant="subtitle1">Cancel</Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleUpdate(state)}
            >
              <Typography variant="subtitle1">Save</Typography>
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
      <UpdateHandling status={status} title="Updating Travel..." />
    </>
  );
};

export default AskEndRound;
