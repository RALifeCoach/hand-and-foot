import React, {useState, useMemo} from 'react'
import {IGamesRow} from 'Game'
import SitButton from './SitButton'
import SnackAlert from '../shared/SnackAlert'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {userAtom} from '../atoms/main'
import {User} from 'User'
import { gameIdAtom } from '../atoms/game'
import { useNavigate } from 'react-router-dom'

interface IProps {
  game: IGamesRow;
}

function getTeam(game: IGamesRow, user: User, position: number) {
  if (game.numberOfPlayers === 3) {
    return user.userName
  }
  return position % 2 === 0 ? 'NS' : 'EW'
}

const SitButtons = ({game}: IProps) => {
  const user = useRecoilValue(userAtom) as User
  const setGameId = useSetRecoilState(gameIdAtom)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const userPosition = useMemo(() => {
    if (!Object.keys(user).length) {
      return
    }
    return game.players.find(player => player.playerId === user.id)
  }, [game.players, user])

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
      <div style={{border: '1px solid #000', width: 160, height: 148, display: 'block', position: 'relative'}}>
        <div style={{backgroundColor: '#000', height: 50, width: 50, position: 'absolute', top: 50, left: 56}}/>
        <SitButton
          player={game?.players?.[0]}
          top={-6}
          left={50}
          handleSit={handleSit(0)}
          isPlayerPresent={userPosition !== undefined}
          isCurrentUser={userPosition?.position === 0}
        />
        {game.numberOfPlayers === 4 && (
          <SitButton
            player={game?.players?.[3]}
            top={44}
            left={-3}
            handleSit={handleSit(3)}
            isPlayerPresent={userPosition !== undefined}
            isCurrentUser={userPosition?.position === 3}
          />
        )}
        <SitButton
          player={game?.players?.[1]}
          top={44}
          left={100}
          handleSit={handleSit(1)}
          isPlayerPresent={userPosition !== undefined}
          isCurrentUser={userPosition?.position === 1}
        />
        <SitButton
          player={game?.players?.[2]}
          top={90}
          left={50}
          handleSit={handleSit(2)}
          isPlayerPresent={userPosition !== undefined}
          isCurrentUser={userPosition?.position === 2}
        />
      </div>
      <SnackAlert
        open={!!error}
        onClose={() => setError('')}
        severity="error"
        text={error}
      />
    </>
  )
}

export default SitButtons
