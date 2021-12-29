import React, {Dispatch, useState} from 'react'
import {Button, FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import EditGame from './EditGame'
import {Add} from '@mui/icons-material'

interface IProps {
  refreshGames: () => void;
  status: number
  setStatus: Dispatch<number>
}

const GamesHeaderButtons = ({refreshGames, status, setStatus}: IProps) => {
  const [newOpen, setNewOpen] = useState(false)

  return (
    <div className="flex gap-8">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={ev => setStatus(parseInt(ev.target.value as string || '0'))}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Unfinished</MenuItem>
          <MenuItem value={2}>Finished</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={() => setNewOpen(true)}
        variant="contained"
        color="success"
        startIcon={<Add />}
      >
        New Game
      </Button>
      {newOpen && (
        <EditGame
          game={{gameName: '', numberOfPlayers: 4}}
          open={newOpen}
          onClose={() => setNewOpen(false)}
          refreshGames={refreshGames}
        />
      )}
    </div>
  )
}

export default GamesHeaderButtons
