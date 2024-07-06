import React, { useEffect } from 'react';
import { getBezierPath, BaseEdge } from 'reactflow';
import { motion } from 'framer-motion';

export default function NormalEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
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

    const transition = { duration: 1, repeatType: "loop", repeat: Infinity, repeatDelay: 2,  ease: "easeInOut" };

    useEffect(() => {
        console.log('Edge Path:', edgePath); // Log edgePath whenever it changes
    }, [edgePath]);

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />

            <motion.path
                d={edgePath}
                fill="transparent"
                strokeWidth="12"
                stroke="rgba(255, 255, 255, 0.69)"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={transition}
            />

            {/* Uncomment the following code block if you want to use linear gradient */}
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
            </defs>
            */}

            <path d={edgePath} stroke="url(#gradient)" fill="none" strokeWidth="2" />
        </>
    );
}
