import React, { Dispatch } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { IGamesRow } from 'Game'

interface Props {
  game: IGamesRow
  setOpenEdit: Dispatch<boolean>
  setOpenDelete: Dispatch<boolean>
}

const GameIcons = ({ game, setOpenEdit, setOpenDelete }: Props): JSX.Element => {
  if (game.gameState === 'waitingToStart') {
    return (
      <div className="flex justify-between">
        <IconButton
          onClick={() => setOpenEdit(true)}
        >
          <Tooltip
            title="Edit"
            placement="top"
            arrow
          >
            <div className="text-white">
              <Edit
                color="inherit"
                style={{ width: 20, height: 20 }}
              />
            </div>
          </Tooltip>
        </IconButton>
        <IconButton
          onClick={() => setOpenDelete(true)}
        >
          <Tooltip
            placement="top"
            title="Delete"
            arrow
          >
            <div className="text-white">
              <Delete
                color="inherit"
                style={{ width: 20, height: 20 }}
              />
            </div>
          </Tooltip>
        </IconButton>
      </div>
    )
  }
  if (game.gameState === 'finished') {
    return (
      <IconButton
        onClick={() => setOpenDelete(true)}
      >
        <Tooltip
          placement="top"
          title="Delete"
          arrow
        >
          <div className="text-white">
            <Delete
              color="inherit"
              style={{ width: 30, height: 30 }}
            />
          </div>
        </Tooltip>
      </IconButton>
    )
  }
  return <div/>
}

export default GameIcons
