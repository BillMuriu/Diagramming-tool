import React, { useState, } from 'react';
import { Panel, useReactFlow, useOnSelectionChange } from 'reactflow';
import Paper from '@mui/material/Paper';
import BoxShadowEditor from './box_shadow/BoxShadowEditor';

const EditingPanel = ({ setNodes }) => {
  const [showSecondPanel, setShowSecondPanel] = useState(false);
  const reactFlow = useReactFlow();


  const toggleSecondPanel = () => {
    setShowSecondPanel(!showSecondPanel);
  };

  const handleButtonClick = () => {
    toggleSecondPanel();
  };

  return (
    <div>
      <Panel>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Click me
        </button>
      </Panel>

      {showSecondPanel && (
        <Panel
          style={{
            marginTop: '80px',

          }}
        >
          <Paper elevation={3} sx={{ width: '200px', height: '300px', p: 2 }}>
            <BoxShadowEditor setNodes={setNodes}/>
          </Paper>
        </Panel>
      )}
    </div>
  );
};

export default EditingPanel;
