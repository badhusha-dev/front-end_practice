import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { MdShoppingCart, MdFavorite, MdCompare, MdSearch } from 'react-icons/md';

// 3D Button Component
const Button3D = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  icon,
  disabled = false,
  className = ""
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !disabled) {
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * 0.1;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05;
      } else {
        meshRef.current.rotation.x = 0;
        meshRef.current.position.y = 0;
      }
    }
  });

  const { scale, position } = useSpring({
    scale: pressed ? 0.95 : hovered ? 1.05 : 1,
    position: pressed ? [0, -0.05, 0] : [0, 0, 0],
    config: { tension: 300, friction: 10 }
  });

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return { base: "#4F46E5", hover: "#4338CA", pressed: "#3730A3" };
      case "secondary":
        return { base: "#6B7280", hover: "#4B5563", pressed: "#374151" };
      case "success":
        return { base: "#10B981", hover: "#059669", pressed: "#047857" };
      case "danger":
        return { base: "#EF4444", hover: "#DC2626", pressed: "#B91C1C" };
      case "warning":
        return { base: "#F59E0B", hover: "#D97706", pressed: "#B45309" };
      default:
        return { base: "#4F46E5", hover: "#4338CA", pressed: "#3730A3" };
    }
  };

  const getSizeDimensions = () => {
    switch (size) {
      case "sm":
        return { width: 2, height: 0.6, depth: 0.3 };
      case "md":
        return { width: 3, height: 0.8, depth: 0.4 };
      case "lg":
        return { width: 4, height: 1, depth: 0.5 };
      case "xl":
        return { width: 5, height: 1.2, depth: 0.6 };
      default:
        return { width: 3, height: 0.8, depth: 0.4 };
    }
  };

  const colors = getVariantColors();
  const dimensions = getSizeDimensions();
  const currentColor = pressed ? colors.pressed : hovered ? colors.hover : colors.base;

  return (
    <div className={`inline-block ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ width: '200px', height: '80px' }}
        onPointerMissed={() => setHovered(false)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <animated.group
          ref={meshRef}
          scale={scale}
          position={position}
          onClick={() => !disabled && onClick()}
          onPointerOver={() => !disabled && setHovered(true)}
          onPointerOut={() => !disabled && setHovered(false)}
          onPointerDown={() => !disabled && setPressed(true)}
          onPointerUp={() => !disabled && setPressed(false)}
        >
          {/* Main Button */}
          <mesh>
            <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
            <meshStandardMaterial
              color={disabled ? "#9CA3AF" : currentColor}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Button Text */}
          <mesh position={[0, 0, dimensions.depth / 2 + 0.01]}>
            <planeGeometry args={[dimensions.width * 0.8, dimensions.height * 0.6]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
          </mesh>

          {/* Icon */}
          {icon && (
            <mesh position={[-dimensions.width * 0.3, 0, dimensions.depth / 2 + 0.02]}>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          )}

          {/* Hover Effect */}
          {hovered && !disabled && (
            <mesh position={[0, 0, -dimensions.depth / 2 - 0.1]}>
              <boxGeometry args={[dimensions.width + 0.2, dimensions.height + 0.2, 0.1]} />
              <meshStandardMaterial
                color={colors.base}
                transparent
                opacity={0.3}
              />
            </mesh>
          )}
        </animated.group>
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white font-semibold text-sm">
          {children}
        </span>
      </div>
    </div>
  );
};

// 3D Icon Button
const IconButton3D = ({ 
  icon, 
  onClick, 
  variant = "primary", 
  size = "md",
  disabled = false,
  className = ""
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !disabled) {
      if (hovered) {
        meshRef.current.rotation.y += 0.05;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 6) * 0.1;
      } else {
        meshRef.current.position.y = 0;
      }
    }
  });

  const { scale } = useSpring({
    scale: pressed ? 0.9 : hovered ? 1.1 : 1,
    config: { tension: 300, friction: 10 }
  });

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return { base: "#4F46E5", hover: "#4338CA" };
      case "secondary":
        return { base: "#6B7280", hover: "#4B5563" };
      case "success":
        return { base: "#10B981", hover: "#059669" };
      case "danger":
        return { base: "#EF4444", hover: "#DC2626" };
      default:
        return { base: "#4F46E5", hover: "#4338CA" };
    }
  };

  const colors = getVariantColors();
  const currentColor = hovered ? colors.hover : colors.base;

  return (
    <div className={`inline-block relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ width: '60px', height: '60px' }}
        onPointerMissed={() => setHovered(false)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <animated.group
          ref={meshRef}
          scale={scale}
          onClick={() => !disabled && onClick()}
          onPointerOver={() => !disabled && setHovered(true)}
          onPointerOut={() => !disabled && setHovered(false)}
          onPointerDown={() => !disabled && setPressed(true)}
          onPointerUp={() => !disabled && setPressed(false)}
        >
          {/* Icon Background */}
          <mesh>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial
              color={disabled ? "#9CA3AF" : currentColor}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Icon Representation */}
          <mesh position={[0, 0, 0.85]}>
            <boxGeometry args={[0.3, 0.3, 0.1]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </animated.group>
      </Canvas>
      
      {/* Overlay Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-lg">
          {icon === 'cart' && <MdShoppingCart />}
          {icon === 'favorite' && <MdFavorite />}
          {icon === 'compare' && <MdCompare />}
          {icon === 'search' && <MdSearch />}
        </div>
      </div>
    </div>
  );
};

// 3D Card Component
const Card3D = ({ 
  children, 
  onClick,
  hoverable = true,
  className = ""
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && hoverable) {
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      } else {
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.z = 0;
      }
    }
  });

  const { scale, position } = useSpring({
    scale: hovered ? 1.02 : 1,
    position: hovered ? [0, 0.1, 0] : [0, 0, 0],
    config: { tension: 300, friction: 10 }
  });

  return (
    <div className={`inline-block ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: '300px', height: '200px' }}
        onPointerMissed={() => setHovered(false)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <animated.group
          ref={meshRef}
          scale={scale}
          position={position}
          onClick={onClick}
          onPointerOver={() => hoverable && setHovered(true)}
          onPointerOut={() => hoverable && setHovered(false)}
        >
          {/* Card Base */}
          <mesh>
            <boxGeometry args={[4, 3, 0.2]} />
            <meshStandardMaterial
              color={hovered ? "#F3F4F6" : "#FFFFFF"}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>

          {/* Card Border */}
          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[4.1, 3.1, 0.02]} />
            <meshStandardMaterial
              color={hovered ? "#4F46E5" : "#E5E7EB"}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Shadow */}
          <mesh position={[0, -1.6, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[4.5, 3.5]} />
            <meshBasicMaterial
              color="#000000"
              transparent
              opacity={hovered ? 0.2 : 0.1}
            />
          </mesh>
        </animated.group>
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="text-center text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Button3D;
export { IconButton3D, Card3D };
