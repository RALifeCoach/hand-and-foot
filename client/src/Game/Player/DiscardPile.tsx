import React, { memo, useCallback } from "react";
import { IGame } from "Game";
import useCanDiscard from "../hooks/useCanDiscard";
import PlayingCard from '../PlayingCard/PlayingCard';
import useCanDrawFromPile from "../hooks/useCanDrawFromPile";
import useSendMessage from "../hooks/useSendMessage";

interface IProps {
  game: IGame;
  selected: {[cardId: string]: boolean};
}

const DiscardPile = ({ game, selected }: IProps) => {
  const toDiscard = useCanDiscard(game, selected);
  const canDraw7 = useCanDrawFromPile(game);
  const sendMessage = useSendMessage();

  const handleClick = useCallback(() => {
    if (toDiscard) {
      sendMessage('discardCard', { toDiscard: toDiscard.cardId });
      return;
    }
    if (canDraw7) {
      sendMessage('draw7', {});
    }
  }, [toDiscard, canDraw7, sendMessage]);

  return (
    <div style={{ position: 'relative', width: 80, display: 'inline-block' }} >
      <PlayingCard
        card={game.discardCard === null ? { cardText: 'Empty.' } : game.discardCard}
        imageLocation={''}
        left={0}
        top={0}
        onSelect={handleClick}
      />
    </div>
  );
};

export default memo(DiscardPile);
