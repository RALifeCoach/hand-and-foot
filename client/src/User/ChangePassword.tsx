import React, {useCallback, useEffect, useReducer, useState} from "react";
import {IAction} from "General";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";
import Spacer from "../shared/Spacer";
import useFetchSave from "../hooks/useFetchSave";
import Loading from "../shared/Loading";
import SnackAlert from "../shared/SnackAlert";

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IChangePassword {
  oldPassword: string;
  new1Password: string;
  new2Password: string;
  oldError: string;
  new1Error: string;
  new2Error: string;
}

const ChangePassword = ({open, onClose}: IProps) => {
  const [openPasswordError, setOpenPasswordError] = useState(false);
  const [state, dispatch] = useReducer((state: IChangePassword, action: IAction) => {
    return {...state, [action.type]: action.value};
  }, {
    oldPassword: '',
    new1Password: '',
    new2Password: '',
    oldError: '',
    new1Error: '',
    new2Error: '',
  });

  const {oldPassword, new1Password, new2Password, oldError, new1Error, new2Error} = state;

  useEffect(() => {
    dispatch({type: 'oldError', value: Boolean(oldPassword) ? '' : 'Required'});
  }, [dispatch, oldPassword]);

  useEffect(() => {
    if (!new1Password) {
      dispatch({type: 'new1Error', value: 'Required'});
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(new1Password)) {
      dispatch({type: 'new1Error', value: 'Password too simple'});
    }
    dispatch({type: 'new1Error', value: new1Password !== oldPassword ? '' : 'Please use a new password'});
  }, [dispatch, new1Password, oldPassword]);

  useEffect(() => {
    dispatch({type: 'new2Error', value: new1Password !== new2Password ? 'Mismatched' : ''});
  }, [dispatch, new1Password, new2Password]);

  const [status, performUpdate] = useFetchSave();
  const handleUpdate = useCallback((state) => {
    const {oldPassword, new1Password, oldError, new1Error, new2Error} = state;
    if (oldError || new1Error || new2Error) {
      return;
    }
    const body = {
      oldPassword,
      newPassword: new1Password,
    };
    performUpdate(body, 'api/users/changePassword/');
  }, [performUpdate]);

  useEffect(() => {
    if (status.status === 'success') {
      onClose();
    }
  }, [status, onClose]);

  useEffect(() => {
    if (status.status === 'failure') {
      setOpenPasswordError(true);
    }
  }, [status, onClose]);

  const width = 350;
  const height = 600;
  return (
    <>
      <Dialog
        open={open}
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
            Change Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{width: '100%'}}/>
            <Typography variant={"subtitle1"}>Old Password</Typography>
            <TextField
              type="password"
              value={oldPassword}
              onChange={event => dispatch({type: 'oldPassword', value: event.target.value})}
              error={Boolean(oldError)}
              helperText={oldError}
            />
            <Spacer height={16}/>
            <Divider style={{width: '100%'}}/>
            <Spacer height={8}/>
            <Typography variant={"subtitle1"}>New Password</Typography>
            <TextField
              type="password"
              value={new1Password}
              onChange={event => dispatch({type: 'new1Password', value: event.target.value})}
              error={Boolean(new1Error)}
              helperText={new1Error}
            />
            <Typography variant="body2">
              The password must be at least 8 characters long and include: 1 lowercase letter, 2 uppercase letter,
              1 number and 1 special character.
            </Typography>
            <Spacer height={16}/>
            <Typography variant={"subtitle1"}>Repeat New Password</Typography>
            <TextField
              type="password"
              value={new2Password}
              onChange={event => dispatch({type: 'new2Password', value: event.target.value})}
              error={Boolean(new2Error)}
              helperText={new2Error}
            />
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            <Button
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleUpdate(state)}
            >
              Save
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
      <Loading open={status.status === 'in progress'} title="Updating Password..."/>
      <SnackAlert
        open={openPasswordError}
        onClose={() => setOpenPasswordError(false)}
        text="The old password doesn't match."
        severity="error"
      />
    </>
  );
};

export default ChangePassword;
