import React, { CSSProperties } from "react";
import { ICard } from "Game";

interface IProps {
  card: ICard;
  imageLocation: string;
  reversed: boolean;
  config: any;
}

export default function IconSuit({ card, imageLocation, reversed, config }: IProps) {
  const styleSuitBase: CSSProperties = {
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande", "sans-serif"',
    position: "absolute",
    fontWeight: "bold",
  };
  const styleSuit: CSSProperties = {
    ...styleSuitBase,
    top:
      card.suit === "J"
        ? config.baseTopMark
        : imageLocation === "below"
          ? config.belowOffsetTop
          : config.baseTopSuit,
    left:
      card.suit === "J"
        ? config.baseLeftMark
        : imageLocation === "below"
          ? config.baseLeftMark
          : config.besideOffsetLeft,
  };
  const styleSuitReversed: CSSProperties = {
    ...styleSuitBase,
    transform: "rotate(180deg)",
    bottom:
      card.suit === "J"
        ? config.baseTopMark
        : imageLocation === "below"
          ? config.belowOffsetTop
          : config.baseTopSuit,
    right:
      card.suit === "J"
        ? config.baseLeftMark
        : imageLocation === "below"
          ? config.baseLeftMark
          : config.besideOffsetLeft,
  };

  if (!config.SUIT_IMAGES[card.suit]) debugger;
  const image = config.SUIT_IMAGES[card.suit].image;
  if (reversed) {
    return <div style={styleSuitReversed}>{image}</div>;
  }
  return <div style={styleSuit}>{image}</div>;
}

IconSuit.defaultProps = {
  card: null,
  imageLocation: "below",
  reversed: false,
};
