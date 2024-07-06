import React, { useCallback } from 'react';
import Slider from '@mui/material/Slider';

const SpreadRadiusSlider = ({ spreadRadius, setSpreadRadius, setNodes, horizontalOffset, verticalOffset, blurRadius, shadowColor }) => {
  const handleSpreadSliderChange = useCallback((event, newValue) => {
    setSpreadRadius(newValue);

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: node.selected ? `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${newValue}px ${shadowColor}` : node.style.boxShadow,
        },
      }))
    );
  }, [setNodes, horizontalOffset, verticalOffset, blurRadius, shadowColor, setSpreadRadius]);

  return (
    <Slider
      value={spreadRadius}
      onChange={handleSpreadSliderChange}
      size="small"
      aria-label="Spread Radius"
      valueLabelDisplay="auto"
      max={100}
    />
  );
};

export default SpreadRadiusSlider;
