import React, {useState, useMemo} from 'react'
import {IGameRow} from 'Game'
import SitButton from './SitButton'
import SnackAlert from '../shared/SnackAlert'
import {useRecoilValue} from 'recoil'
import {userAtom} from '../atoms/main'
import {User} from 'User'
import useSendMessage from '../Game/hooks/useSendMessage'

interface IProps {
  game: IGameRow;
}

function getTeam(game: IGameRow, user: User, position: number) {
  if (game.numberOfPlayers === 3) {
    return user!.userName
  }
  return position % 2 === 0 ? 'North-South' : 'East-West'
}

const SitButtons = ({game}: IProps) => {
  const user = useRecoilValue(userAtom) as User
  const sendMessage = useSendMessage()

  const [error, setError] = useState('')

  const userPosition = useMemo(() => {
    return Object.keys(game.players || []).find(key =>
      game.players?.[key].playerId === user?.userId)
  }, [game.players, user])

  const handleSit = (position: number) => {
    return () => {
      if (userPosition !== undefined && Number(userPosition) !== position) {
        return setError(`You are already sitting in position ${userPosition}`)
      }
      if (Number(userPosition) !== position && game?.players?.[position]) {
        return setError('someone else is already sitting there')
      }
      sendMessage('addPlayer', {position, teamId: getTeam(game, user, position)})
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
          isCurrentUser={userPosition === '0'}
        />
        {game.numberOfPlayers === 4 && (
          <SitButton
            player={game?.players?.[3]}
            top={44}
            left={-3}
            handleSit={handleSit(3)}
            isPlayerPresent={userPosition !== undefined}
            isCurrentUser={userPosition === '3'}
          />
        )}
        <SitButton
          player={game?.players?.[1]}
          top={44}
          left={100}
          handleSit={handleSit(1)}
          isPlayerPresent={userPosition !== undefined}
          isCurrentUser={userPosition === '1'}
        />
        <SitButton
          player={game?.players?.[2]}
          top={90}
          left={50}
          handleSit={handleSit(2)}
          isPlayerPresent={userPosition !== undefined}
          isCurrentUser={userPosition === '2'}
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
