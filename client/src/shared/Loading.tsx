/**
 * Loading indicator with mask.
 */

import React from 'react';
import {
  Modal,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
//
// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       width: 400,
//       height: 80,
//       marginTop: -40,
//       marginLeft: -200,
//       padding: theme.spacing(2),
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'flex-start',
//       paddingLeft: 80,
//       alignItems: 'center',
//       userSelect: 'none',
//       outline: 'none',
//     },
//
//     progress: {
//       marginRight: theme.spacing(2),
//     },
//   });

export interface IProps {
  open: boolean;
  title?: string;
}

const Loading = (props: IProps) => {
  const { open } = props;
  return (
    <Modal open={open}>
      <Paper>
        <CircularProgress />
        <Typography variant="subtitle1">{props.title || 'Loading...'}</Typography>
      </Paper>
    </Modal>
  );
};

export default Loading;
