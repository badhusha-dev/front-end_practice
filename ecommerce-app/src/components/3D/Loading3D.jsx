import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

// 3D Spinner Component
const Spinner3D = ({ size = 1, color = "#4F46E5" }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[size, size * 0.3, 8, 16]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Pulsing Sphere
const PulsingSphere = ({ size = 1, color = "#10B981" }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

// Floating Cubes
const FloatingCubes = ({ count = 8 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.children.forEach((cube, index) => {
        cube.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
        cube.rotation.x += 0.01;
        cube.rotation.z += 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial
              color={`hsl(${(i * 360) / count}, 70%, 60%)`}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// DNA Helix Loader
const DNAHelix = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(20)].map((_, i) => {
        const t = i / 20;
        const angle = t * Math.PI * 4;
        const radius = 1;
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;
        const y = (t - 0.5) * 4;

        return (
          <group key={i}>
            <mesh position={[x1, y, z1]}>
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color="#4F46E5" />
            </mesh>
            <mesh position={[x2, y, z2]}>
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>
            <mesh position={[x1, y, z1]}>
              <cylinderGeometry args={[0.02, 0.02, Math.sqrt((x2-x1)**2 + (z2-z1)**2), 8]} />
              <meshStandardMaterial color="#6366F1" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Particle System
const ParticleSystem = ({ count = 100 }) => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
        particle.position.x += Math.cos(state.clock.elapsedTime + index * 0.5) * 0.005;
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {[...Array(count)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02 + Math.random() * 0.03]} />
          <meshStandardMaterial
            color={`hsl(${Math.random() * 360}, 70%, 60%)`}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Loading Component
const Loading3D = ({ 
  type = "spinner", 
  size = 1, 
  color = "#4F46E5",
  text = "Loading...",
  showText = true 
}) => {
  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return <Spinner3D size={size} color={color} />;
      case "pulsing":
        return <PulsingSphere size={size} color={color} />;
      case "cubes":
        return <FloatingCubes count={8} />;
      case "dna":
        return <DNAHelix />;
      case "particles":
        return <ParticleSystem count={50} />;
      default:
        return <Spinner3D size={size} color={color} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-32 h-32 mb-4">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {renderLoader()}
        </Canvas>
      </div>
      
      {showText && (
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700 mb-2">{text}</div>
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

// Inline Loading Component
const InlineLoading3D = ({ size = 0.5, type = "spinner", color = "#4F46E5" }) => {
  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return <Spinner3D size={size} color={color} />;
      case "pulsing":
        return <PulsingSphere size={size} color={color} />;
      case "cubes":
        return <FloatingCubes count={4} />;
      case "particles":
        return <ParticleSystem count={20} />;
      default:
        return <Spinner3D size={size} color={color} />;
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-12 h-12">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 3]} intensity={1} />
          
          {renderLoader()}
        </Canvas>
      </div>
    </div>
  );
};

export default Loading3D;
export { InlineLoading3D };