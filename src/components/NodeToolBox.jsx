import React, { useCallback } from 'react';
import { useStore } from 'reactflow';

const transformSelector = (state) => state.transform;

const NodeToolbox = ({ nodes, setNodes }) => {
  const transform = useStore(transformSelector);

  // Callback to toggle the box shadow for selected nodes
  const toggleBoxShadow = useCallback((e) => {
    const isChecked = e.target.checked;
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: isChecked && node.selected ? '0 0 10px rgba(0, 0, 0, 0.5)' : '', // Apply box shadow if checked and node is selected
        },
      }))
    );
  }, [setNodes]);

  return (
    <aside className="w-full bg-gray-200 border border-gray-300 rounded shadow-md p-4">
      <div className="text-sm text-gray-700 mb-4">
        This is an example of how you can access the internal state outside of the ReactFlow component.
      </div>
      <div className="text-lg font-semibold mb-2">Zoom & pan transform</div>
      <div className="text-gray-800 mb-2">
        [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
      </div>
      <div className="text-lg font-semibold mb-2">Nodes</div>
      {nodes.map((node) => (
        <div key={node.id} className="flex justify-between items-center text-sm text-gray-800 mb-2">
          <div>
            Node {node.id} - x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
          </div>
          <div className="text-right">
            Selected: {node.selected ? 'true' : 'false'}
          </div>
        </div>
      ))}
      <div className="mt-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" onChange={toggleBoxShadow} />
          Apply Box Shadow to Selected Nodes
        </label>
      </div>
    </aside>
  );
};

export default NodeToolbox;
