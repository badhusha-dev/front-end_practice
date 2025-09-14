import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Text, ContactShadows } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { MdArrowBack, MdArrowForward, MdClose } from 'react-icons/md';

// 3D Product Card Component
const ProductCard3D = ({ product, position, rotation, scale, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  const { scale: animatedScale } = useSpring({
    scale: hovered ? 1.2 : scale,
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.group
      position={position}
      rotation={rotation}
      scale={animatedScale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Product Box */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2.5, 0.5]} />
        <meshStandardMaterial
          color={hovered ? "#4F46E5" : "#6366F1"}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Product Image Plane */}
      <mesh position={[0, 0, 0.26]}>
        <planeGeometry args={[1.8, 2.3]} />
        <meshBasicMaterial transparent>
          <primitive object={new THREE.TextureLoader().load(product.image)} />
        </meshBasicMaterial>
      </mesh>

      {/* Product Name */}
      <Center position={[0, -1.5, 0.3]}>
        <Text
          fontSize={0.2}
          color="#1F2937"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {product.name}
        </Text>
      </Center>

      {/* Price Tag */}
      <mesh position={[0.8, 1, 0.3]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
      <Center position={[0.8, 1, 0.31]}>
        <Text
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ${product.price}
        </Text>
      </Center>

      {/* Rating Stars */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[-0.6 + i * 0.15, 1.2, 0.3]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color={i < Math.floor(product.rating) ? "#FCD34D" : "#E5E7EB"} />
        </mesh>
      ))}
    </animated.group>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particlesRef = useRef();
  const particleCount = 50;

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.children.forEach((particle, index) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + index) * 0.001;
        particle.position.x += Math.cos(state.clock.elapsedTime + index * 0.5) * 0.001;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {[...Array(particleCount)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
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

// Main 3D Gallery Component
const ProductGallery3D = ({ products, onProductSelect, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProduct = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevProduct = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleProductClick = (product) => {
    onProductSelect(product);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="w-full h-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all duration-200"
        >
          <MdClose className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={prevProduct}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all duration-200"
        >
          <MdArrowBack className="w-6 h-6" />
        </button>

        <button
          onClick={nextProduct}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white transition-all duration-200"
        >
          <MdArrowForward className="w-6 h-6" />
        </button>

        {/* Product Counter */}
        <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-20 rounded-full px-4 py-2 text-white">
          {selectedIndex + 1} / {products.length}
        </div>

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <Suspense fallback={null}>
            {/* Main Product */}
            <ProductCard3D
              product={products[selectedIndex]}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              onClick={() => handleProductClick(products[selectedIndex])}
            />

            {/* Side Products */}
            {products.map((product, index) => {
              if (index === selectedIndex) return null;
              
              const offset = index - selectedIndex;
              const position = [offset * 3, 0, -2];
              const rotation = [0, offset * 0.3, 0];
              const scale = 0.7;

              return (
                <ProductCard3D
                  key={product.id}
                  product={product}
                  position={position}
                  rotation={rotation}
                  scale={scale}
                  onClick={() => setSelectedIndex(index)}
                />
              );
            })}

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Ground Shadow */}
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.3}
              scale={10}
              blur={2}
              far={2}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>

        {/* Product Info Overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white max-w-md">
          <h3 className="text-2xl font-bold mb-2">{products[selectedIndex]?.name}</h3>
          <p className="text-sm opacity-90 mb-4">{products[selectedIndex]?.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${products[selectedIndex]?.price}</span>
            <button
              onClick={() => handleProductClick(products[selectedIndex])}
              className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setSelectedIndex(index)}
              className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                index === selectedIndex ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery3D;
