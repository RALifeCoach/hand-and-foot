import React, { memo, useCallback, useState } from "react";
import { IGame } from "Game";
import useCanDiscard from "../hooks/useCanDiscard";
import PlayingCard from '../PlayingCard/PlayingCard';
import useCanDrawFromPile from "../hooks/useCanDrawFromPile";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedCards from "../hooks/useSelectedCards";
import SnackMessage from "../../shared/SnackMessage";

interface IProps {
  game: IGame;
  selected: { [cardId: string]: boolean };
}

const DiscardPile = ({ game, selected }: IProps) => {
  const canDiscard = useCanDiscard(game, selected);
  const canDraw7 = useCanDrawFromPile(game);
  const sendMessage = useSendMessage();
  const selectedCards = useSelectedCards(game.currentPlayer.cards, selected);
  const [error, setError] = useState('');

  const handleClick = useCallback(() => {
    if (canDraw7) {
      sendMessage('draw7', {});
      return;
    }
    const message = canDiscard();
    if (!message) {
      sendMessage('discardCard', { toDiscard: selectedCards[0].cardId });
      return;
    } else {
      setError(message);
    }
  }, [canDiscard, canDraw7, sendMessage, selectedCards]);

  return (
    <>
      <div style={{ position: 'relative', zIndex: 500 }} >
        <PlayingCard
          card={game.discardCard === null ? { cardText: 'Empty' } : game.discardCard}
          imageLocation="below"
          left={0}
          top={0}
          onSelect={handleClick}
        />
      </div>
      <SnackMessage
        open={Boolean(error)}
        message={error}
        type="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default memo(DiscardPile);
