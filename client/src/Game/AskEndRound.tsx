import React from "react";
import { User } from "User";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from "@material-ui/core";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";

interface IProps {
  user: User;
  open: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

const AskEndRound = ({ user, open, onClose, refreshUsers }: IProps) => {
  const width = 350;
  const height = 600;
  return (
    <>
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
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
        onClose={onClose}
      >
        <DialogTitle>
          <Typography variant="h2">
            Round End
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{ width: '100%' }} />
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            <Button
              onClick={onClose}
            >
              <Typography variant="subtitle1">Cancel</Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={() => { }}
            >
              <Typography variant="subtitle1">Save</Typography>
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AskEndRound;
