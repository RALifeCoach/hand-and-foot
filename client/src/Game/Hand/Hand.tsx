import React, { useContext } from 'react';
import PlayingCard from '../PlayingCard/PlayingCard';
import useSortStyles from "../hooks/useSortStyles";
import FlexRow from "../../shared/flex-grid/FlexRow";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import { ICard } from "Game";
import GameContext from '../GameContext';

const DEFAULTS = {
  offset: 20,
  sortColor: 'grey'
};

interface IProps {
  options: any;
  cards: ICard[];
  sortOrder: string;
  cardMoving: ICard | null;
}

const Hand = ({ options, cards, sortOrder, cardMoving }: IProps) => {
  const { gameDispatch, gameId, playerId } = useContext(GameContext);
  const config = Object.assign({}, DEFAULTS, options);

  const countSelectedCards = cards
    .reduce((count: number, card: ICard) => count + (card.selected ? 1 : 0), 0);
  const showIcons = countSelectedCards === 1;
  const movable = showIcons && !cardMoving;
  const { styleSortRank, styleSortSuit } = useSortStyles(sortOrder, config);

  return (
    <FlexRow>
      <FlexColumn style={{ width: 80, padding: 10 }}>
        <div
          style={styleSortRank}
          onClick={() => gameDispatch({
            type: 'sendMessage',
            value: {
              type: 'setSortOrder', value: { gameId, playerId, sortOrder: 'rank' }
            }
          })}
        >
          A-4
        </div>
        <div
          style={styleSortSuit}
          onClick={() => gameDispatch({
            type: 'sendMessage',
            value: {
              type: 'setSortOrder', value: { gameId, playerId, sortOrder: 'suit' }
            }
          })}
        >
          {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
        </div>
      </FlexColumn>
      <div
        style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: 'calc(100vw - 100px)' }}
      >
        <div
          style={{
            width: config.offset * (cardMoving ? cards.length - 2 : cards.length - 1) + 70,
            position: 'relative'
          }}
        >
          {cards.map((card: ICard, cardIndex: number) => {
            return (
              <PlayingCard
                card={card}
                imageLocation={'below'}
                left={cardIndex * config.offset}
                showIcons={showIcons}
                onSelect={() => gameDispatch({ type: 'select', value: card })}
                onPinned={movable ? () => gameDispatch({
                  type: 'sendMessage',
                  value: {
                    type: 'setPin', value: { gameId, playerId, cardId: card.cardId }
                  }
                }) : undefined}
                onMoved={movable ? () => gameDispatch({type: 'cardMoving', value: card}) : undefined}
                key={card.cardId}
              />
            );
          })}
          {cardMoving && (
            <PlayingCard
              card={{ cardText: 'Move to front of hand.' }}
              imageLocation={''}
              left={cards.length * config.offset}
              onSelect={() => gameDispatch({ type: 'select', value: {cardId: ''} })}
            />
          )}
        </div>
      </div>
    </FlexRow>
  );
};

export default Hand;
