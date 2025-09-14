import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Text, ContactShadows } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { MdShoppingCart, MdClose, MdRemove, MdAdd } from 'react-icons/md';
import { useCartStore } from '../../features/cart/cartStore';

// 3D Cart Item Component
const CartItem3D = ({ item, position, onRemove, onUpdateQuantity }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
    }
  });

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.group
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Product Box */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial
          color={hovered ? "#10B981" : "#6366F1"}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Product Image */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshBasicMaterial transparent>
          <primitive object={new THREE.TextureLoader().load(item.image)} />
        </meshBasicMaterial>
      </mesh>

      {/* Product Name */}
      <Center position={[0, -1.2, 0.2]}>
        <Text
          fontSize={0.15}
          color="#1F2937"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {item.name}
        </Text>
      </Center>

      {/* Price */}
      <Center position={[0, -1.4, 0.2]}>
        <Text
          fontSize={0.1}
          color="#059669"
          anchorX="center"
          anchorY="middle"
        >
          ${item.price} x {item.quantity}
        </Text>
      </Center>

      {/* Quantity Controls */}
      <mesh position={[0, -1.6, 0.2]}>
        <planeGeometry args={[0.8, 0.2]} />
        <meshStandardMaterial color="#F3F4F6" transparent opacity={0.8} />
      </mesh>
    </animated.group>
  );
};

// Floating Cart Icon
const FloatingCartIcon = ({ itemCount, position }) => {
  const iconRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (iconRef.current) {
      iconRef.current.rotation.y += 0.02;
      iconRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.group
      ref={iconRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cart Base */}
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 8]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>

      {/* Cart Handle */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>

      {/* Item Count Badge */}
      <mesh position={[0.7, 0.7, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <Center position={[0.7, 0.7, 0.01]}>
        <Text
          fontSize={0.2}
          color="#EF4444"
          anchorX="center"
          anchorY="middle"
        >
          {itemCount}
        </Text>
      </Center>
    </animated.group>
  );
};

// Main Cart Preview Component
const CartPreview3D = ({ isOpen, onClose }) => {
  const { items, itemCount, total, removeItem, updateQuantity } = useCartStore();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, quantity);
    }
  };

  if (!isOpen) return null;

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

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <Suspense fallback={null}>
            {/* Cart Icon */}
            <FloatingCartIcon itemCount={itemCount} position={[0, 2, 0]} />

            {/* Cart Items */}
            {items.map((item, index) => {
              const angle = (index / items.length) * Math.PI * 2;
              const radius = 3;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              
              return (
                <CartItem3D
                  key={item.id}
                  item={item}
                  position={[x, -1, z]}
                  onRemove={() => handleRemoveItem(item.id)}
                  onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
                />
              );
            })}

            {/* Ground Shadow */}
            <ContactShadows
              position={[0, -3, 0]}
              opacity={0.3}
              scale={10}
              blur={2}
              far={2}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>

        {/* Cart Summary Overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white max-w-md">
          <h3 className="text-2xl font-bold mb-4">Your Cart ({itemCount} items)</h3>
          
          {/* Items List */}
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white bg-opacity-10 rounded p-2">
                <div className="flex items-center space-x-2">
                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                  >
                    <MdRemove className="w-3 h-3" />
                  </button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
                  >
                    <MdAdd className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center ml-2"
                  >
                    <MdClose className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white border-opacity-20 pt-4">
            <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
            <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors duration-200">
              Checkout
            </button>
          </div>
        </div>

        {/* Empty Cart Message */}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🛒</div>
              <div className="text-2xl font-bold mb-2">Your cart is empty</div>
              <div className="text-lg opacity-80">Add some products to see them in 3D!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPreview3D;
