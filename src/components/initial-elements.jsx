import React from 'react';
import { MarkerType } from 'reactflow';

export const nodes = [
  {
    id: '2-1',
    type: 'group',
    position: {
      x: -170,
      y: 250,
    },
    style: {
      width: 380,
      height: 180,
      backgroundColor: 'rgba(208, 192, 247, 0.2)',
      boxShadow: ''
    },
  },

  {
    id: '2-2',
    data: {
      label: 'Node with Toolbar',
    },
    type: 'tools',
    position: { x: 50, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
      boxShadow: ''
    },

    parentId: '2-1',
    extent: 'parent',
  },


  {
    id: '2-3',
    type: 'resizer',
    data: {
      label: 'resizable node',
    },
    position: { x: 250, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
      color: 'white',
      boxShadow: ''
    },
    parentId: '2-1',
    extent: 'parent',
  },


  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: true,
    selectable: true,
    style: {
      boxShadow: ''
    },
    data: {
      level: 3,
      label: <>Nodes and edges can be anything and are fully customizable!</>,
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-35px, 20px) rotate(-80deg)',
      },
    },
    position: { x: -40, y: 570 },
  },
  {
    id: '3-2',
    type: 'textinput',
    position: { x: 150, y: 650 },
    data: {},
    style: {
      boxShadow: ''
    }
  },
  {
    id: '3-1',
    type: 'circle',
    position: { x: 350, y: 500 },
    data: {},
    style: {
      boxShadow: ''
    }
  },
];

export const edges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge',
    type: 'smoothstep',
  },
  {
    id: 'e1-3',
    source: '1-1',
    target: '1-3',
    animated: true,
    label: 'animated edge',
  },
  {
    id: 'e2-2',
    source: '1-2',
    target: '2-2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-3',
    source: '2-2',
    target: '2-3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-3',
    source: '2-3',
    sourceHandle: 'a',
    target: '3-2',
    type: 'button',
    animated: true,
    style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '2-3',
    sourceHandle: 'b',
    target: '3-1',
    type: 'button',
    style: { strokeWidth: 2 },
  },
];
