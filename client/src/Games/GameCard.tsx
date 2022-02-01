import React, { useState, useMemo, useCallback } from 'react'
import { IGamesRow } from 'Game'
import SitButton from './SitButton'
import SnackAlert from '../shared/SnackAlert'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '../atoms/main'
import { User } from 'User'
import { gameIdAtom } from '../atoms/game'
import { useNavigate } from 'react-router-dom'
import WarningDialog from '../shared/WarningDialog'
import EditGame from './EditGame'
import useFetchSave from '../hooks/useFetchSave'
import UpdateHandling from '../shared/UpdateHandling'
import GameIcons from './GameIcons'

interface IProps {
  game: IGamesRow;
}

function getTeam(game: IGamesRow, user: User, position: number) {
  if (game.numberOfPlayers === 3) {
    return user.userName
  }
  return position % 2 === 0 ? 'NS' : 'EW'
}

const STATUS_CONVERT = {
  inPlay: 'Playing',
  waitingToStart: 'Starting',
  waitingToRestart: 'Playing',
  finished: 'Done'
} as {[key: string]: string}

const GameCard = ({ game }: IProps) => {
  const user = useRecoilValue(userAtom) as User
  const setGameId = useSetRecoilState(gameIdAtom)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const userPosition = useMemo(() => {
    if (!Object.keys(user).length) {
      return
    }
    return game.players.find(player => player.playerId === user.id)
  }, [game.players, user])

  const [deleteStatus, performDelete] = useFetchSave()
  const handleDelete = useCallback(() => {
    const body = { gameId: game.gameId }
    performDelete(body, 'api/game/delete')
  }, [game, performDelete])

  const handleSit = (position: number) => {
    return () => {
      if (userPosition && userPosition.position !== position) {
        return setError(`You are already sitting in position ${userPosition.position}`)
      }
      const currentPlayer = game.players.find(player => player.position === position)
      if (userPosition?.position !== position && !!currentPlayer) {
        return setError('someone else is already sitting there')
      }
      const teamId = getTeam(game, user, position)
      setGameId(game.gameId as number)
      navigate(`/game/${game.gameId}/${position}/${teamId}`)
    }
  }

  return (
    <>
      <div
        className="border border-black w-72 h-72 relative pb-8"
      >
        <div className="flex justify-between h-full w-full">
          <div className="flex flex-col justify-center">
            {game.numberOfPlayers === 4 ? (
              <SitButton
                player={game?.players?.[3]}
                handleSit={handleSit(3)}
                isPlayerPresent={userPosition !== undefined}
                isCurrentUser={userPosition?.position === 3}
              />
            ) : (
              <div/>
            )}
          </div>
          <div className="flex flex-col justify-between items-center">
            <SitButton
              player={game?.players?.[0]}
              handleSit={handleSit(0)}
              isPlayerPresent={userPosition !== undefined}
              isCurrentUser={userPosition?.position === 0}
            />
            <div className="w-20 h-20 block bg-gray-600 flex flex-col justify-between items-center">
              <GameIcons game={game} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/>
              <div className="text-white">
                {STATUS_CONVERT[game.gameState as string] ?? game.gameState}
              </div>
            </div>
            <SitButton
              player={game?.players?.[2]}
              handleSit={handleSit(2)}
              isPlayerPresent={userPosition !== undefined}
              isCurrentUser={userPosition?.position === 2}
            />
          </div>
          <div className="flex flex-col justify-center">
            <SitButton
              player={game?.players?.[1]}
              handleSit={handleSit(1)}
              isPlayerPresent={userPosition !== undefined}
              isCurrentUser={userPosition?.position === 1}
            />
          </div>
        </div>
        <div className="absolute bottom-0 text-2xl w-full flex justify-center">
          <div>{game.gameName}</div>
        </div>
      </div>
      <SnackAlert
        open={!!error}
        onClose={() => setError('')}
        severity="error"
        text={error}
      />
      <UpdateHandling status={deleteStatus} title="Deleting game"/>
      <WarningDialog
        open={openDelete}
        topText="Warning: Delete Game"
        middleText={`Are you sure you want to delete this game?`}
        proceedText="Delete"
        cancelText="Return"
        onClose={() => setOpenDelete(false)}
        onProceed={handleDelete}
        height={250}
      />
      {openEdit && (
        <EditGame
          game={game}
          open={true}
          onClose={() => setOpenEdit(false)}
        />
      )}
    </>
  )
}

export default GameCard
