import React, { useState } from 'react';
import PlayingCard from '../PlayingCard/PlayingCard';
import { ICard } from "../../../../models/game";
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

  return (
    <div className="flex">
      <SortButtons />
      <div className="flex">
        <div
          style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: '100%' }}
        >
          <div
            className="relative"
            style={{
              width: config.offset * (cardMoving ? cards.length + 1 : cards.length - 1) + 70,
            }}
          >
            {cards.map((card: ICard, cardIndex: number) => {
              const isSelected = !!selected[card.cardId]
              return (
                <PlayingCard
                  card={card}
                  selected={isSelected}
                  left={cardIndex * config.offset + (cardMoving && cardIndex >= magicCard ? config.offset : 0)}
                  onSelect={() => {
                    if (!cardMoving) {
                      const newSelected = {...selected}
                      if (isSelected) {
                        delete newSelected[card.cardId]
                      } else {
                        newSelected[card.cardId] = true
                      }
                      setSelected(newSelected)
                      return
                    }
                    if (!!cardMoving) {
                      const destCardId = cards[magicCard]
                      sendMessage('moveCard', {movingCardId: cardMoving.cardId, destCardId: destCardId.cardId})
                    }
                  }}
                  onPinned={movable ? () => sendMessage('setPin', { cardId: card.cardId }) : undefined}
                  onMoved={movable ? () => {
                    setCardMoving(card)
                    setMagicCard(cardIndex);
                  } : undefined}
                  onMouseEnter={!!cardMoving ? () => {
                    setMagicCard(cardIndex);
                  } : undefined}
                  key={card.cardId}
                  top={10}
                />
              )
            })}
            {cardMoving && (
              <PlayingCard
                card={{ cardText: 'Move to front of hand.' }}
                left={cards.length * config.offset + (cardMoving ? config.offset : 0)}
                onSelect={() => setSelected({})}
                onMouseEnter={Boolean(cardMoving) ? () => {
                  setMagicCard(cards.length);
                } : undefined}
                top={18}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hand;
