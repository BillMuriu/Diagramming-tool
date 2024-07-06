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
        boxShadow: ''
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
        // Calculate absolute position using the pseudo code logic
        let absX = node.position.x;
        let absY = node.position.y;
        let host = node.parentId ? nodes.find((n) => n.id === node.parentId) : undefined;
    
        while (host) {
          const parentNode = host; // Capture the current value of host
          absX += parentNode.position.x;
          absY += parentNode.position.y;
          host = parentNode.parentId ? nodes.find((n) => n.id === parentNode.parentId) : undefined;
        }
    
        // Set the node's new position relative to the new parent
        const newNode = {
          ...node,
          position: {
            x: absX - bounds.x,
            y: absY - bounds.y,
          },
          draggable: false,
          extent: 'parent',
          parentId: newNodeId,
        };
    
        return newNode;
      }
      return node;
    });
    
    setNodes([...updatedNodes, newNode]); // Add the new node and update nodes state
    
    
  
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
            Node {node.id} - x: {node.position.x}, y: {node.position.y}, parentID: {node.parentId}, Width: {node.width}, Height: {node.height}
          </div>
          <div className="text-right">
            Selected: {node.selected ? 'true' : 'false'}
            Dragging: {node.dragging ? 'true' : 'false'}
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