import React from 'react';
import IconRank from './IconRank';
import IconSuit from './IconSuit';
import IconPin from './IconPin';
import IconMove from './IconMove';

export default function CardIcons({card, imageLocation, showIcons, onPinned, onMoved, config}) {
  return (
    <div>
      <IconRank
        card={card}
        reversed={false}
        config={config}
        key={0}
      />
      <IconSuit
        card={card}
        imageLocation={imageLocation}
        reversed={false}
        config={config}
        key={1}
      />
      <IconSuit
        card={card}
        imageLocation={imageLocation}
        reversed={true}
        config={config}
        key={2}
      />
      <IconRank
        card={card}
        reversed={true}
        config={config}
        key={3}
      />
      <IconPin
        selected={card.selected}
        showIcons={showIcons}
        pinValue={card.pinValue}
        onPinned={onPinned}
        config={config}
      />
      <IconMove
        selected={card.selected}
        showIcons={showIcons}
        onMoved={onMoved}
        config={config}
      />
    </div>
  );
}

CardIcons.defaultProps = {
  card: null,
  imageLocation: 'below',
  showIcons: false,
  onPinned: null,
  onMoved: null
};
