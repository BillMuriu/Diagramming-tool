import React, { useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ shadowColor, setShadowColor, setNodes, blurRadius, horizontalOffset, verticalOffset, spreadRadius }) => {
  const handleChange = useCallback((newColor) => {
    const rgbValues = hexToRgb(newColor); // Convert hex color to RGB

    if (rgbValues) {
      const { r, g, b } = rgbValues;
      const rgbaColor = `rgba(${r}, ${g}, ${b}, ${1})`; // Use alpha value if available
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: {
            ...node.style,
            boxShadow: node.selected ? `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}` : node.style.boxShadow,
          },
        }))
      );
      setShadowColor(newColor); // Update color state with newColor
    } else {
      console.warn('Invalid color format:', newColor);
    }
  }, [setShadowColor, setNodes, blurRadius, horizontalOffset, verticalOffset, spreadRadius]);

  // Function to convert hex color to RGB object
  function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace('#', '');
    // Convert hex to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  return (
    <HexColorPicker color={shadowColor} onChange={handleChange} />
  );
};

export default ColorPicker;
