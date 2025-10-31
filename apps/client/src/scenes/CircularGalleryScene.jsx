import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Placeholder for future 3D circular gallery scene
// This will display bottles of oils in a rotating circular shelf
export const CircularGalleryScene = ({ products = [] }) => {
  return (
    <div className="w-full h-[600px] canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <OrbitControls enableZoom={false} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Placeholder for circular shelf */}
        <mesh>
          <cylinderGeometry args={[5, 5, 0.2, 32]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Placeholder bottles arranged in a circle */}
        {products.slice(0, 8).map((product, index) => {
          const angle = (index / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 4;
          const z = Math.sin(angle) * 4;
          
          return (
            <mesh key={product.id} position={[x, 0.5, z]}>
              <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
              <meshStandardMaterial color="#90EE90" transparent opacity={0.8} />
            </mesh>
          );
        })}
      </Canvas>
    </div>
  );
};
