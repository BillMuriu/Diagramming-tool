import React from 'react';
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

// this is a little helper component to render the actual edge label
function EdgeLabel({ transform}) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'transparent',
        padding: 10,
        color: '#ff5050',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      This is a custom edge
    </div>
  );
}

const aEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
          <div
            style={{
                backgroundColor: 'red',
                width: 100,
                height: 50,
                transform: `translate(20%, 0%) translate(${sourceX}px,${sourceY}px)`,
                borderRadius: 10
            }}
          >
          </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default aEdge;
