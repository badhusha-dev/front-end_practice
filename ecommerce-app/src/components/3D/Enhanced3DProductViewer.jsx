import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/web';
import { 
  Md3DRotation, 
  MdZoomIn, 
  MdZoomOut, 
  MdFullscreen, 
  MdFullscreenExit,
  Md360,
  MdViewInAr,
  MdClose,
  MdSettings,
  MdPalette,
  MdLightbulb,
  MdRefresh
} from 'react-icons/md';

// 3D Product Model Component
const ProductModel = ({ product, color, scale, rotation }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation.y;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <boxGeometry args={[2, 3, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// 3D Controls Panel
const ControlsPanel = ({ 
  isOpen, 
  onClose, 
  onColorChange, 
  onScaleChange, 
  onRotationChange,
  currentColor,
  currentScale,
  currentRotation 
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showScaleSlider, setShowScaleSlider] = useState(false);
  const [showRotationSlider, setShowRotationSlider] = useState(false);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  const panelAnimation = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: isOpen ? 1 : 0,
  });

  return (
    <animated.div
      style={panelAnimation}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">3D Controls</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Color Controls */}
        <div className="mb-6">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <MdPalette className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Color</span>
            </div>
            <div 
              className="w-6 h-6 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: currentColor }}
            />
          </button>
          
          {showColorPicker && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    currentColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scale Controls */}
        <div className="mb-6">
          <button
            onClick={() => setShowScaleSlider(!showScaleSlider)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <MdZoomIn className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Scale</span>
            </div>
            <span className="text-sm text-gray-600">{currentScale.toFixed(1)}x</span>
          </button>
          
          {showScaleSlider && (
            <div className="mt-3">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={currentScale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x</span>
                <span>2.0x</span>
              </div>
            </div>
          )}
        </div>

        {/* Rotation Controls */}
        <div className="mb-6">
          <button
            onClick={() => setShowRotationSlider(!showRotationSlider)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Md3DRotation className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Rotation</span>
            </div>
            <span className="text-sm text-gray-600">{Math.round(currentRotation.y * 180 / Math.PI)}°</span>
          </button>
          
          {showRotationSlider && (
            <div className="mt-3">
              <input
                type="range"
                min="0"
                max="6.28"
                step="0.1"
                value={currentRotation.y}
                onChange={(e) => onRotationChange({ y: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0°</span>
                <span>360°</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button
            onClick={() => onRotationChange({ y: 0 })}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MdRefresh className="w-4 h-4" />
            <span>Reset Rotation</span>
          </button>
          
          <button
            onClick={() => onScaleChange(1)}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <MdZoomIn className="w-4 h-4" />
            <span>Reset Scale</span>
          </button>
        </div>
      </div>
    </animated.div>
  );
};

// Main 3D Product Viewer Component
const Enhanced3DProductViewer = ({ product, isOpen, onClose }) => {
  const [color, setColor] = useState('#4ECDC4');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState({ y: 0 });
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
  });

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleScaleChange = (newScale) => {
    setScale(newScale);
  };

  const handleRotationChange = (newRotation) => {
    setRotation(newRotation);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <animated.div
      style={modalAnimation}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-3">
            <MdViewInAr className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">3D Product Viewer</h2>
              <p className="text-sm text-gray-600">{product?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowControls(!showControls)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Toggle Controls"
            >
              <MdSettings className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <MdFullscreenExit className="w-5 h-5" /> : <MdFullscreen className="w-5 h-5" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Close"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative w-full h-[calc(100%-80px)]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="studio" />
            
            <ProductModel
              product={product}
              color={color}
              scale={scale}
              rotation={rotation}
            />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={false}
            />
            
            {/* Loading indicator */}
            <Html center>
              <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">Loading 3D Model...</span>
                </div>
              </div>
            </Html>
          </Canvas>
        </div>

        {/* Controls Panel */}
        <ControlsPanel
          isOpen={showControls}
          onClose={() => setShowControls(false)}
          onColorChange={handleColorChange}
          onScaleChange={handleScaleChange}
          onRotationChange={handleRotationChange}
          currentColor={color}
          currentScale={scale}
          currentRotation={rotation}
        />
      </div>
    </animated.div>
  );
};

export default Enhanced3DProductViewer;
