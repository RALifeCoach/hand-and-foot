import React from 'react';

export default function IconRank({card, reversed, config}) {
    const styleRank = {
        fontSize: config.cardMarkFontSize,
        position: 'absolute',
        fontWeight: 'bold',
        top: config.baseTopMark,
        left: config.baseLeftMark,
    };
    const styleRankReversed = {
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
