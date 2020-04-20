/**
 * Loading indicator with mask.
 */

import React from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Modal,
  Typography,
  CircularProgress,
  Paper,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 400,
      height: 80,
      marginTop: -40,
      marginLeft: -200,
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 80,
      alignItems: 'center',
      userSelect: 'none',
      outline: 'none',
    },

    progress: {
      marginRight: theme.spacing(2),
    },
  });

export interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  title?: string;
}

const Loading = (props: IProps) => {
  const { classes, open } = props;
  return (
    <Modal open={open}>
      <Paper className={classes.root}>
        <CircularProgress className={classes.progress} />
        <Typography variant="subtitle1">{props.title || 'Loading...'}</Typography>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(Loading);
