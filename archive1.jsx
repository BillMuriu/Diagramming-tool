import { useCallback } from 'react';
import { useStore } from 'reactflow';
import ReactFlow, { useOnSelectionChange } from 'reactflow';

const transformSelector = (state) => state.transform;

const SideBar = ({ nodes, setNodes }) => {
  const transform = useStore(transformSelector);

  const groupNodes = nodes.filter((node) => node.type === 'group');

  const selectAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        node.selected = true;
        return node;
      })
    );
  }, [setNodes]);

  const logMessageWhenNodeInsideGroup = useCallback(() => {
    const groupedNodes = nodes.filter((node) => node.type === 'group');
    const selectedNode = nodes.find((node) => node.selected);
  
    if (!selectedNode) return; // Return if no node is selected
  
    const { x, y } = selectedNode.position;
    let insideGroup = false;
  
    // Check if the selected node is within any grouped node's bounds
    for (const groupedNode of groupedNodes) {
      const { x: groupX, y: groupY } = groupedNode.position;
      const { width, height } = groupedNode.style;
  
      if (
        x >= groupX &&
        x <= groupX + width &&
        y >= groupY &&
        y <= groupY + height
      ) {
        if (selectedNode.id === groupedNode.id) {
          console.log(`Selected node ${selectedNode.id} is the same as grouped node ${groupedNode.id}`);
        } else {
          console.log(`Selected node ${selectedNode.id} is inside grouped node ${groupedNode.id}`);
          selectedNode.parentId = groupedNode.id;
          selectedNode.position.x = 0 
          selectedNode.position.y = 0 
          
        }
        insideGroup = true;
        break; // Exit loop once properties are set
      }
    }
  
    if (!insideGroup) {
      console.log(`Selected node ${selectedNode.id} is not inside any grouped node.`);
    }
  }, [nodes]);
  

  // useOnSelectionChange({
  //   logMessageWhenNodeInsideGroup
  // });

  logMessageWhenNodeInsideGroup()
  
  

 // Function to create a new group node
const createGroupNode = useCallback(() => {
  const newNodeId = `${nodes.length + 1}`; // Generate a new ID for the new node

  // Generate random positions within a specified range
  const randomX = Math.floor(Math.random() * 1000); // Random x position within 0 to 1000
  const randomY = Math.floor(Math.random() * 1000); // Random y position within 0 to 1000

  // Create the new group node with fixed dimensions
  const newNode = {
    id: newNodeId,
    data: { label: 'Group' },
    position: { x: randomX, y: randomY },
    type: 'group',
    style: {
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      width: 400, // Fixed width
      height: 400, // Fixed height
    },
  };

  // Update the nodes state with the new node first
  setNodes((prevNodes) => [...prevNodes, newNode]);
  // Return newNode for use in updateNodes
  return newNode;
}, [nodes, setNodes]);





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
            Node {node.id} - x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}, z: {node.zIndex}
          </div>
          <div className="text-right">
            Selected: {node.selected ? 'true' : 'false'}
          </div>
        </div>
      ))}


      {groupNodes.map((node) => (
        <div key={node.id} className="flex justify-between items-center text-sm text-gray-800 mb-2">
          <div className="text-lg font-semibold mb-2">Grouped Nodes</div>
          <div>
            Node {node.id} - x: {node.position.x}, y: {node.position.y.toFixed(2)},
          </div>
          <div className="text-right">
            Selected: {node.selected ? 'true' : 'false'}
          </div>
        </div>
      ))}


      <div className="mt-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={selectAll}>
          Select All Nodes
        </button>
      </div>
      <div className="mt-4">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={createGroupNode}>
          Add Group Node
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
