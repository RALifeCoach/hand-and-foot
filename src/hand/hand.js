import React, {useReducer, useEffect} from 'react';
import PlayingCard from '../playing-card/playing-card';
import useSortCards from "../hooks/useSortCards";
import useSelectCard from "../hooks/useSelectCard";
import useMoveCard from "../hooks/useMoveCard";
import useSortStyles from "../hooks/useSortStyles";
import usePinCard from "../hooks/usePinCard";
import useRePinCards from "../hooks/useRePinCards";

const DEFAULTS = {
  offset: 20,
  sortColor: 'grey'
};

const HandComponent = ({options, cards}) => {
  const config = Object.assign({}, DEFAULTS, options);
  const sortCards = useSortCards();
  const moveCard = useMoveCard();
  const pinCard = usePinCard();
  const rePinCards = useRePinCards();
  const selectCard = useSelectCard();

  const [state, dispatch] = useReducer((state, action) => {
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
    sortState: '',
    cardMoving: null
  });

  useEffect(() => {
    dispatch({type: 'cards', value: cards});
  }, [cards]);

  const countSelectedCards = state.cards.reduce((count, card) => count + (card.selected ? 1 : 0), 0);
  const showIcons = countSelectedCards === 1;
  const movable = showIcons && !state.cardMoving;
  const {styleSortRank, styleSortSuit} = useSortStyles(state.sortOrder, config);

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: 80, padding: 10, float: 'left'}}>
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
      </div>
      <div style={{position: 'relative', float: 'left'}}>
        {state.cards.map((card, cardIndex) => {
          return (
            <PlayingCard
              card={card}
              imageLocation={'below'}
              left={(cardIndex * config.offset) + 'px'}
              showIcons={showIcons}
              onSelect={() => dispatch({type: 'select', value: card})}
              onPinned={movable ? () => dispatch({type: 'pinCard', value: card}) : null}
              onMoved={movable ? () => dispatch({type: 'cardMoving', value: card}) : null}
              key={cardIndex}
            />
          );
        })}
        {state.cardMoving && (
          <PlayingCard
            card={{cardText: 'Move to front of hand.'}}
            imageLocation={''}
            left={(state.cards.length * config.offset) + 'px'}
            onSelect={() => dispatch({type: 'select', value: null})}
            onPinned={null}
            onMoved={null}
            key={state.cards.length}
          />
        )}
      </div>
    </div>
  );
};

export default HandComponent;
