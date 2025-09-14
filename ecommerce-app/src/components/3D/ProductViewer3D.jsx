import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Center } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// 3D Product Box Component
function ProductBox({ product, position, rotation, color, ...props }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Animation for hover effect
  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <animated.group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh
        {...props}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2.5, 1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Product label - simplified */}
      <Center position={[0, 3, 0]}>
        <mesh>
          <planeGeometry args={[3, 0.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </Center>
    </animated.group>
  );
}

// Floating particles for ambient effect
function FloatingParticles({ count = 100 }) {
  const particlesRef = useRef();
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// Main 3D Product Viewer Component
const ProductViewer3D = ({ style, className }) => {

  const products = [
    { name: 'Headphones', color: '#3b82f6', position: [-3, 0, 0] },
    { name: 'Smartwatch', color: '#10b981', position: [0, 0, 0] },
    { name: 'Laptop', color: '#8b5cf6', position: [3, 0, 0] },
  ];

  return (
    <div className={`w-full h-96 ${className}`} style={style}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        shadows
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment - simplified */}
        <fog attach="fog" args={['#87CEEB', 10, 50]} />
        
        {/* Product displays */}
        {products.map((prod, index) => (
          <ProductBox
            key={index}
            product={prod}
            position={prod.position}
            rotation={[0, index * 0.5, 0]}
            color={prod.color}
          />
        ))}
        
        {/* Floating particles */}
        <FloatingParticles count={50} />
        
        {/* Ground shadow */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.25}
          scale={10}
          blur={1.5}
          far={2}
        />
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Product info overlay */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-2">Interactive 3D Showcase</h3>
        <p className="text-sm opacity-90">
          Rotate, zoom, and explore our products in 3D
        </p>
      </div>
    </div>
  );
};

export default ProductViewer3D;
