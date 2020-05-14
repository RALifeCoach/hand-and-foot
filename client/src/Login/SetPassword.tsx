import React, { useCallback, useEffect, useReducer, useState } from "react";
import { IAction } from "General";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import Spacer from "../shared/Spacer";
import useFetchSave from "../hooks/useFetchSave";
import UpdateHandling from "../shared/UpdateHandling";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import SnackMessage from "../shared/SnackMessage";

interface ISetPasswordState {
  new1Password: string;
  new2Password: string;
  new1Error: string;
  new2Error: string;
}

interface IProps {
  id: string;
}

const SetPassword = ({ id }: IProps) => {
  const [openPasswordError, setOpenPasswordError] = useState(false);
  const [state, dispatch] = useReducer((state: ISetPasswordState, action: IAction) => {
    return { ...state, [action.type]: action.value };
  }, {
    new1Password: '',
    new1Error: '',
    new2Password: '',
    new2Error: '',
  } as ISetPasswordState);

  const { new1Password, new1Error, new2Password, new2Error } = state;

  useEffect(() => {
    localStorage.removeItem('handf:user');
  }, []);

  useEffect(() => {
    if (!new1Password) {
      dispatch({ type: 'new1Error', value: 'Required' });
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(new1Password)) {
      dispatch({ type: 'new1Error', value: 'Password too simple' });
      return;
    }
    dispatch({ type: 'new1Error', value: '' });
  }, [dispatch, new1Password]);

  useEffect(() => {
    dispatch({ type: 'new2Error', value: new1Password !== new2Password ? 'Mismatched' : '' });
  }, [dispatch, new1Password, new2Password]);

  const [setPassword, performUpdate] = useFetchSave();
  const handleSet = useCallback((event, state) => {
    event.stopPropagation();
    event.preventDefault();
    const { new1Password, new1Error, new2Error } = state;
    if (new1Error || new2Error) {
      return;
    }
    const body = {
      password: id,
      newPassword: new1Password,
    };
    performUpdate(body, 'setPassword', 'POST');
  }, [performUpdate, id]);

  useEffect(() => {
    debugger;
    if (setPassword.status === 'success') {
      window.location.href = window.location.origin;
    }
  }, [setPassword]);

  useEffect(() => {
    if (setPassword.status === 'failure') {
      setOpenPasswordError(true);
    }
  }, [setPassword]);

  return (
    <>
      <Paper elevation={1} style={{ margin: 'auto', width: 300, padding: 16, marginTop: 200 }}>
        <Typography variant="h2">Toptal Travel Login</Typography>
        <Spacer height={16} />
        <form onSubmit={event => handleSet(event, state)}>
          <FlexColumn>
            <Typography variant={"subtitle1"}>New Password</Typography>
            <TextField
              type="password"
              value={new1Password}
              onChange={event => dispatch({ type: 'new1Password', value: event.target.value })}
              error={Boolean(new1Error)}
              helperText={new1Error}
            />
            <Typography variant="body2">
              The password must be at least 8 characters long and include: 1 lowercase letter, 2 uppercase letter,
              1 number and 1 special character.
            </Typography>
            <Spacer height={16} />
            <Typography variant={"subtitle1"}>Repeat New Password</Typography>
            <TextField
              type="password"
              value={new2Password}
              onChange={event => dispatch({ type: 'new2Password', value: event.target.value })}
              error={Boolean(new2Error)}
              helperText={new2Error}
            />
            <Button
              type="submit"
              variant="outlined"
            >
              LOGIN
            </Button>
          </FlexColumn>
        </form>
      </Paper>
      <UpdateHandling status={setPassword} title="Login..." />
      <SnackMessage
        open={openPasswordError}
        onClose={() => setOpenPasswordError(false)}
        message="This key is already been used."
        type="error"
      />
    </>
  );
};

export default SetPassword;
