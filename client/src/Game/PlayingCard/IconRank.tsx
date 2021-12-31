import React, { CSSProperties } from 'react';
import { ICard } from '../../queries/game';

interface IProps {
  card: ICard;
  reversed: boolean;
  config: any;
}

export default function IconRank({card, reversed, config}: IProps) {
    const styleRank: CSSProperties = {
        fontSize: config.cardMarkFontSize,
        position: 'absolute',
        fontWeight: 'bold',
        top: config.baseTopMark,
        left: config.baseLeftMark,
    };
    const styleRankReversed: CSSProperties = {
        fontSize: config.cardMarkFontSize,
        position: 'absolute',
        fontWeight: 'bold',
        transform: 'rotate(180deg)',
        bottom: config.baseTopMark,
        right: config.baseLeftMark,
    };

    if (card.suit === 'J') {
        return null;
    }
    if (reversed) {
        return (
            <div style={styleRankReversed}>{card.rank}</div>
        );
    }
    return (
        <div style={styleRank}>{card.rank}</div>
    );
}

IconRank.defaultProps = {
    card: null,
    reversed: false
};
