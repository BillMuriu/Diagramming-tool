import React, { useCallback, useState, useEffect } from 'react';
import { useStore, useOnSelectionChange } from 'reactflow';

const HelperLines = ({ nodes, setNodes }) => {
  const [linesAdded, setLinesAdded] = useState(true);
  const [horizontalLines, setHorizontalLines] = useState([]);

  const activeObject = nodes.find((node) => node.selected && node.type !== 'helper');
  const unselectedNodes = nodes.filter((node) => !node.selected && node.type !== 'helper');
  const helperNodes = nodes.filter((node) => node.type === 'helper');

  const aligningLineMargin = 2

  const showHorizontalLines = useCallback(() => {
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

        const objectEdgeY = Math.floor(objectCenter.y + objectHalfHeight);
        const activeObjectEdgeY = Math.floor(activeObjectCenter.y - activeObjectHalfHeight);

        console.log(`Object Y-:${objectEdgeY} activeObject Y-:${activeObjectEdgeY}`);

        function isInRange(value1, value2) {
          return value2 > value1 - aligningLineMargin && value2 < value1 + aligningLineMargin
        }

        const snapHorizontal = (objEdge, activeObjEdge) => {
          if (isInRange(objEdge, activeObjEdge)) {
            const newLine = {
              y: objEdge,
              x1: objectCenter.x < activeObjectCenter.x
                ? objectCenter.x - objectHalfWidth
                : objectCenter.x + objectHalfWidth,
              x2: activeObjectCenter.x > objectCenter.x
                ? activeObjectCenter.x + activeObjectHalfWidth
                : activeObjectCenter.x - activeObjectHalfWidth,
              width: Math.abs(
                activeObjectCenter.x + activeObjectHalfWidth - (objectCenter.x - objectHalfWidth)
              ),
            };

            // Check if there is a helper node with the same coordinates as newLine
            const nodeExists = helperNodes.some(
              (helperNode) =>
                Math.floor(helperNode.position.y) === Math.floor(newLine.y) &&
                Math.floor(helperNode.position.x) === Math.floor(newLine.x1) &&
                Math.floor(helperNode.style.width) === Math.floor(newLine.width)
            );

            if (nodeExists) {
              console.log('Helper node already exists for line:', newLine);
            } else {
              console.log('Adding new line:', newLine);
              newLines.push(newLine);
            }
          }
        };

        snapHorizontal(objectCenter.y + objectHalfHeight, activeObjectCenter.y - activeObjectHalfHeight);
      });

      if (newLines.length > 0) {
        setHorizontalLines((prevLines) => [...prevLines, ...newLines]);
        setLinesAdded(false); // Set flag to false to indicate lines have been added
      }
    } else {
      console.log('No active object found.');
    }
  }, [unselectedNodes, activeObject, helperNodes]);

  useEffect(() => {
    showHorizontalLines();
  }, [nodes, activeObject, showHorizontalLines]);

  useEffect(() => {
    if (horizontalLines.length > 0 && !linesAdded) {
      horizontalLines.forEach((line) => {
        const newNode = {
          id: `helper-${Date.now()}-${Math.random()}`,
          type: 'helper',
          style: {
            boxShadow: '',
            width: line.width,
            margin: aligningLineMargin
          },
          position: { x: line.x1, y: line.y },
        };

        console.log('Creating new helper line node:', newNode);

        setNodes((prevNodes) => [...prevNodes, newNode]);
      });

      setLinesAdded(true); // Set flag to true to prevent further additions
    }
  }, [horizontalLines, linesAdded, setNodes]);

  return (
    <div className="mt-4">
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