import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// 3D Logo component
function Logo3D({ isHovered }) {
  const meshRef = useRef();
  
  // Animation properties
  const { scale, rotation } = useSpring({
    scale: isHovered ? 1.2 : 1,
    rotation: isHovered ? [0, Math.PI, 0] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <animated.group ref={meshRef} scale={scale} rotation={rotation}>
      {/* Main logo shape - stylized "E" */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Logo accent pieces */}
      <mesh position={[0.3, 1, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.3, 0.2]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.3, 0, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.3, 0.2]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.3, -1, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.3, 0.2]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Glowing effect */}
      <mesh position={[0, 0, 0.6]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </animated.group>
  );
}

// Floating particles around logo
function LogoParticles({ count = 20 }) {
  const particlesRef = useRef();
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.005;
    }
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    
    // Random colors between blue shades
    colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
    colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  );
}

// Main Interactive Logo Component
const InteractiveLogo = ({ 
  size = 'medium', 
  showText = true, 
  className = '',
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        {/* Environment - simplified */}
        <fog attach="fog" args={['#87CEEB', 10, 50]} />
        
        {/* Main logo */}
        <Logo3D isHovered={isHovered} />
        
        {/* Floating particles */}
        <LogoParticles count={30} />
        
        {/* Company name text - simplified */}
        {showText && (
          <Center position={[0, -4, 0]}>
            <mesh>
              <planeGeometry args={[3, 0.8]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
            </mesh>
          </Center>
        )}
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={!isHovered}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
      
      {/* Hover effect overlay */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveLogo;
