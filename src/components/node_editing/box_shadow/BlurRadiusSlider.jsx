import React, { useCallback } from 'react';
import Slider from '@mui/material/Slider';

const BlurRadiusSlider = ({
  blurRadius,
  setBlurRadius,
  setNodes,
  horizontalOffset,
  verticalOffset,
  spreadRadius,
  shadowColor
}) => {
  const handleBlurSliderChange = useCallback((event, newValue) => {
    setBlurRadius(newValue);

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: node.selected ? `${horizontalOffset}px ${verticalOffset}px ${newValue}px ${spreadRadius}px ${shadowColor}` : node.style.boxShadow,
        },
      }))
    );
  }, [setNodes, horizontalOffset, verticalOffset, spreadRadius, shadowColor, setBlurRadius]);

  return (
    <Slider
      value={blurRadius}
      onChange={handleBlurSliderChange}
      size="small"
      aria-label="Blur Radius"
      valueLabelDisplay="auto"
      max={100}
    />
  );
};

export default BlurRadiusSlider;
