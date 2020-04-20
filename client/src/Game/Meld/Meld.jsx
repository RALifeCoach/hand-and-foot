import React from 'react';
import PlayingCard from '../PlayingCard/PlayingCard';

const DEFAULTS = {
  offset: 26,
  sortColor: 'grey'
};

const Meld = ({options, cards}) => {
  const config = Object.assign({}, DEFAULTS, options);

  return (
    <div style={{position: 'relative'}}>
      {cards.map((card, cardIndex) => {
        return (
          <PlayingCard
            card={card}
            imageLocation={'side'}
            top={(cardIndex * config.offset) + 'px'}
            showIcons={false}
            onSelect={null}
            onPinned={null}
            onMoved={null}
            key={cardIndex}
          />
        );
      })}
    </div>
  );
};

export default Meld;
