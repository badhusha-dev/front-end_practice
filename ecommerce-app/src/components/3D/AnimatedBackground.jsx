import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';

// Animated geometric shapes
function FloatingShape({ position, color, shape = 'box' }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {shape === 'box' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : shape === 'sphere' ? (
        <sphereGeometry args={[0.5, 32, 32]} />
      ) : (
        <coneGeometry args={[0.5, 1, 8]} />
      )}
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

// Floating text animation
function FloatingText({ position, color = '#ffffff', text = 'Text' }) {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    }
  });

  return (
    <mesh ref={textRef} position={position}>
      <planeGeometry args={[4, 0.5]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

// Animated background with geometric shapes and particles
const AnimatedBackground = ({ className = '', style = {} }) => {
  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(45deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
        
        {/* Stars field */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        {/* Floating clouds */}
        <Cloud
          position={[-4, 2, -25]}
          speed={0.4}
          opacity={0.3}
          color="#ffffff"
        />
        <Cloud
          position={[4, -2, -25]}
          speed={0.6}
          opacity={0.2}
          color="#ffffff"
        />
        
        {/* Floating geometric shapes */}
        <FloatingShape position={[-3, 1, -2]} color="#3b82f6" shape="box" />
        <FloatingShape position={[3, -1, -3]} color="#10b981" shape="sphere" />
        <FloatingShape position={[0, 2, -4]} color="#f59e0b" shape="cone" />
        <FloatingShape position={[-2, -2, -1]} color="#ef4444" shape="box" />
        <FloatingShape position={[2, 1.5, -5]} color="#8b5cf6" shape="sphere" />
        
        {/* Floating text elements */}
        <FloatingText text="E-commerce" position={[-2, 3, -6]} />
        <FloatingText text="3D Experience" position={[2, -3, -6]} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
