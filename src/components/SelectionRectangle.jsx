import React, { useState } from 'react';

const SelectionRectangle = () => {
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [selecting, setSelecting] = useState(false);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCurrentX(e.clientX);
    setCurrentY(e.clientY);
    setSelecting(true);
  };

  const handleMouseMove = (e) => {
    if (selecting) {
      setCurrentX(e.clientX);
      setCurrentY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setSelecting(false);
    // Here you can perform actions based on the selection coordinates
    console.log(`Selection from (${startX}, ${startY}) to (${currentX}, ${currentY})`);
  };

  return (
    <div className="selection-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {selecting && (
        <div className="selection-rectangle"
          style={{
            left: Math.min(startX, currentX),
            top: Math.min(startY, currentY),
            width: Math.abs(currentX - startX),
            height: Math.abs(currentY - startY)
          }}
        />
      )}
      {/* Your other content */}
    </div>
  );
};

export default SelectionRectangle;
