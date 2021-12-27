import React, { useEffect } from "react";
import { IDispatch } from "General";
import {
  TextField,
  Typography
} from "@mui/material";
import Spacer from "../shared/Spacer";

interface IProps {
  error?: string;
  value: string;
  dispatch: IDispatch;
  disabled: boolean;
}

const EditFieldNumberOfPlayers = ({ error, value, dispatch, disabled }: IProps) => {
  useEffect(() => {
    dispatch({ type: 'playersError', value: Number(value) === 3 || Number(value) === 4 ? '' : 'Must be 3 or 4' });
  }, [dispatch, value]);

  return (
    <>
      <Typography variant={"subtitle1"}>Number of Players</Typography>
      <TextField
        value={value}
        type="number"
        onChange={event => dispatch({ type: 'numberOfPlayers', value: event.target.value })}
        error={Boolean(error)}
        helperText={error}
        disabled={disabled}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditFieldNumberOfPlayers;
