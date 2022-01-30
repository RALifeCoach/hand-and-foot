import React, { memo, useMemo } from 'react'
import { IGamePlay } from 'Game'
import { Button } from '@mui/material'
import useSendMessage from '../hooks/useSendMessage'
import FlexColumn from '../../shared/flex-grid/FlexColumn'
import { createTheme, ThemeProvider } from '@mui/material'
import { green, red } from '@mui/material/colors'

interface IProps {
  gamePlay: IGamePlay;
}

const PlayerAction = ({ gamePlay }: IProps) => {
  const sendMessage = useSendMessage()
  const canDraw = useMemo(() => {
    if (gamePlay.gameState !== 'inPlay' || !gamePlay.currentPlayer.isPlayerTurn) {
      return false
    }
    return gamePlay.currentPlayer.numberOfCardsToDraw > 0 ||
      gamePlay.currentPlayer.numberOfCardsToReplace > 0
  }, [
    gamePlay.gameState,
    gamePlay.currentPlayer.isPlayerTurn,
    gamePlay.currentPlayer.numberOfCardsToDraw,
    gamePlay.currentPlayer.numberOfCardsToReplace
  ])

  const canPlay = gamePlay.gameState === 'inPlay' && gamePlay.currentPlayer.isPlayerTurn

  const themeGreen = createTheme({
    palette: {
      primary: green,
    },
  })

  const themeRed = createTheme({
    palette: {
      primary: red,
    },
  })

  if (canDraw) {
    return (
      <ThemeProvider theme={themeGreen}>
        <Button
          variant="contained"
          color="primary"
          style={{ maxWidth: 60, maxHeight: 60, minWidth: 60, minHeight: 60, marginTop: 24, marginLeft: 8 }}
        >
          <FlexColumn>
            <div style={{ fontSize: 18 }}>Draw</div>
            <div
              style={{ fontSize: 14 }}>
              {gamePlay.currentPlayer.numberOfCardsToDraw + gamePlay.currentPlayer.numberOfCardsToReplace}
            </div>
          </FlexColumn>
        </Button>
      </ThemeProvider>
    )
  }

  if (canPlay) {
    return (
      <ThemeProvider theme={themeGreen}>
        <Button
          variant="contained"
          color="primary"
          style={{ maxWidth: 60, maxHeight: 60, minWidth: 60, minHeight: 60, marginTop: 24, marginLeft: 8 }}
          onClick={(ev) => {
            sendMessage('undo', { override: ev.shiftKey })
          }}
        >
          <div style={{ fontSize: 18 }}>Undo</div>
        </Button>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={themeRed}>
      <Button
        variant="contained"
        color="primary"
        style={{ maxWidth: 60, maxHeight: 60, minWidth: 60, minHeight: 60, marginTop: 24, marginLeft: 8 }}
        onClick={(ev) => {
          if (ev.shiftKey) {
            sendMessage('undo', { override: ev.shiftKey })
          }
        }}
      >
        <div style={{ fontSize: 18 }}>Wait</div>
      </Button>
    </ThemeProvider>
  )
}

export default memo(PlayerAction)
