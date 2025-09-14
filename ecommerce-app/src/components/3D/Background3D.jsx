import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

// Floating Geometric Shapes
const FloatingShapes = ({ count = 20 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.children.forEach((shape, index) => {
        shape.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002;
        shape.rotation.x += 0.005;
        shape.rotation.z += 0.003;
      });
    }
  });

  const shapes = ['box', 'sphere', 'torus', 'cone', 'cylinder'];

  return (
    <group ref={groupRef}>
      {[...Array(count)].map((_, i) => {
        const shapeType = shapes[i % shapes.length];
        const angle = (i / count) * Math.PI * 2;
        const radius = 15 + Math.random() * 10;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 20;

        const geometry = (() => {
          switch (shapeType) {
            case 'box':
              return <boxGeometry args={[1 + Math.random(), 1 + Math.random(), 1 + Math.random()]} />;
            case 'sphere':
              return <sphereGeometry args={[0.5 + Math.random() * 0.5, 8, 8]} />;
            case 'torus':
              return <torusGeometry args={[0.5 + Math.random(), 0.2, 8, 16]} />;
            case 'cone':
              return <coneGeometry args={[0.5 + Math.random(), 1 + Math.random(), 8]} />;
            case 'cylinder':
              return <cylinderGeometry args={[0.3 + Math.random(), 0.3 + Math.random(), 1 + Math.random(), 8]} />;
            default:
              return <boxGeometry args={[1, 1, 1]} />;
          }
        })();

        return (
          <mesh key={i} position={[x, y, z]}>
            {geometry}
            <meshStandardMaterial
              color={`hsl(${200 + Math.random() * 60}, 70%, 60%)`}
              transparent
              opacity={0.3 + Math.random() * 0.4}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Particle System
const ParticleSystem = ({ count = 200 }) => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.005;
        particle.position.x += Math.cos(state.clock.elapsedTime + index * 0.5) * 0.003;
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
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
          ]}
        >
          <sphereGeometry args={[0.02 + Math.random() * 0.03]} />
          <meshStandardMaterial
            color={`hsl(${Math.random() * 360}, 70%, 60%)`}
            transparent
            opacity={0.4 + Math.random() * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// Animated Grid
const AnimatedGrid = () => {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -10]}>
      <mesh>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial
          color="#4F46E5"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

// Floating Text
const FloatingText = ({ text, position = [0, 0, 0], color = "#4F46E5" }) => {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
      textRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <mesh>
        <planeGeometry args={[4, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Wave Animation
const WaveAnimation = () => {
  const waveRef = useRef();

  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.children.forEach((vertex, index) => {
        vertex.position.y = Math.sin(state.clock.elapsedTime * 2 + index * 0.1) * 0.5;
      });
    }
  });

  return (
    <group ref={waveRef}>
      {[...Array(50)].map((_, i) => {
        const x = (i - 25) * 0.5;
        return (
          <mesh key={i} position={[x, 0, -5]}>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial
              color="#10B981"
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Main Background Component
const Background3D = ({ 
  type = "particles",
  intensity = "medium",
  color = "#4F46E5",
  text = "",
  interactive = false
}) => {
  const getIntensitySettings = () => {
    switch (intensity) {
      case "low":
        return { particleCount: 50, shapeCount: 10, starCount: 1000 };
      case "medium":
        return { particleCount: 100, shapeCount: 20, starCount: 2000 };
      case "high":
        return { particleCount: 200, shapeCount: 40, starCount: 5000 };
      default:
        return { particleCount: 100, shapeCount: 20, starCount: 2000 };
    }
  };

  const settings = getIntensitySettings();

  const renderBackground = () => {
    switch (type) {
      case "particles":
        return <ParticleSystem count={settings.particleCount} />;
      case "shapes":
        return <FloatingShapes count={settings.shapeCount} />;
      case "grid":
        return <AnimatedGrid />;
      case "waves":
        return <WaveAnimation />;
      case "mixed":
        return (
          <>
            <ParticleSystem count={settings.particleCount / 2} />
            <FloatingShapes count={settings.shapeCount / 2} />
            <AnimatedGrid />
            <WaveAnimation />
          </>
        );
      default:
        return <ParticleSystem count={settings.particleCount} />;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />

        <Suspense fallback={null}>
          {/* Stars */}
          <Stars
            radius={100}
            depth={50}
            count={settings.starCount}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Main Background Elements */}
          {renderBackground()}

          {/* Floating Text */}
          {text && (
            <FloatingText text={text} color={color} position={[0, 5, 0]} />
          )}

          {/* Simple fog instead of environment to avoid texture loading issues */}
          <fog attach="fog" args={['#1a1a2e', 10, 50]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Interactive Background
const InteractiveBackground3D = ({ children }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <div className="relative w-full h-full">
      <Background3D type="mixed" intensity="high" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background3D;
export { InteractiveBackground3D };
