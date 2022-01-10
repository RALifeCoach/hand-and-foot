import React, {Dispatch, useState} from 'react'
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  Typography
} from '@mui/material'
import Spacer from '../shared/Spacer'
import {IGameDb, IGamesRow, IPlayerDb} from 'Game'
import GamesHeader from './GamesHeader'
import GamesRow from './GamesRow'
import FlexRow from '../shared/flex-grid/FlexRow'
import GamesHeaderButtons from './GamesHeaderButtons'
import ApplicationBar from '../App/ApplicationBar'
import {FETCH_GAMES_FILTERED, FETCH_GAMES_ALL} from '../queries/game'
import {useQuery} from '@apollo/client'

function onGamesCompleted(data: any, setGames: Dispatch<IGamesRow[]>) {
  console.log(data)
  const newData = data.handf_game.map((game: IGameDb) => {
    return {
      gameId: game.gameid,
      gameName: game.gamename,
      gameState: game.gamestate,
      numberOfPlayers: game.numberOfPlayers,
      players: Object.values(game.game_players).map((player: IPlayerDb) => (
        {
          playerId: player.player_id,
          playerName: player.player_name,
          position: player.position
        }
      ))
    } as IGamesRow
  })
  setGames(newData)
}

const STATES = {
  0: [],
  1: ['waitingToStart', 'inPlay', 'waitingToRestart'],
  2: ['finished']
} as { [key: number]: string[] }

const Games = () => {
  const [status, setStatus] = useState(1)
  const [games, setGames] = useState<IGamesRow[]>()

  const {loading: loadingFiltered} = useQuery(FETCH_GAMES_FILTERED, {
      variables: {states: STATES[status]},
      pollInterval: 10000,
      skip: status === 0,
      onCompleted: data => onGamesCompleted(data, setGames)
    }
  )

  const {loading: loadingAll} = useQuery(FETCH_GAMES_ALL, {
      pollInterval: 10000,
      skip: status !== 0,
      onCompleted: data => onGamesCompleted(data, setGames)
    }
  )

  if (loadingFiltered || loadingAll) {
    return <CircularProgress/>
  }

  return (
    <>
      <ApplicationBar
        notifications={false}
      />
      <Paper elevation={1} style={{padding: 16, margin: '96px 16px 16px 16px'}}>
        <FlexRow justify="space-between">
          <Typography variant="h2">Games</Typography>
          <GamesHeaderButtons
            status={status}
            setStatus={setStatus}
          />
        </FlexRow>
        <Spacer height={16}/>
        <Table size="small">
          <GamesHeader/>
          <TableBody>
            {(games ?? []).map((game: IGamesRow) => (
              <GamesRow
                game={game}
                key={game.gameId}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}


export default Games
