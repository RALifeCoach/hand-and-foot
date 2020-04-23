import React, {useReducer, useEffect} from 'react';
import PlayingCard from '../PlayingCard/PlayingCard';
import useSortCards from "../hooks/useSortCards";
import useSelectCard from "../hooks/useSelectCard";
import useMoveCard from "../hooks/useMoveCard";
import useSortStyles from "../hooks/useSortStyles";
import usePinCard from "../hooks/usePinCard";
import useRePinCards from "../hooks/useRePinCards";
import FlexRow from "../../shared/flex-grid/FlexRow";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import { ICard } from "Game";
import { IAction } from 'General';

const DEFAULTS = {
  offset: 20,
  sortColor: 'grey'
};

interface IHandState {
  sortOrder: string,
  cards: ICard[],
  cardMoving: ICard | null;
}

const Hand = ({options, cards}:{options: any, cards: ICard[]}) => {
  const config = Object.assign({}, DEFAULTS, options);
  const sortCards = useSortCards();
  const moveCard = useMoveCard();
  const pinCard = usePinCard();
  const rePinCards = useRePinCards();
  const selectCard = useSelectCard();

  const [state, dispatch] = useReducer((state: IHandState, action: IAction) => {
    switch (action.type) {
      case 'sortOrder':
        const newSortOrder = state.sortOrder !== action.value ? action.value : '';
        return {...state, sortOrder: newSortOrder, cards: sortCards(state.cards, newSortOrder)};
      case 'pinCard':
        return {...state, cards: sortCards(pinCard(state.cards, action.value), state.sortOrder)};
      case 'select':
        if (state.cardMoving) {
          return {
            ...state,
            cards: rePinCards(moveCard(state.cards, action.value, state.cardMoving)),
            cardMoving: null
          };
        }
        return {...state, cards: selectCard(state.cards, action.value)};
      default:
        return {...state, [action.type]: action.value};
    }
  }, {
    sortOrder: '',
    cards: [],
    cardMoving: null
  });

  useEffect(() => {
    dispatch({type: 'cards', value: cards});
  }, [cards]);

  const countSelectedCards = state.cards.reduce((count: number, card: ICard) => count + (card.selected ? 1 : 0), 0);
  const showIcons = countSelectedCards === 1;
  const movable = showIcons && !state.cardMoving;
  const {styleSortRank, styleSortSuit} = useSortStyles(state.sortOrder, config);

  return (
    <FlexRow>
      <FlexColumn style={{width: 80, padding: 10}}>
        <div
          style={styleSortRank}
          onClick={() => dispatch({type: 'sortOrder', value: 'rank'})}
        >
          A-4
        </div>
        <div
          style={styleSortSuit}
          onClick={() => dispatch({type: 'sortOrder', value: 'suit'})}
        >
          {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
        </div>
      </FlexColumn>
      <div
        style={{overflowX: 'auto', overflowY: 'hidden', maxWidth: 'calc(100vw - 100px)'}}
      >
        <div
          style={{
            width: config.offset * (state.cardMoving ? state.cards.length - 2 : state.cards.length - 1) + 70,
            position: 'relative'
          }}
        >
          {state.cards.map((card: ICard, cardIndex: number) => {
            return (
              <PlayingCard
                card={card}
                imageLocation={'below'}
                left={cardIndex * config.offset}
                showIcons={showIcons}
                onSelect={() => dispatch({type: 'select', value: card})}
                onPinned={movable ? () => dispatch({type: 'pinCard', value: card}) : undefined}
                onMoved={movable ? () => dispatch({type: 'cardMoving', value: card}) : undefined}
                key={card.cardId}
              />
            );
          })}
          {state.cardMoving && (
            <PlayingCard
              card={{cardText: 'Move to front of hand.'}}
              imageLocation={''}
              left={state.cards.length * config.offset}
              onSelect={() => dispatch({type: 'select', value: null})}
            />
          )}
        </div>
      </div>
    </FlexRow>
  );
};

export default Hand;
