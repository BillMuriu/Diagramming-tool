import React, { useCallback } from 'react';
import Slider from '@mui/material/Slider';

const HorizontalOffsetSlider = ({ horizontalOffset, setHorizontalOffset, setNodes, blurRadius, verticalOffset, spreadRadius }) => {
  const handleHorizontalSliderChange = useCallback((event, newValue) => {
    setHorizontalOffset(newValue);

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: node.selected ? `${newValue}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px rgba(0, 0, 0, 0.75)` : node.style.boxShadow,
        },
      }))
    );
  }, [setNodes, blurRadius, verticalOffset, spreadRadius, setHorizontalOffset]);

  return (
    <Slider
      value={horizontalOffset}
      onChange={handleHorizontalSliderChange}
      size="small"
      aria-label="Horizontal Offset"
      valueLabelDisplay="auto"
      max={100}
    />
  );
};

export default HorizontalOffsetSlider;
