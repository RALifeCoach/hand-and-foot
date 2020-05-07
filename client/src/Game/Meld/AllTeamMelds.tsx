import React, { useState, useCallback } from 'react';
import { IGame } from 'Game';
import FlexRow from '../../shared/flex-grid/FlexRow';
import TeamMelds from './TeamMelds';
import FlexColumn from '../../shared/flex-grid/FlexColumn';
import useSelectedCards from '../hooks/useSelectedCards';
import useCanPlay from '../hooks/useCanPlay';
import useSendMessage from '../hooks/useSendMessage';
import SnackMessage from '../../shared/SnackMessage';

interface IProps {
  game: IGame;
  selected: { [cardId: string]: boolean };
}

const AllTeamMelds = ({ game, selected }: IProps) => {
  const [error, setError] = useState('');
  const cards = useSelectedCards(game.currentPlayer.cards, selected);
  const getPlayValues = useCanPlay(game, null);
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
            team={game.teams[game.currentPlayer.teamId]}
            game={game}
            isCurrentPlayer={game.currentPlayer.isPlayerTurn}
            selectedCards={cards}
          />
        </div>
        {Object.values(game.teams)
          .filter(team => team.teamId !== game.currentPlayer.teamId)
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
                team={team}
                game={game}
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
