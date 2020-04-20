import React from 'react';
import classNames from 'classnames';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {},

    title: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'relative',
    },

    content: {
      paddingBottom: 0,
    },

    titleAction: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2),
    },
  });

export interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  width: number;
  height: number;

  // Title of the dialog
  title?: string;

  // Action area in the title
  titleAction?: JSX.Element;

  onClose?: React.ReactEventHandler<{}>;
  className?: string;
}

const ModalDialog: React.FC<IProps> = props => {
  const {
    classes,
    open,
    width,
    height,
    onClose,
    children,
    className,
    title,
    titleAction,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
    >
      {title && (
        <DialogTitle className={classes.title}>
          {title}
          {titleAction && <div className={classes.titleAction}>{titleAction}</div>}
        </DialogTitle>
      )}
      <DialogContent className={classNames(classes.content, className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(ModalDialog);
