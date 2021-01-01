import React from "react";
import Debounce from "../../utils/debounce";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import { CSSProperties } from "react";

interface IProps {
  showIcons: boolean;
  selected: boolean;
  onMoved?: (event: any) => void;
  config: any;
}

export default function IconMove({ showIcons, selected, onMoved, config }: IProps) {
  const styleMove: CSSProperties = {
    position: "absolute",
    top: config.moveOffsetTop,
    left: config.baseLeftMark,
  };

  const moveDebounce = new Debounce(onMoved, 300, true);
  const showMove = onMoved && selected && showIcons;

  if (!showMove) {
    return null;
  }
  return (
    <div style={styleMove}>
      <SwapHorizIcon
        onClick={onMoved ? (event) => moveDebounce.debounce(event) : undefined}
      />
    </div>
  );
}

IconMove.defaultProps = {
  showIcons: false,
  selected: false,
  onMoved: null,
};
