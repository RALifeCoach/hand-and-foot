import React, { useCallback, useEffect, useReducer } from "react";
import { IAction } from "General";
import { Button, Paper, TextField, Typography } from "@mui/material";
import FlexRow from "../shared/flex-grid/FlexRow";
import Spacer from "../shared/Spacer";
import useFetchSave from "../hooks/useFetchSave";
import UpdateHandling from "../shared/UpdateHandling";
import {useSetRecoilState} from 'recoil'
import {userAtom} from '../atoms/main'
import { useNavigate } from 'react-router-dom'

interface ILoginState {
  userId: string;
  idError: string;
  password: string;
  passwordError: string;
}

const Login = () => {
  const [state, dispatch] = useReducer((state: ILoginState, action: IAction) => {
    return { ...state, [action.type]: action.value };
  }, {
    userId: '',
    idError: '',
    password: '',
    passwordError: '',
  } as ILoginState);
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate()

  const { userId, idError, password, passwordError } = state;

  useEffect(() => {
    dispatch({ type: 'idError', value: userId ? '' : 'Required' });
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch({ type: 'passwordError', value: password ? '' : 'Required' });
  }, [password, dispatch]);

  const [login, performLogin] = useFetchSave();

  const handleLogin = useCallback((event: any) => {
    event.preventDefault();
    if (!idError && !passwordError) {
      performLogin({ userId, password }, '/api/login/login')
    }
  }, [userId, idError, password, passwordError, performLogin]);

  useEffect(() => {
    if (login.status === 'success') {
      sessionStorage.setItem('handf:user', JSON.stringify(login.response));
      setUser(login.response)
      navigate('/games', { replace: true })
    }
  }, [login, setUser, navigate]);

  return (
    <>
      <Paper elevation={1} style={{ margin: 'auto', width: 300, padding: 16, marginTop: 200 }}>
        <Typography variant="h2">Hand and Foot Login</Typography>
        <Spacer height={16} />
        <form onSubmit={handleLogin}>
          <FlexRow>
            <div style={{ width: 100 }}>
              <Typography variant="subtitle1">User Id</Typography>
            </div>
            <Spacer />
            <TextField
              type="text"
              onChange={event => dispatch({ type: 'userId', value: event.target.value })}
              value={userId}
              error={Boolean(idError)}
              helperText={idError}
            />
          </FlexRow>
          <Spacer height={16} />
          <FlexRow>
            <div style={{ width: 100 }}>
              <Typography variant="subtitle1">Password</Typography>
            </div>
            <Spacer />
            <TextField
              type="password"
              onChange={event => dispatch({ type: 'password', value: event.target.value })}
              value={password}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
          </FlexRow>
          <Spacer height={16} />
          <Button
            type="submit"
            variant="outlined"
          >
            <Typography variant="subtitle1">LOGIN</Typography>
          </Button>
        </form>
      </Paper>
      <UpdateHandling status={login} title="Login..." />
    </>
  );
};

export default Login;
