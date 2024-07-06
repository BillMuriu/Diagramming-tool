import React, { useCallback, useState, useEffect } from 'react';
import { useViewport } from 'reactflow';

const HelperLines = ({ nodes, setNodes }) => {
  const [linesAdded, setLinesAdded] = useState(true);
  const [horizontalLines, setHorizontalLines] = useState([]);

  const { width, height, x, y, zoom } = useViewport();

  const deleteHelperNodes = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.type !== 'helper'));
  }, [setNodes]);

  const showHorizontalLines = useCallback(() => {
    const activeObject = nodes.find((node) => node.selected && node.type !== 'helper');
    const unselectedNodes = nodes.filter((node) => !node.selected && node.type !== 'helper');
    const helperNodes = nodes.filter((node) => node.type === 'helper');

    if (activeObject) {
      const activeObjectHalfHeight = activeObject.height / 2;
      const activeObjectHalfWidth = activeObject.width / 2;
      const activeObjectCenter = {
        x: activeObject.position.x + activeObjectHalfWidth,
        y: activeObject.position.y + activeObjectHalfHeight,
      };

      const newLines = [];

      unselectedNodes.forEach((node) => {
        const objectHalfHeight = node.height / 2;
        const objectHalfWidth = node.width / 2;
        const objectCenter = {
          x: node.position.x + objectHalfWidth,
          y: node.position.y + objectHalfHeight,
        };

        function isInRange(value1, value2) {
          return value2 > value1 - 1 && value2 < value1 + 1;
        }

        function isOutOfrange(value1, value2) {
          return value2 > value1 - 3 && value2 < value1 + 3;
        }

        const snapHorizontal = (objEdge, activeObjEdge) => {
          if (isInRange(objEdge, activeObjEdge) && activeObject.dragging) {
            const newLine = {
              y: objEdge - 1,
              x1: objectCenter.x < activeObjectCenter.x
                ? objectCenter.x - objectHalfWidth
                : objectCenter.x + objectHalfWidth,
              x2: activeObjectCenter.x > objectCenter.x
                ? activeObjectCenter.x + activeObjectHalfWidth
                : activeObjectCenter.x - activeObjectHalfWidth,
            };

            // Check if there is a helper node with the same coordinates as newLine
            const nodeExists = helperNodes.some(
              (helperNode) =>
                Math.floor(helperNode.position.y) === Math.floor(newLine.y)
            );

            if (nodeExists) {
              console.log('Helper node already exists for line:', newLine);
            } else {
              console.log('Adding new line:', newLine);
              newLines.push(newLine);

              if (newLines.length > 0) {
                newLines.forEach((line) => {
                  const newNode = {
                    id: `helper-${Date.now()}-${Math.random()}`,
                    type: 'helper',
                    style: {
                      boxShadow: '',
                      width: 20000,
                      margin: 1,
                    },
                    position: { x: -10000, y: line.y },
                  };

                  console.log('Creating new helper line node:', newNode);

                  setNodes((prevNodes) => [...prevNodes, newNode]);
                });

                setLinesAdded(true); // Set flag to true to prevent further additions
              }
            }
          } else {
            if (isOutOfrange(objEdge, activeObjEdge)) {
              deleteHelperNodes();
              console.log('Deleting nodes through the showHorizintalLines function')
            }
          }
        };

        snapHorizontal(objectCenter.y + objectHalfHeight, activeObjectCenter.y - activeObjectHalfHeight);
      });

      if (newLines.length > 0) {
        setHorizontalLines((prevLines) => [...prevLines, ...newLines]);
        setLinesAdded(false); // Set flag to false to indicate lines have been added
      }
    }
  }, [nodes, setNodes, deleteHelperNodes]);

  useEffect(() => {
    const activeObject = nodes.find((node) => node.selected && node.type !== 'helper');
    if (activeObject?.dragging) {
      showHorizontalLines();
    } else if (nodes.some((node) => node.type === 'helper')) {
      deleteHelperNodes();
      console.log('use effect is deleting helper nodes')
    }
  }, [nodes, showHorizontalLines, deleteHelperNodes]);

  return (
    <div className="mt-4">
      <div>
        <p>
          The viewport is currently at ( Width: {width}, Height: {height}, X: {x}, Y: {y}) and zoomed to {zoom}.
        </p>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={showHorizontalLines}
      >
        Add Helper Node
      </button>
    </div>
  );
};

export default HelperLines;

