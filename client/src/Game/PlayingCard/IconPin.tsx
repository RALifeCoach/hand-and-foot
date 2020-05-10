import React, { CSSProperties } from 'react';
import Debounce from '../../utils/debounce';

interface IProps {
  selected: boolean;
  showIcons: boolean;
  pinValue: number;
  onPinned: () => void;
  config: any;
}

export default function IconPin({selected, showIcons, pinValue, onPinned, config}: IProps) {
  const stylePin: CSSProperties = {
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
      onClick={onPinned ? event => pinDebounce.debounce(event) : undefined}
    />
  );
}

IconPin.defaultProps = {
  selected: false,
  showIcons: false,
  pinValue: 0,
  onPinned: null
};
