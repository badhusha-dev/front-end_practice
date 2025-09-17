import React, { useRef, useEffect, useState } from 'react';
import { MdClose, MdCamera, MdRotateRight, MdZoomIn, MdZoomOut, Md3dRotation } from 'react-icons/md';

const ARProductViewer = ({ product, isOpen, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isARActive, setIsARActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if getUserMedia is supported
    setIsSupported(!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia);
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera if available
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsARActive(false);
    }
  };

  const toggleAR = () => {
    if (isARActive) {
      stopCamera();
    } else {
      startCamera();
      setIsARActive(true);
    }
  };

  const adjustScale = (delta) => {
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const adjustRotation = (delta) => {
    setRotation(prev => (prev + delta) % 360);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

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

        {/* AR Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <button
            onClick={toggleAR}
            className={`p-3 rounded-full transition-all duration-200 ${
              isARActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
            }`}
          >
            <Md3dRotation className="w-6 h-6" />
          </button>

          {isARActive && (
            <>
              <button
                onClick={() => adjustScale(0.1)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200"
              >
                <MdZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => adjustScale(-0.1)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200"
              >
                <MdZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => adjustRotation(45)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200"
              >
                <MdRotateRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Camera Feed */}
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ display: isARActive ? 'block' : 'none' }}
          />

          {/* AR Overlay */}
          {isARActive && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Product AR Model Overlay */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`
                }}
              >
                {/* Simulated 3D Product Model */}
                <div className="relative">
                  {/* Product Base */}
                  <div className="w-32 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-2xl">
                    {/* Product Image Overlay */}
                    <div 
                      className="w-full h-full rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    
                    {/* AR Shadow */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black opacity-30 rounded-full blur-sm" />
                  </div>

                  {/* AR Anchors */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* AR Instructions */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-3 rounded-lg">
                <p className="text-sm text-center">
                  Point your camera at a flat surface to place the product
                </p>
              </div>

              {/* AR Info Panel */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg p-4 max-w-sm">
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">${product.price}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for non-AR mode */}
          {!isARActive && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <MdCamera className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-4">AR Product Viewer</h2>
                <p className="text-lg mb-6 opacity-80">
                  See how {product.name} looks in your space
                </p>
                {!isSupported ? (
                  <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4 max-w-md">
                    <p className="text-red-200">
                      AR features require camera access. Please use a device with a camera and allow camera permissions.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={toggleAR}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Md3dRotation className="w-5 h-5" />
                    <span>Start AR Experience</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Product Info Overlay (Non-AR) */}
        {!isARActive && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-white max-w-md">
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-sm opacity-90 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${product.price}</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ARProductViewer;
