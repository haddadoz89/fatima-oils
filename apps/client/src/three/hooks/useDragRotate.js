import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Hook for drag-to-rotate functionality in 3D scenes
export const useDragRotate = (initialRotation = 0) => {
  const [rotation, setRotation] = useState(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const previousX = useRef(0);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    previousX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousX.current;
      setRotation((prev) => prev + deltaX * 0.01);
      previousX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return {
    rotation,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
    },
  };
};
