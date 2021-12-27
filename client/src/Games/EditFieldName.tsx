import React, { useEffect } from "react";
import { IDispatch } from "General";
import {
  TextField,
  Typography
} from "@mui/material";
import Spacer from "../shared/Spacer";

interface IProps {
  value: string;
  dispatch: IDispatch;
  error?: string;
}

const EditFieldName = ({ value, dispatch }: IProps) => {
  useEffect(() => {
    dispatch({ type: 'nameError', value: Boolean(value) ? '' : 'Required' });
  }, [dispatch, value]);

  return (
    <>
      <Typography variant={"subtitle1"}>Game Name</Typography>
      <TextField
        value={value}
        onChange={event => dispatch({ type: 'gameName', value: event.target.value })}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditFieldName;
