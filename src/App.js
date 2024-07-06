import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from 'reactflow';
 
import { 
  nodes as initialNodes,
  edges as initialEdges, 
} from './components/grouping';

import SideBar from './components/SideBar';
import NodeToolbox from './components/NodeToolBox';
import EditingPanel from './components/node_editing/EditingPanel';
import SelectionRectangle from './components/SelectionRectangle';
import HelperLines from './components/helper_lines/HelperLines';
import Helper from './components/helper_lines/Helper';

import AnnotationNode from './components/AnnotationNode';
import ToolbarNode from './components/ToolbarNode';
import ResizerNode from './components/ResizerNode';
import TextNode from './components/TextNode';
import CircleNode from './components/CircleNode';
import ExperimentBox from './components/ExperimentBox';
import ResizableNodeSelected from './components/ResizableNodeSelected';


import ButtonEdge from './components/ButtonEdge';
import NormalEdge from './components/normaledge';
import aEdge from './components/aEdge';

import 'reactflow/dist/style.css';
import './index.css';

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextNode,
  experiment: ExperimentBox,
  resizable: ResizableNodeSelected,
  helper: Helper
};

const edgeTypes = {
  button: ButtonEdge,
  'normal-edge': NormalEdge,
  'a-edge': aEdge
};


const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'normal-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(), // Generate a unique ID
      type: 'experiment',
      data: { label: `This is node ${nodes.length + 1}` },
      style: {
        boxShadow: '',
        width: 10
      },
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh', border: '1px solid black' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          zoomOnDoubleClick={false}
          className="overview"
        >
          <EditingPanel setNodes={setNodes}/>
          <Controls />
        </ReactFlow>
      </div>

      <HelperLines nodes={nodes} setNodes={setNodes}/>
      <SideBar nodes={nodes} setNodes={setNodes} />
      <SelectionRectangle />
      <button
        onClick={addNode}
        style={{
          backgroundColor: "blue"
        }}
      >
        Add Node
      </button>
    </ReactFlowProvider>
  );
};

export default OverviewFlow;
