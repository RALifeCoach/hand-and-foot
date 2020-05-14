import React, { useCallback, useEffect, useReducer } from "react";
import { IAction } from "General";
import { IGameRow } from "Game";
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
import UpdateHandling from "../shared/UpdateHandling";
import useFetchSave from "../hooks/useFetchSave";
import EditFieldName from "./EditFieldName";
import EditFieldNumberOfPlayers from "./EditFieldNumberOfPlayers";

interface IProps {
  game: IGameRow;
  open: boolean;
  onClose: () => void;
  refreshGames: () => void;
}

interface IEditGameState extends IGameRow {
  nameError: string;
  playersError: string;
}

const EditGame = ({ game, open, onClose, refreshGames }: IProps) => {
  const [state, dispatch] = useReducer((state: IEditGameState, action: IAction) => {
    return { ...state, [action.type]: action.value };
  }, {
    ...game,
    nameError: '',
    playersError: '',
  });

  const { gameId, gameName, nameError, numberOfPlayers, playersError, gameState } = state;

  useEffect(() => {
    if (!gameName) {
      return dispatch({ type: 'nameError', value: 'Required' });
    }
    dispatch({ type: 'nameError', value: '' });
  }, [dispatch, gameName]);

  const [status, performUpdate] = useFetchSave();
  const handleUpdate = useCallback((state) => {
    if (nameError || playersError) {
      return;
    }
    const body = {
      gameName,
      numberOfPlayers,
    } as IGameRow;
    if (gameId) {
      body.gameId = gameId;
      performUpdate(body, 'api/game/update/');
      return;
    }
    performUpdate(body, 'api/game/create/');
  }, [performUpdate, gameId, gameName, nameError, numberOfPlayers, playersError]);

  useEffect(() => {
    if (status.status) {
      refreshGames();
      onClose();
    }
  }, [status, onClose, refreshGames]);

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
            {Boolean(gameId) ? 'Edit Game' : 'Add Game'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{ width: '100%' }} />
            <EditFieldName
              error={nameError}
              value={gameName || ""}
              dispatch={dispatch}
            />
            <EditFieldNumberOfPlayers
              error={playersError}
              value={numberOfPlayers.toString() || "4"}
              dispatch={dispatch}
              disabled={Boolean(gameState) && gameState !== 'waitingToStart'}
            />
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
              onClick={() => handleUpdate(state)}
            >
              <Typography variant="subtitle1">Save</Typography>
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
      <UpdateHandling status={status} title="Updating Game..." />
    </>
  );
};

export default EditGame;
