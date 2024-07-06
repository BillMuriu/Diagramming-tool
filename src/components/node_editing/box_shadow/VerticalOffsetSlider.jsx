import React, { useCallback } from 'react';
import Slider from '@mui/material/Slider';

const VerticalOffsetSlider = ({ verticalOffset, setVerticalOffset, setNodes, blurRadius, horizontalOffset, spreadRadius, shadowColor }) => {
  const handleVerticalSliderChange = useCallback((event, newValue) => {
    setVerticalOffset(newValue);

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: node.selected ? `${horizontalOffset}px ${newValue}px ${blurRadius}px ${spreadRadius}px ${shadowColor}` : node.style.boxShadow,
        },
      }))
    );
  }, [setNodes, blurRadius, horizontalOffset, spreadRadius, setVerticalOffset, shadowColor]);

  return (
    <Slider
      value={verticalOffset}
      onChange={handleVerticalSliderChange}
      size="small"
      aria-label="Vertical Offset"
      valueLabelDisplay="auto"
      max={100}
    />
  );
};

export default VerticalOffsetSlider;
