import { getBezierPath, BaseEdge } from 'reactflow';

export default function NormalEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    label,
    markerEnd,
}) {
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
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />

            <circle
                style={{ filter: `drop-shadow(3px 3px 5px #2ecc71)` }}
                r="4"
                fill="#2ecc71"
                className="circle"
            >
                <animateMotion dur=".9s" repeatCount="indefinite" path={edgePath} />
            </circle>
{/* 
            <defs>
                <linearGradient id="gradient">
                    
                    <stop offset="0" stopColor="blue" stopOpacity="0">
                        <animate attributeName="offset" from="-2" to="1.2" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="0.8" stopColor="blue" stopOpacity="1">
                        <animate attributeName="offset" from="0" to="1.2" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="0.8" stopColor="blue" stopOpacity="0">
                        <animate attributeName="offset" from="0" to="1.2" dur="2s" repeatCount="indefinite" />
                    </stop>

                </linearGradient>
            </defs> */}

            <path d={edgePath} stroke="url(#gradient)" fill="none"  strokeWidth="2"/>

        </>
    );
}