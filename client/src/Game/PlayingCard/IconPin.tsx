import React, { CSSProperties } from 'react';
import Debounce from '../../utils/debounce';
import PinDropIcon from '@mui/icons-material/PinDrop';

interface IProps {
  selected: boolean;
  showIcons: boolean;
  pinValue: number;
  onPinned?: () => void;
  config: any;
}

export default function IconPin({ selected, showIcons, pinValue, onPinned, config }: IProps) {
  const stylePin: CSSProperties = {
    position: 'absolute',
    top: config.pinOffsetTop,
    left: config.baseLeftMark,
    opacity: selected ? 1 : .4,
  };

  const pinDebounce = new Debounce(onPinned, 300, true);

  const showPin = pinValue > 0 || (selected && showIcons);

  if (!showPin) {
    return null;
  }
  return (
    <div style={stylePin}>
      <PinDropIcon
        onClick={onPinned ? (event) => pinDebounce.debounce(event) : undefined}
      />
    </div>
  );
}

IconPin.defaultProps = {
  selected: false,
  showIcons: false,
  pinValue: 0,
  onPinned: null
};
