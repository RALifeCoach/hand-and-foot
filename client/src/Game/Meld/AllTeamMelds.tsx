import React, { useState, useCallback } from 'react';
import { IGameBase } from '../../queries/game';
import { IGamePlay } from 'Game';
import FlexRow from '../../shared/flex-grid/FlexRow';
import TeamMelds from './TeamMelds';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import useSelectedCards from '../hooks/useSelectedCards';
import useCanPlay from '../hooks/useCanPlay';
import useSendMessage from '../hooks/useSendMessage';
import SnackAlert from '../../shared/SnackAlert';
import {useRecoilValue} from 'recoil'
import {gameBaseAtom, gamePlayAtom} from '../../atoms/game'

const AllTeamMelds = () => {
  const gamePlay = useRecoilValue(gamePlayAtom) as IGamePlay
  const gameBase = useRecoilValue(gameBaseAtom) as IGameBase
  const [error, setError] = useState('');
  const cards = useSelectedCards(gamePlay.currentPlayer.cards);
  const getPlayValues = useCanPlay(gamePlay, gameBase, null);
  const sendMessage = useSendMessage();

  const handlePlay = useCallback(() => {
    const playValues = getPlayValues(cards);
    if (playValues.error) {
      setError(playValues.error);
      return;
    }
    sendMessage('playCards', { cardIds: cards.map(card => card.cardId), ...playValues })
  }, [getPlayValues, cards, sendMessage]);

  return (
    <>
      <FlexColumn style={{ paddingLeft: 8 }}>
        <div
          style={{
            width: '100%',
            position: 'relative',
          }}
          onClick={handlePlay}
        >
          <TeamMelds
            team={gamePlay.teams[gamePlay.currentPlayer.teamId]}
            isCurrentPlayer={gamePlay.currentPlayer.isPlayerTurn}
            selectedCards={cards}
          />
        </div>
        {Object.values(gamePlay.teams)
          .filter(team => team.teamId !== gamePlay.currentPlayer.teamId)
          .map(team => (
            <FlexRow
              style={{
                width: '100%',
                position: 'relative',
              }}
              key={team.teamId}
            >
              <TeamMelds
                team={team}
                selectedCards={cards}
              />
            </FlexRow>
          ))}
      </FlexColumn>
      <SnackAlert
        open={Boolean(error)}
        text={error}
        severity="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default AllTeamMelds;
