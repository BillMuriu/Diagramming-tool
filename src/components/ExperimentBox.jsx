import React, { useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';

const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: -15,
  fontSize: 8,
};

function ExperimentBox({ data, selected }) {
  const [emoji, setEmoji] = useState(() => '🚀');

  return (
    <>
      <NodeToolbar isVisible>
        <button onClick={() => setEmoji('🔥')}>🔥</button>
      </NodeToolbar>
      <div
        style={{
          width: '120px',
          height: '120px',
          backgroundColor: selected ? 'green' : 'blue', // Change based on selected prop
        }}
      >
        {emoji}
      </div>
      <input 
            name="age" 
            type="number"
            style={{
                width: '80%',
                height: '80%',
                border: '1px solid rgba(0, 0, 0, 0.7)',
                color: 'black',
                padding: '5px', // Add padding for better usability
                boxSizing: 'border-box', // Ensure padding doesn't affect the total width and height
                backgroundColor: 'white', // Ensure the background is white
                borderRadius: '5px', // Add border-radius for better appearance
                outline: 'none', // Remove the default outline
            }} 
        />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default ExperimentBox;
