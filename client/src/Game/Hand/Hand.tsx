import React, { useContext, useState, useEffect } from 'react';
import PlayingCard from '../PlayingCard/PlayingCard';
import FlexRow from "../../shared/flex-grid/FlexRow";
import { ICard } from "Game";
import GameContext from '../GameContext';
import SortButtons from './SortButtons';
import useSelectedCards from '../hooks/useSelectedCards';
import useSendMessage from '../hooks/useSendMessage';

const DEFAULTS = {
  offset: 20,
  sortColor: 'grey'
};

interface IProps {
  options: any;
  cards: ICard[];
  selected: { [cardId: string]: boolean }
  sortOrder: string;
  cardMoving: ICard | null;
}

const Hand = ({ options, cards, selected, sortOrder, cardMoving }: IProps) => {
  const { gameDispatch, gameId, playerId } = useContext(GameContext);
  const [magicCard, setMagicCard] = useState(0);
  const config = Object.assign({}, DEFAULTS, options);
  const sendMessage = useSendMessage();

  const countSelectedCards = useSelectedCards(cards, selected).length;
  const showIcons = countSelectedCards === 1;
  const movable = showIcons && !cardMoving;


  useEffect(() => {
    console.log('magic', magicCard);
  }, [magicCard]);

  return (
    <FlexRow>
      <SortButtons
        gameDispatch={gameDispatch}
        sortOrder={sortOrder}
        config={config}
        gameId={gameId}
        playerId={playerId}
      />
      <FlexRow>
        <div
          style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: '100%' }}
        >
          <div
            style={{
              width: config.offset * (cardMoving ? cards.length + 1 : cards.length - 1) + 70,
              position: 'relative'
            }}
          >
            {cards.map((card: ICard, cardIndex: number) => (
              <PlayingCard
                card={card}
                selected={Boolean(selected[card.cardId])}
                imageLocation={'below'}
                left={cardIndex * config.offset + (cardMoving && cardIndex >= magicCard ? config.offset : 0)}
                showIcons={showIcons}
                onSelect={() => {
                  gameDispatch({ type: 'select', value: card });
                }}
                onPinned={movable ? () => sendMessage('setPin', { cardId: card.cardId }) : undefined}
                onMoved={movable ? () => {
                  gameDispatch({ type: 'cardMoving', value: card });
                  setMagicCard(cardIndex);
                } : undefined}
                onMouseEnter={Boolean(cardMoving) ? () => {
                  setMagicCard(cardIndex);
                } : undefined}
                key={card.cardId}
              />
            ))}
            {cardMoving && (
              <PlayingCard
                card={{ cardText: 'Move to front of hand.' }}
                imageLocation={''}
                left={cards.length * config.offset + (cardMoving ? config.offset : 0)}
                onSelect={() => gameDispatch({ type: 'select', value: { cardId: '' } })}
                onMouseEnter={Boolean(cardMoving) ? () => {
                  setMagicCard(cards.length);
                } : undefined}
              />
            )}
          </div>
        </div>
      </FlexRow>
    </FlexRow>
  );
};

export default Hand;
