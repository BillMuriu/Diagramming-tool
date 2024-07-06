import { useState, useCallback } from 'react';
import { useReactFlow } from 'reactflow';

const useBoxShadow = (setNodes) => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedNodeBoxShadow, setSelectedNodeBoxShadow] = useState('');
  const [selectedNodeTypes, setSelectedNodeTypes] = useState('');
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [blurRadius, setBlurRadius] = useState(0);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.75)'); // Initial shadow color

  const reactFlow = useReactFlow();

  const updateSelectedNode = useCallback(() => {
    const nodes = reactFlow.getNodes();
    const selectedNodes = nodes.filter(node => node.selected);

    const selectedTypes = selectedNodes.map(node => node.type);
    setSelectedNodeTypes(selectedTypes);

    if (selectedNodes.length > 0) {
      const boxShadow = selectedNodes[0].style.boxShadow || '';
      setSelectedNodeBoxShadow(boxShadow);

      const regex = /(\-?\d+px)\s+(\-?\d+px)\s+(\-?\d+px)\s+(\-?\d+px)\s+rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
      const match = boxShadow.match(regex);
      
      if (match) {
        const r = parseInt(match[5], 10);
        const g = parseInt(match[6], 10);
        const b = parseInt(match[7], 10);
        const a = parseFloat(match[8]);
        
        console.log('RGBA values:', { r, g, b, a });

        setHorizontalOffset(parseInt(match[1], 10));
        setVerticalOffset(parseInt(match[2], 10));
        setBlurRadius(parseInt(match[3], 10));
        setSpreadRadius(parseInt(match[4], 10));
        setShadowColor(`rgba(${r}, ${g}, ${b}, ${a})`);
      } else {
        console.log('No match found for Box Shadow:', boxShadow);
        setHorizontalOffset(0);
        setVerticalOffset(0);
        setBlurRadius(0);
        setSpreadRadius(0);
        setShadowColor('rgba(0, 0, 0, 0.75)');
      }
    } else {
      console.log('No selected nodes.');
      setSelectedNodeBoxShadow('');
      setHorizontalOffset(0);
      setVerticalOffset(0);
      setBlurRadius(0);
      setSpreadRadius(0);
      setShadowColor('rgba(0, 0, 0, 0.75)');
    }
  }, [reactFlow]);

  return {
    selectedNodes,
    selectedNodeBoxShadow,
    selectedNodeTypes,
    horizontalOffset,
    verticalOffset,
    blurRadius,
    spreadRadius,
    shadowColor,
    setHorizontalOffset,
    setVerticalOffset,
    setBlurRadius,
    setSpreadRadius,
    setShadowColor,
    updateSelectedNode,
    setSelectedNodes
  };
};

export default useBoxShadow;
