import React, { useContext, useState, useMemo } from 'react';
import { IGameRow } from 'Game';
import MainContext from '../App/MainContext';
import SitButton from './SitButton';
import SnackMessage from '../shared/SnackMessage';

interface IProps {
  game: IGameRow;
}

const SitButtons = ({ game }: IProps) => {
  const { mainDispatch, mainState: { user } } = useContext(MainContext);
  const [error, setError] = useState('');

  const userPosition = useMemo(() => {
    return Object.keys(game.players || []).find(key =>
      game.players?.[key].playerId === user?.userId);
  }, [game.players, user]);

  const handleSit = (position: number) => () => {
    if (userPosition !== undefined && Number(userPosition) !== position) {
      return setError(`You are already sitting in position ${userPosition}`);
    }
    if (!game?.players?.[position]) {
      mainDispatch(
        {
          type: 'play',
          value: {
            gameId: game.gameId,
            position: 1,
            teamId: game.numberOfPlayers === 4 ? 'North-South' : user!.userName
          }
        }
      );
    }
  };

  return (
    <>
      <div style={{ border: '1px solid #000', width: 160, height: 148, display: 'block', position: 'relative' }}>
        <div style={{ backgroundColor: '#000', height: 50, width: 50, position: 'absolute', top: 50, left: 56 }} />
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
      <SnackMessage
        open={Boolean(error)}
        message={error}
        type="error"
        onClose={() => setError('')}
      />
    </>
  )
};

export default SitButtons;
