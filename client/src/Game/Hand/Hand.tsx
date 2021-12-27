import React, { useState, useEffect } from 'react';
import PlayingCard from '../PlayingCard/PlayingCard';
import FlexRow from "../../shared/flex-grid/FlexRow";
import { ICard } from "Game";
import SortButtons from './SortButtons';
import useSelectedCards from '../hooks/useSelectedCards';
import useSendMessage from '../hooks/useSendMessage';
import {useRecoilState} from 'recoil'
import {cardMovingAtom, selectedAtom} from '../../atoms/game'

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

const Hand = ({ options, cards }: IProps) => {
  const [cardMoving, setCardMoving] = useRecoilState(cardMovingAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [magicCard, setMagicCard] = useState(0);
  const config = Object.assign({}, DEFAULTS, options);
  const sendMessage = useSendMessage();

  const countSelectedCards = useSelectedCards(cards).length;
  const showIcons = countSelectedCards === 1;
  const movable = showIcons && !cardMoving;


  useEffect(() => {
    console.log('magic', magicCard);
  }, [magicCard]);

  return (
    <FlexRow>
      <SortButtons
        config={config}
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
                  setSelected({[card.cardId]: true})
                }}
                onPinned={movable ? () => sendMessage('setPin', { cardId: card.cardId }) : undefined}
                onMoved={movable ? () => {
                  setCardMoving(card)
                  setMagicCard(cardIndex);
                } : undefined}
                onMouseEnter={Boolean(cardMoving) ? () => {
                  setMagicCard(cardIndex);
                } : undefined}
                key={card.cardId}
                top={0}
              />
            ))}
            {cardMoving && (
              <PlayingCard
                card={{ cardText: 'Move to front of hand.' }}
                imageLocation={''}
                left={cards.length * config.offset + (cardMoving ? config.offset : 0)}
                onSelect={() => setSelected({})}
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
