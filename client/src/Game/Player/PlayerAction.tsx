import React, { memo, useMemo } from 'react'
import { IGamePlay } from 'Game'
import { Button, Tooltip } from '@mui/material'
import useSendMessage from '../hooks/useSendMessage'
import FlexColumn from '../../shared/flex-grid/FlexColumn'
import { createTheme, ThemeProvider } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Hotel, Undo } from '@mui/icons-material'
import death from '../../assets/death.svg'

interface IProps {
  gamePlay: IGamePlay;
}

const PlayerAction = ({ gamePlay }: IProps) => {
  const sendMessage = useSendMessage()
  const isStarted = gamePlay.gameState !== 'waitingToStart'
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

  const firstButton = () => {
    if (!isStarted) {
      return <div/>
    }
    if (canDraw) {
      return (
        <ThemeProvider theme={themeGreen}>
          <Button
            variant="contained"
            color="primary"
            style={{ maxWidth: 60, maxHeight: 40, minWidth: 60, minHeight: 40 }}
          >
            <FlexColumn>
              <div style={{ fontSize: 18 }}>Draw</div>
              <div
                style={{ fontSize: 14, marginTop: -10 }}>
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
          <Tooltip title="Undo">
            <Button
              variant="contained"
              color="primary"
              style={{ maxWidth: 60, maxHeight: 40, minWidth: 60, minHeight: 40 }}
              onClick={(ev) => {
                sendMessage('undo', { override: ev.shiftKey })
              }}
            >
              <div className="text-xl text-white"><Undo color="inherit"/></div>
            </Button>
          </Tooltip>
        </ThemeProvider>
      )
    }

    return (
      <ThemeProvider theme={themeRed}>
        <Tooltip title="Not your turn">
          <Button
            variant="contained"
            color="primary"
            style={{ maxWidth: 60, maxHeight: 40, minWidth: 60, minHeight: 40 }}
            onClick={(ev) => {
              if (ev.shiftKey) {
                sendMessage('undo', { override: ev.shiftKey })
              }
            }}
          >
            <div className="text-xl text-white"><Hotel color="inherit"/></div>
          </Button>
        </Tooltip>
      </ThemeProvider>
    )
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {firstButton()}
      {isStarted && (
        <Button
          style={{ maxWidth: 60, maxHeight: 40, minWidth: 60, minHeight: 40 }}
          onClick={(ev) => {
            if (ev.shiftKey) {
              sendMessage('undo', { override: ev.shiftKey })
            }
          }}
        >
          <Tooltip title="resign">
            <img src={death} alt="resign"/>
          </Tooltip>
        </Button>
      )}
    </div>
  )
}

export default memo(PlayerAction)
