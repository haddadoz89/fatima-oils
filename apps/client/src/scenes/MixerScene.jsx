import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Placeholder for future 3D mixer scene
// This will display jars on shelves with interactive selection
export const MixerScene = ({ products = [], onProductClick }) => {
  return (
    <div className="w-full h-[500px] canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 3, 10]} />
        <OrbitControls />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <spotLight position={[0, 10, 0]} intensity={0.5} />

        {/* Wooden shelf */}
        <mesh position={[0, 0, -2]}>
          <boxGeometry args={[15, 0.3, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Glass jars arranged on shelf */}
        {products.slice(0, 6).map((product, index) => {
          const x = (index - 2.5) * 2.5;
          
          return (
            <group
              key={product.id}
              position={[x, 0.8, -2]}
              onClick={() => onProductClick?.(product)}
            >
              {/* Jar body */}
              <mesh>
                <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
                <meshPhysicalMaterial
                  color="#E8F4F8"
                  transparent
                  opacity={0.7}
                  roughness={0.1}
                  metalness={0.1}
                />
              </mesh>
              
              {/* Jar lid */}
              <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.42, 0.42, 0.1, 16]} />
                <meshStandardMaterial color="#8B7355" />
              </mesh>
            </group>
          );
        })}
      </Canvas>
    </div>
  );
};
