import React, {ReactNode} from 'react'
import {
  Typography, Button, Icon, Divider,
} from '@mui/material'

import ModalDialog from './ModalDialog'
import FlexRow from './flex-grid/FlexRow'
import {themeColors} from '../theme'
import Spacer from './Spacer'
import theme from '../theme'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingTop: 60,
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'left'
  },

  icon: {
    width: 64,
    height: 64,
    display: 'block',
    marginBottom: 24,
    color: theme.palette.error.main,
  },

  button: {
    marginTop: 32,
    marginBottom: 8,
    color: '#fff'
  },

  buttonRed: {
    backgroundColor: '#EF6A6E',
    marginTop: 32,
    marginBottom: 8,
    color: '#fff'
  },
  button2: {
    color: '#3D3D3D',
  },
}

interface IProps {
  open: boolean;
  topText: string;
  middleText: string;
  proceedText: string;
  cancelText: string;
  onClose?: React.ReactEventHandler<{}>;
  onProceed: () => void;
  onAlternateProceed?: () => void;
  children?: ReactNode;
  height?: number;
  disabled?: boolean;
}

const WarningDialog = (props: IProps) => {
  const {
    open,
    onClose,
    onProceed,
    topText,
    middleText,
    proceedText,
    cancelText,
    children,
    height,
    disabled,
  } = props
  const dialogHeight = height || (children ? 300 : 200)

  return (
    <ModalDialog
      open={open}
      width={510}
      height={dialogHeight}
      onClose={onClose}
      classes={styles.root}
    >
      <Typography variant="h2" gutterBottom>
        {topText}
      </Typography>
      <Divider style={{width: '100%', margin: '12px 0'}}/>
      <Typography variant="body2" gutterBottom>
        {middleText}
      </Typography>
      {children}
      <Divider style={{width: '100%', margin: '12px 0 24px 0'}}/>
      <FlexRow style={{width: '100%'}} justify="flex-end">
        {Boolean(cancelText) && (
          <>
            <Button
              classes={styles.button2}
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Spacer/>
          </>
        )}
        <Button
          variant="contained"
          style={{
            backgroundColor: '#000000',
          }}
          onClick={onProceed}
          disabled={Boolean(disabled)}
          autoFocus
        >
          <FlexRow>
            <Icon style={{color: themeColors.brand[500]}}>check-mark</Icon>
            <Typography variant="body2" style={{color: '#FFFFFF'}}>{proceedText}</Typography>
          </FlexRow>
        </Button>
      </FlexRow>
    </ModalDialog>
  )
}

export default WarningDialog
