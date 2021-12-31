import React from 'react'
import {
  TableCell,
  TableRow,
} from '@mui/material'
import {IGamesRow} from 'Game'
import GamesRowButtons from './GamesRowButtons'

interface IProps {
  game: IGamesRow;
}

const GamesRow = ({game}: IProps) => {
  return (
    <>
      <TableRow>
        <TableCell>
          {game.gameId}
        </TableCell>
        <TableCell>
          {game.gameName}
        </TableCell>
        <TableCell>
          {game.numberOfPlayers}
        </TableCell>
        <TableCell>{game.gameState}</TableCell>
        <GamesRowButtons
          game={game}
        />
      </TableRow>
    </>
  )
}

export default GamesRow
