import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

// 3D Transition Particles
const TransitionParticles = ({ isActive }) => {
  const particlesRef = useRef();
  const particleCount = 100;

  useFrame((state) => {
    if (particlesRef.current && isActive) {
      particlesRef.current.rotation.y += 0.01;
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.02;
        particle.position.x += Math.cos(state.clock.elapsedTime + index * 0.5) * 0.01;
        particle.rotation.x += 0.01;
        particle.rotation.z += 0.01;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {[...Array(particleCount)].map((_, i) => (
        <animated.mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
          ]}
        >
          <tetrahedronGeometry args={[0.1 + Math.random() * 0.2]} />
          <meshStandardMaterial
            color={`hsl(${240 + Math.random() * 60}, 80%, 60%)`}
            transparent
            opacity={0.8}
          />
        </animated.mesh>
      ))}
    </group>
  );
};

// 3D Transition Cube
const TransitionCube = ({ isActive, progress }) => {
  const cubeRef = useRef();

  useFrame((state) => {
    if (cubeRef.current && isActive) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
      cubeRef.current.rotation.z += 0.01;
      cubeRef.current.scale.setScalar(1 + progress * 2);
    }
  });

  return (
    <animated.mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#4F46E5"
        transparent
        opacity={0.8}
        wireframe
      />
    </animated.mesh>
  );
};

// Main Page Transition Component
const PageTransition3D = ({ isActive, duration = 1000, children }) => {
  const [showContent, setShowContent] = useState(!isActive);

  const { progress, opacity } = useSpring({
    progress: isActive ? 1 : 0,
    opacity: isActive ? 1 : 0,
    config: { duration }
  });

  useEffect(() => {
    if (isActive) {
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowContent(true);
      }, duration / 2);
      return () => clearTimeout(timer);
    } else {
      setShowContent(true);
    }
  }, [isActive, duration]);

  return (
    <div className="relative w-full h-full">
      {/* 3D Transition Overlay */}
      {isActive && (
        <div className="fixed inset-0 z-50 bg-black">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            
            <TransitionCube isActive={isActive} progress={progress.get()} />
            <TransitionParticles isActive={isActive} />
          </Canvas>
          
          {/* Loading Text */}
          <animated.div
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">Loading...</div>
              <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <animated.div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: progress.to(p => `${p * 100}%`) }}
                />
              </div>
            </div>
          </animated.div>
        </div>
      )}

      {/* Content */}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition3D;
