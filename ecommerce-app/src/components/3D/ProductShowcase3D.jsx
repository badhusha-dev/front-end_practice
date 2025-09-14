import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Center } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// 3D Product Model based on product type
function ProductModel3D({ product, isHovered, ...props }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Animation for hover effect
  const { scale, rotation } = useSpring({
    scale: hovered || isHovered ? 1.1 : 1,
    rotation: hovered || isHovered ? [0, Math.PI * 0.1, 0] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Determine product shape based on category
  const getProductShape = (category) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return 'box';
      case 'food & beverage':
        return 'cylinder';
      case 'sports & fitness':
        return 'sphere';
      default:
        return 'box';
    }
  };

  const shape = getProductShape(product.category);

  return (
    <animated.group ref={meshRef} scale={scale} rotation={rotation}>
      <mesh
        {...props}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {shape === 'box' && <boxGeometry args={[2, 2.5, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 32, 32]} />}
        {shape === 'cylinder' && <cylinderGeometry args={[1, 1, 2.5, 32]} />}
        
        <meshStandardMaterial 
          color={product.color || '#3b82f6'} 
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Product label - simplified */}
      <Center position={[0, shape === 'cylinder' ? 2 : 3, 0]}>
        <mesh>
          <planeGeometry args={[3, 0.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </Center>
      
      {/* Price tag - simplified */}
      <Center position={[0, shape === 'cylinder' ? -2 : -3, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
        </mesh>
      </Center>
    </animated.group>
  );
}

// Floating price tags
function FloatingPriceTags({ products }) {
  return (
    <>
      {products.map((product, index) => {
        const angle = (index / products.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={product.id} position={[x, 2, z]}>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        );
      })}
    </>
  );
}

// Main Product Showcase Component
const ProductShowcase3D = ({ 
  products = [], 
  selectedProduct = null,
  className = '',
  style = {}
}) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  
  // Default products if none provided
  const defaultProducts = [
    { id: '1', name: 'Wireless Headphones', price: 199.99, category: 'Electronics', color: '#3b82f6' },
    { id: '2', name: 'Smart Watch', price: 299.99, category: 'Electronics', color: '#10b981' },
    { id: '3', name: 'Coffee Beans', price: 24.99, category: 'Food & Beverage', color: '#8b5cf6' },
  ];
  
  const displayProducts = products.length > 0 ? products : defaultProducts;
  const mainProduct = selectedProduct || displayProducts[0];

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
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[10, 10, -10]} intensity={0.3} color="#10b981" />
        
        {/* Environment - simplified */}
        <fog attach="fog" args={['#87CEEB', 10, 50]} />
        
        {/* Main product display */}
        <ProductModel3D 
          product={mainProduct} 
          position={[0, 0, 0]}
          isHovered={hoveredProduct === mainProduct.id}
        />
        
        {/* Surrounding products */}
        {displayProducts.slice(1, 4).map((product, index) => {
          const angle = (index + 1) * (Math.PI * 2 / 4);
          const radius = 4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <ProductModel3D
              key={product.id}
              product={product}
              position={[x, 0, z]}
              isHovered={hoveredProduct === product.id}
            />
          );
        })}
        
        {/* Floating price tags */}
        <FloatingPriceTags products={displayProducts.slice(0, 3)} />
        
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
        <h3 className="text-lg font-semibold mb-2">3D Product Showcase</h3>
        <p className="text-sm opacity-90">
          Interactive 3D view • Rotate to explore • Hover for details
        </p>
      </div>
      
      {/* Product selector */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Products</h4>
        <div className="space-y-1">
          {displayProducts.slice(0, 4).map((product) => (
            <button
              key={product.id}
              className="block w-full text-left text-xs text-gray-700 hover:text-primary-600 transition-colors duration-200"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase3D;
