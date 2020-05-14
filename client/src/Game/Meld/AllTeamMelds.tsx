import React, { useState, useCallback } from 'react';
import { IGamePlay, IGameBase } from 'Game';
import FlexRow from '../../shared/flex-grid/FlexRow';
import TeamMelds from './TeamMelds';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import useSelectedCards from '../hooks/useSelectedCards';
import useCanPlay from '../hooks/useCanPlay';
import useSendMessage from '../hooks/useSendMessage';
import SnackMessage from '../../shared/SnackMessage';

interface IProps {
  gamePlay: IGamePlay;
  gameBase: IGameBase;
  selected: { [cardId: string]: boolean };
}

const AllTeamMelds = ({ gamePlay, gameBase, selected }: IProps) => {
  const [error, setError] = useState('');
  const cards = useSelectedCards(gamePlay.currentPlayer.cards, selected);
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
            gameBase={gameBase}
            team={gamePlay.teams[gamePlay.currentPlayer.teamId]}
            gamePlay={gamePlay}
            isCurrentPlayer={gamePlay.currentPlayer.isPlayerTurn}
            selectedCards={cards}
          />
        </div>
        {Object.values(gamePlay.teams)
          .filter(team => team.teamId !== gamePlay.currentPlayer.teamId)
          .map(team => (
            <FlexRow
              style={{
                height: 120,
                width: '100%',
                position: 'relative',
              }}
              key={team.teamId}
            >
              <TeamMelds
                gameBase={gameBase}
                team={team}
                gamePlay={gamePlay}
                selectedCards={cards}
              />
            </FlexRow>
          ))}
      </FlexColumn>
      <SnackMessage
        open={Boolean(error)}
        message={error}
        type="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default AllTeamMelds;
