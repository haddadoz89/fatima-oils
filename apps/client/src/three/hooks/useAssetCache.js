import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

// Hook for caching and loading 3D assets
export const useAssetCache = () => {
  const loadModel = (url) => {
    try {
      return useLoader(GLTFLoader, url);
    } catch (error) {
      console.error('Error loading model:', error);
      return null;
    }
  };

  const loadTexture = (url) => {
    try {
      return useLoader(TextureLoader, url);
    } catch (error) {
      console.error('Error loading texture:', error);
      return null;
    }
  };

  return { loadModel, loadTexture };
};
