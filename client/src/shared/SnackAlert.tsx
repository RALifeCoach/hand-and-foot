import React from 'react'
import {Alert, Snackbar} from '@mui/material'

interface Props {
  open: boolean
  text: string
  severity: 'error' | 'warning'
  onClose: Function
}

const SnackAlert = ({open, text, severity, onClose}: Props): JSX.Element => {
  return (
    <Snackbar
      open={open}
      onClose={() => onClose()}
    >
      <Alert
        severity={severity}
      >{text}</Alert>
    </Snackbar>
  )
}

export default SnackAlert
