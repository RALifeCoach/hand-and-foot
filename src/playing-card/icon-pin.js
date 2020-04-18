import React from 'react';
import Debounce from '../utils/debounce';

export default function IconPin({selected, showIcons, pinValue, onPinned, config}) {
  const stylePin = {
    position: 'absolute',
    top: config.pinOffsetTop,
    left: config.baseLeftMark,
    opacity: selected ? 1 : .2,
  };

  const pinDebounce = new Debounce(onPinned, 300, true);

  const showPin = pinValue > 0 || (selected && showIcons);

  if (!showPin) {
    return null;
  }
  return (
    <i
      style={stylePin}
      className="glyphicon glyphicon-pushpin"
      onClick={onPinned ? event => pinDebounce.debounce(event) : null}
    />
  );
}

IconPin.defaultProps = {
  selected: false,
  showIcons: false,
  pinValue: 0,
  onPinned: null
};
