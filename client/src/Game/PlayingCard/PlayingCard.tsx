import React, {CSSProperties} from 'react'
import CardIcons from './CardIcons';
import { ICard, IDummyCard } from "../../../../models/game";
import { SUIT_IMAGES } from '../../constants';
import useDebounce from '../hooks/useDebounce'

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
  onMoved?: () => void;
  onMouseEnter?: () => void;
}

const PlayingCard: React.FC<IProps> = (
  { card, selected = false, left, top, onSelect, styling, onMouseEnter, children, ...props }
) => {
  const config = Object.assign({}, DEFAULTS, styling);
  const handleClick = useDebounce(onSelect, 500)

  const classes = [
    'absolute',
    'w-16',
    'h-24',
    'overflow-hidden',
    'rounded-md',
    'shadow'
  ]
  const styleCard: CSSProperties = {
    left: left || 0,
    marginTop: selected
        ? top - 10
        : top,
    background: config.cardBackground,
    color: card.cardText ? config.textColor : config.SUIT_IMAGES[card.suit || 'C'].color
  };

  return (
    <div
      style={styleCard}
      className={classes.join(' ')}
      onClick={ev => handleClick(ev)}
      onMouseEnter={onMouseEnter}
    >
      {Boolean(card.cardText)
        ? (
          <div className="text-md p-1 text-center">
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
      {children}
    </div>
  );
}

export default PlayingCard
