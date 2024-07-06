import React, { useCallback } from 'react';
import { Panel, useOnSelectionChange } from 'reactflow';
import Paper from '@mui/material/Paper';
import useBoxShadow from './useBoxShadow';
import HorizontalOffsetSlider from './HorizontalOffsetSlider';
import VerticalOffsetSlider from './VerticalOffsetSlider';
import BlurRadiusSlider from './BlurRadiusSlider';
import SpreadRadiusSlider from './SpreadRadiusSlider';
import ColorPicker from './ColorPicker'; // Import the ColorPicker component

const BoxShadowEditor = ({ setNodes }) => {
  const {
    selectedNodes,
    selectedNodeBoxShadow,
    selectedNodeTypes,
    horizontalOffset,
    verticalOffset,
    blurRadius,
    spreadRadius,
    shadowColor,
    setHorizontalOffset,
    setVerticalOffset,
    setBlurRadius,
    setSpreadRadius,
    setShadowColor,
    updateSelectedNode,
    setSelectedNodes
  } = useBoxShadow(setNodes);

  const onChange = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes.map((node) => node.id));
    updateSelectedNode();
  }, [updateSelectedNode, setSelectedNodes]);

  useOnSelectionChange({ onChange });

  return (
    <div>
      <Panel
        style={{
          marginTop: '80px',
        }}
      >
        <Paper elevation={3} sx={{ width: '200px', height: '500px', p: 2 }}>
          <div>
            <strong>Node type: {selectedNodeTypes}</strong>
            <br />
            <div>Selected Shadow: <strong>{selectedNodeBoxShadow}</strong></div>
          </div>
          <HorizontalOffsetSlider
            horizontalOffset={horizontalOffset}
            setHorizontalOffset={setHorizontalOffset}
            setNodes={setNodes}
            blurRadius={blurRadius}
            verticalOffset={verticalOffset}
            spreadRadius={spreadRadius}
            shadowColor={shadowColor}
          />
          <VerticalOffsetSlider
            verticalOffset={verticalOffset}
            setVerticalOffset={setVerticalOffset}
            setNodes={setNodes}
            blurRadius={blurRadius}
            horizontalOffset={horizontalOffset}
            spreadRadius={spreadRadius}
            shadowColor={shadowColor}
          />
          <BlurRadiusSlider
            blurRadius={blurRadius}
            setBlurRadius={setBlurRadius}
            setNodes={setNodes}
            horizontalOffset={horizontalOffset}
            verticalOffset={verticalOffset}
            spreadRadius={spreadRadius}
            shadowColor={shadowColor}
          />
          <SpreadRadiusSlider
            spreadRadius={spreadRadius}
            setSpreadRadius={setSpreadRadius}
            setNodes={setNodes}
            horizontalOffset={horizontalOffset}
            verticalOffset={verticalOffset}
            blurRadius={blurRadius}
            shadowColor={shadowColor}
          />
          <ColorPicker
            shadowColor={shadowColor}  // Assuming 'color' is another prop passed down
            setShadowColor={setShadowColor}  // Assuming 'setColor' is another prop passed down
            setNodes={setNodes}  // Ensure setNodes is correctly passed down
            blurRadius={blurRadius}  
            horizontalOffset={horizontalOffset}  
            verticalOffset={verticalOffset}  
            spreadRadius={spreadRadius}  
          />

        </Paper>
      </Panel>
    </div>
  );
};

export default BoxShadowEditor;

