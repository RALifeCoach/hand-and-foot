import React, {memo} from 'react';
import {
  Theme,
} from '@material-ui/core';

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: '#FF0000',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(2),
  },
}));

type SnackType = 'info' | 'error';

interface IProps {
  open: boolean;
  onClose?: React.ReactEventHandler<{}>;
  message: string;
  type: SnackType;
  duration?: number;
}

const SnackMessage = (props: IProps) => {
  const {open, onClose, message, duration, type} = props;
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={duration || 5000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[type]}
        aria-describedby="client-snackbar"
        message={(
          <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)}/>
            {message}
            </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon}/>
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default memo(SnackMessage);
