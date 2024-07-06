import { useCallback } from 'react';
import { useStore } from 'reactflow';
import { getNodesBounds } from 'reactflow'; // Import getNodesBounds

const transformSelector = (state) => state.transform;

const SideBar = ({ nodes, setNodes }) => {
  const transform = useStore(transformSelector);

  const selectAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        node.selected = true;
        return node;
      })
    );
  }, [setNodes]);

  const addGroupNode = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected); // Filter selected nodes
    const bounds = getNodesBounds(selectedNodes); // Calculate the bounding box
  
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId, // Generate a new ID based on the current number of nodes
      data: { label: 'Group' },
      position: { x: bounds.x, y: bounds.y },
      type: 'resizable',
      style: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        width: bounds.width,
        height: bounds.height,
      },
    };
  
    const updatedNodes = nodes.map((node) => {
        // Check if the node is within the bounding box and does not already have a parentId
        if (
          node.position.x >= bounds.x &&
          node.position.x <= bounds.x + bounds.width &&
          node.position.y >= bounds.y &&
          node.position.y <= bounds.y + bounds.height &&
          !node.parentId // Ensure the node doesn't already have a parentId
        ) {
          node.position.x = 0;
          node.position.y = 0;
          node.extent = 'parent';
          return { ...node, parentId: newNodeId };
        }
        return node;
      });
      
  
    // Log the parentId of all nodes, including the newly created node
    const allNodes = [...updatedNodes, newNode];
    allNodes.forEach((node) => {
      console.log(`Node ${node.id} has parentId: ${node.parentId}`);
    });
  
    setNodes(allNodes); // Add the new node and update nodes state
  }, [nodes, setNodes]);
  

  return (
    <aside className="w-full h-96 bg-gray-200 border border-gray-300 rounded shadow-md p-4 overflow-y-auto">
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
            Node {node.id} - x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)} parentID: {node.parentId}
          </div>
          <div className="text-right">
            Selected: {node.selected ? 'true' : 'false'}
          </div>
        </div>
      ))}
      <div className="text-lg font-semibold mb-2">Selected Nodes Bounding Box</div>
      <div className="mt-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={selectAll}>
          Select All Nodes
        </button>
      </div>
      <div className="mt-4">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={addGroupNode}>
          Add Group Node
        </button>
      </div>
    </aside>
  )};
  

export default SideBar;
