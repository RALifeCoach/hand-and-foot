import React from 'react';

const Spacer = ({ multiplier, height }: { multiplier?: number, height?: number }) => {
  return (
    <div style={{width: 8 * (multiplier || 1), height: height || 1}} />
  );
};

export default Spacer;
