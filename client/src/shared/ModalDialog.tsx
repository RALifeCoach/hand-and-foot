import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import theme from '../theme'

export interface IProps {
  open: boolean;
  width: number;
  height: number;

  // Title of the dialog
  title?: string;

  // Action area in the title
  titleAction?: JSX.Element;

  onClose?: React.ReactEventHandler<{}>;
  classes?: any;
}

const ModalDialog: React.FC<IProps> = props => {
  const {
    open,
    width,
    height,
    onClose,
    children,
    classes,
    title,
    titleAction,
  } = props
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
        <DialogTitle sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: 'relative',
        }}>
          {title}
          {titleAction && <div style={{
            position: 'absolute',
            right: theme.spacing(2),
            top: theme.spacing(2),
          }}>{titleAction}</div>}
        </DialogTitle>
      )}
      <DialogContent classes={{root: classes}}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalDialog
