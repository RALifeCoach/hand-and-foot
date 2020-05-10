import React, { memo } from 'react';
import { CSSProperties } from "react";
import { FormControl, FormHelperText, makeStyles, MenuItem, Select } from "@material-ui/core";
import { IOption } from "General";

interface IFieldProps {
  columnClass?: string;
  style?: CSSProperties;
  value: any;
  error?: string;
  disabled?: boolean;
  onChange: (text: string) => void;
  options: IOption[];
}

const useStyles = makeStyles({
  outlined: {
    padding: '4px 30px 4px 8px'
  }
});

const SelectField = (props: IFieldProps) => {
  const {
    columnClass,
    style,
    value,
    error,
    disabled,
    onChange,
    options,
  } = props;
  const classes = useStyles();
  const myStyle = style || {};
  if (Boolean(error)) {
    myStyle.borderColor = 'red';
  }

  return (
    <FormControl
      variant="outlined"
      className={columnClass}
      style={myStyle}
      error={Boolean(error)}
    >
      <Select
        value={value}
        onChange={(event: any) => {
          event.stopPropagation();
          onChange(event.target.value);
        }}
        disabled={disabled}
        style={{ marginTop: 0 }}
        classes={{
          outlined: classes.outlined
        }}
      >
        {options.map((option, index) => (
          <MenuItem value={option.value as string | number} key={(option.value as string | number) || index}>{option.label}</MenuItem>
        ))}
      </Select>
      {Boolean(error) && (
        <FormHelperText>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(SelectField);
