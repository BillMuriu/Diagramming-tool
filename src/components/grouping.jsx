import zIndex from '@mui/material/styles/zIndex';
import React from 'react';
import { MarkerType } from 'reactflow';

export const nodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Node 0' },
      position: { x: 10, y: 5 },
      className: 'light',
      style: {
        boxShadow: ''
      },
      zIndex: 1
    },
    {
      id: '2',
      data: { label: 'Group A' },
      position: { x: 10, y: 100 },
      className: 'light',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        width: 200, 
        height: 200,
        boxShadow: '5px 10px 15px 10px rgba(0, 0, 0, 0.3)',
      },
      zIndex: 0
    },
    {
      id: '2a',
      data: { label: 'Node A.1' },
      position: { x: 10, y: 50 },
      style: {
        boxShadow: ''
      },
      zIndex: 2
    },
    {
      id: '3',
      data: { label: 'Node 1' },
      position: { x: 10, y: 100 },
      className: 'light',
      style: {
        boxShadow: ''
      },
      zIndex: 3
    },
    {
      id: '4',
      data: { label: 'Group B' },
      position: { x: 10, y: 200 },
      className: 'light',
      style: { 
        backgroundColor: 'rgba(255, 0, 0, 0.7)', 
        width: 300, 
        height: 300,
        boxShadow: '5px 10px 15px 10px rgba(0, 0, 0, 0.3)',
     },
     zIndex: 4
    },
    {
      id: '4b',
      data: { label: 'Group B.A' },
      position: { x: 10, y: 120 },
      className: 'light',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        width: 150, 
        height: 270,
        boxShadow: '5px 10px 15px 10px rgba(0, 0, 0, 0.3)',
      },
      zIndex: 5
    },
  ];
  
  export const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2a-4a', source: '2a', target: '4a' },
    { id: 'e3-4b', source: '3', target: '4b' },
    { id: 'e4a-4b1', source: '4a', target: '4b1' },
    { id: 'e4a-4b2', source: '4a', target: '4b2' },
    { id: 'e4b1-4b2', source: '4b1', target: '4b2' },
  ];