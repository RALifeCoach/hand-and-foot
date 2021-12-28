import React, {CSSProperties} from 'react'
import PinDropIcon from '@mui/icons-material/PinDrop'
import useDebounce from '../hooks/useDebounce'

interface IProps {
  selected: boolean;
  showIcons: boolean;
  pinValue: number;
  onPinned?: () => void;
  config: any;
}

export default function IconPin({selected, showIcons, pinValue, onPinned, config}: IProps) {
  const stylePin: CSSProperties = {
    position: 'absolute',
    top: config.pinOffsetTop,
    left: config.baseLeftMark,
    opacity: selected ? 1 : .4,
  }

  const handlePin = useDebounce(onPinned, 500)

  const showPin = pinValue > 0 || (selected && showIcons)

  if (!showPin) {
    return null
  }
  return (
    <div style={stylePin}>
      <PinDropIcon
        onClick={onPinned ? (event) => handlePin(event) : undefined}
      />
    </div>
  )
}

IconPin.defaultProps = {
  selected: false,
  showIcons: false,
  pinValue: 0,
  onPinned: null
}
