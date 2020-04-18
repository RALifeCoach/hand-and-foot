import React from 'react';

export default function IconSuit({card, imageLocation, reversed, config}) {
  const styleSuitBase = {
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande", "sans-serif"',
    position: 'absolute',
    fontWeight: 'bold',
  };
  const styleSuit = {
    ...styleSuitBase,
    top: card.suit === 'J'
      ? config.baseTopMark
      : imageLocation === 'below'
        ? config.belowOffsetTop
        : config.baseTopSuit,
    left: card.suit === 'J'
      ? config.baseLeftMark
      : imageLocation === 'below'
        ? config.baseLeftMark
        : config.besideOffsetLeft,
  };
  const styleSuitReversed = {
    ...styleSuitBase,
    transform: 'rotate(180deg)',
    bottom: card.suit === 'J'
      ? config.baseTopMark
      : imageLocation === 'below'
        ? config.belowOffsetTop
        : config.baseTopSuit,
    right: card.suit === 'J'
      ? config.baseLeftMark
      : imageLocation === 'below'
        ? config.baseLeftMark
        : config.besideOffsetLeft,
  };

  if (!config.suitConstants[card.suit]) debugger;
  const image = config.suitConstants[card.suit].image;
  if (reversed) {
    return (
      <div style={styleSuitReversed}>{image}</div>
    );
  }
  return (
    <div style={styleSuit}>{image}</div>
  );
}

IconSuit.defaultProps = {
  card: null,
  imageLocation: 'below',
  reversed: false
};
