import React, {ReactNode} from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography, Button, Icon, Divider,
} from '@material-ui/core';

import ModalDialog from "./ModalDialog";
import FlexRow from "./flex-grid/FlexRow";
import {themeColors} from "../theme";
import Spacer from "./Spacer";

const styles = (theme: Theme) =>
  createStyles({
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
  });

interface IProps extends WithStyles<typeof styles> {
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
    classes,
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
  } = props;
  const dialogHeight = height || (children ? 300 : 200);

  return (
    <ModalDialog
      open={open}
      width={510}
      height={dialogHeight}
      onClose={onClose}
      className={classes.root}
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
              className={classes.button2}
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
  );
};

export default withStyles(styles)(WarningDialog);
