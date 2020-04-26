import React from 'react';
import Debounce from '../../utils/debounce';
import CardIcons from './CardIcons';
import { ICard, IDummyCard } from "Game";
import { CSSProperties } from '@material-ui/styles';

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
  suitConstants: {
    C: {
      image: String.fromCharCode(9827),
      color: '#000'
    },
    D: {
      image: String.fromCharCode(9830),
      color: '#F00'
    },
    H: {
      image: String.fromCharCode(9829),
      color: '#F00'
    },
    S: {
      image: String.fromCharCode(9824),
      color: '#000'
    },
    J: {
      image: String.fromCharCode(9733),
      color: '#00F'
    }
  }
};

interface IProps {
  card: ICard | IDummyCard;
  left: number;
  top: number;
  onSelect: () => void;
  styling?: CSSProperties;
  onPinned?: () => void;
  onMoved: () => void;
  onMouseEnter?: () => void;
}

export default function PlayingCard({ card, left, top, onSelect, styling, onMouseEnter, ...props }: IProps) {
  const config = Object.assign({}, DEFAULTS, styling);
  const selectDebounce = new Debounce(() => {
    onSelect();
  }, 300, true);

  const styleCard: CSSProperties = {
    position: 'absolute',
    left: left || 0,
    width: 70,
    height: 98,
    overflow: 'hidden',
    marginTop: top !== undefined
      ? top
      : card.selected
        ? 0
        : 10,
    background: config.cardBackground,
    borderRadius: 12,
    boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
    color: card.cardText ? config.textColor : config.suitConstants[card.suit || 'C'].color
  };
  const styleText = {
    fontSize: 10,
    padding: 5,
    height: 'auto',
  };

  return (
    <div
      style={styleCard}
      onClick={onSelect ? event => selectDebounce.debounce(event) : undefined}
      onMouseEnter={onMouseEnter}
    >
      {card.cardText &&
        <div style={styleText}>
          {card.cardText}
        </div>
      }
      {!card.cardText && (
        <CardIcons
          card={card}
          config={config}
          {...props}
        />
      )}
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
