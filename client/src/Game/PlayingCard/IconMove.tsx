import React from 'react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {CSSProperties} from 'react'
import useDebounce from '../hooks/useDebounce'

interface IProps {
  showIcons: boolean;
  selected: boolean;
  onMoved?: (event: any) => void;
  config: any;
}

export default function IconMove({showIcons, selected, onMoved, config}: IProps) {
  const styleMove: CSSProperties = {
    position: 'absolute',
    top: config.moveOffsetTop,
    left: config.baseLeftMark,
  }

  const handleMove = useDebounce(onMoved, 500)
  const showMove = onMoved && selected && showIcons

  if (!showMove) {
    return null
  }
  return (
    <div style={styleMove}>
      <SwapHorizIcon
        onClick={onMoved ? (event) => handleMove(event) : undefined}
      />
    </div>
  )
}

IconMove.defaultProps = {
  showIcons: false,
  selected: false,
  onMoved: null,
}
