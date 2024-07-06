import React from 'react';

function Helper() {
  return (
    <>
      <svg width="100%" height="2">
        <line
          x1="0"
          y1="0"
          x2="100%" // Use width prop here
          y2="0"
          stroke="blue"
          strokeWidth="2"
        />
      </svg>
    </>
  );
}

export default Helper;

