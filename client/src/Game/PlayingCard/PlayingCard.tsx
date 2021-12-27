import React, {CSSProperties, useCallback, useMemo} from 'react'
import Debounce from '../../utils/debounce';
import CardIcons from './CardIcons';
import { ICard, IDummyCard } from "Game";
import { SUIT_IMAGES } from '../../constants';

const DEFAULTS = {
  buttonHighlight: '#f00',
  cardBackground: '#CCC5B3',
  cardMarkFontSize: '20px',
  textColor: '#000',
  baseTopMark: '3%',
  baseTopSuit: '1%',
  baseLeftMark: '9%',
  baseLeftSuit: '5%',
  belowOffsetTop: '30%',
  pinOffsetTop: '60%',
  moveOffsetTop: '80%',
  besideOffsetLeft: '30%',
  SUIT_IMAGES,
};

interface IProps {
  card: ICard | IDummyCard;
  selected?: boolean;
  left: number;
  top: number;
  onSelect?: () => void;
  styling?: CSSProperties;
  onPinned?: () => void;
  onMoved: () => void;
  onMouseEnter?: () => void;
}

export default function PlayingCard(
  { card, selected = false, left, top, onSelect, styling, onMouseEnter, ...props }: IProps
) {
  const config = Object.assign({}, DEFAULTS, styling);
  const selectDebounce = useMemo(() => {
    return new Debounce(() => {
      if (onSelect) {
        onSelect();
      }
    }, 300, true);
  }, [onSelect]);

  const styleCard: CSSProperties = {
    position: 'absolute',
    left: left || 0,
    width: 70,
    height: 98,
    overflow: 'hidden',
    marginTop: top !== undefined
      ? top
      : selected
        ? 0
        : 10,
    background: config.cardBackground,
    borderRadius: 12,
    boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
    color: card.cardText ? config.textColor : config.SUIT_IMAGES[card.suit || 'C'].color
  };
  const styleText = {
    fontSize: 10,
    padding: 5,
    height: 'auto',
  };

  const handleClick = useCallback((event: any) => {
    selectDebounce.debounce(event);
  }, [selectDebounce]);

  return (
    <div
      style={styleCard}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
    >
      {Boolean(card.cardText)
        ? (
          <div style={styleText}>
            {card.cardText}
          </div>
        )
        : (
          <CardIcons
            card={card as ICard}
            config={config}
            selected={selected}
            {...props}
          />
        )
      }
    </div>
  );
}

PlayingCard.defaultProps = {
  card: null,
  imageLocation: 'below',
  left: 0,
  top: undefined,
  showIcons: false,
  onSelect: null,
  onPinned: null,
  onMoved: null
};
