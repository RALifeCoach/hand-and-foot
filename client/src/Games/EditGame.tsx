import React, {useCallback, useEffect, useReducer} from 'react'
import {IAction} from 'General'
import {IGamesRow} from 'Game'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material'
import FlexColumn from '../shared/flex-grid/FlexColumn'
import FlexRow from '../shared/flex-grid/FlexRow'
import EditFieldName from './EditFieldName'
import EditFieldNumberOfPlayers from './EditFieldNumberOfPlayers'
import {useMutation} from '@apollo/client'
import {CREATE_GAME, UPDATE_GAME} from '../queries/game'
import startGame from '../Game/utils/startGame'

interface IProps {
  game: IGamesRow;
  open: boolean;
  onClose: () => void;
}

interface IEditGameState extends IGamesRow {
  nameError: string;
  playersError: string;
}

const EditGame = ({game, open, onClose}: IProps) => {
  const [state, dispatch] = useReducer((state: IEditGameState, action: IAction) => {
    switch (action.type) {
      case 'gameName':
        return {
          ...state,
          gameName: action.value,
          nameError: !!action.value ? '' : 'Game name is required'
        }
      case 'numberOfPlayers':
        return {
          ...state,
          numberOfPlayers: action.value,
          playersError: !!action.value ? '' : 'Number of players is required'
        }
    }
    return {...state, [action.type]: action.value}
  }, {
    ...game,
    nameError: '',
    playersError: '',
  })

  const {gameId, gameName, nameError, numberOfPlayers, playersError, gameState} = state

  const [performUpdate, {loading: updateLoading}] = useMutation(UPDATE_GAME)
  const [performCreate, {loading: createLoading}] = useMutation(CREATE_GAME)

  const handleUpdate = useCallback(() => {
    if (nameError || playersError) {
      return
    }
    const gameData = startGame(numberOfPlayers)
    if (gameId) {
      performUpdate({
        variables: {id: gameId, name: gameName, rules: gameData.rules}
      })
      return
    }
    performCreate({
      variables: {
        name: gameName, play: gameData.play, rules: gameData.rules, state: gameData.play.gameState
      }
    })
  }, [performUpdate, performCreate, gameId, gameName, nameError, numberOfPlayers, playersError])

  const width = 350
  const height = 600
  return (
    <>
      <Dialog
        open={open}
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
          <Typography>
            {Boolean(gameId) ? 'Edit Game' : 'Add Game'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{width: '100%'}}/>
            <EditFieldName
              error={nameError}
              value={gameName || ''}
              dispatch={dispatch}
            />
            <EditFieldNumberOfPlayers
              error={playersError}
              value={numberOfPlayers.toString() || '4'}
              dispatch={dispatch}
              disabled={Boolean(gameState) && gameState !== 'waitingToStart'}
            />
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            <Button
              onClick={onClose}
              disabled={updateLoading || createLoading}
            >
              <Typography variant="subtitle1">Cancel</Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleUpdate()}
            >
              <Typography variant="subtitle1">Save</Typography>
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditGame
