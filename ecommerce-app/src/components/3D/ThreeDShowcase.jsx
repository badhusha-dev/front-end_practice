import React, { useState } from 'react';
import { MdViewInAr, MdShoppingCart, MdFavorite, MdCompare, MdStar } from 'react-icons/md';
import Loading3D, { InlineLoading3D } from './Loading3D';
import { IconButton3D, Card3D } from './InteractiveButton3D';

const ThreeDShowcase = () => {
  const [selectedLoader, setSelectedLoader] = useState('spinner');
  const [selectedButton, setSelectedButton] = useState('primary');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          3D Features Showcase
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Loading Effects */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <MdViewInAr className="w-6 h-6 text-primary-600" />
              <span>3D Loading Effects</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['spinner', 'pulsing', 'cubes', 'dna', 'particles'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedLoader(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedLoader === type
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <InlineLoading3D type={selectedLoader} />
              </div>

              <p className="text-sm text-gray-600">
                Interactive 3D loading animations with different styles and effects.
              </p>
            </div>
          </div>

          {/* 3D Interactive Buttons */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <MdStar className="w-6 h-6 text-primary-600" />
              <span>3D Interactive Buttons</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['primary', 'secondary', 'success', 'danger', 'warning'].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedButton(variant)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedButton === variant
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>

              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center space-x-4">
                <IconButton3D 
                  icon="cart" 
                  variant={selectedButton}
                  onClick={() => console.log('3D Cart clicked!')}
                />
                <IconButton3D 
                  icon="favorite" 
                  variant={selectedButton}
                  onClick={() => console.log('3D Favorite clicked!')}
                />
                <IconButton3D 
                  icon="compare" 
                  variant={selectedButton}
                  onClick={() => console.log('3D Compare clicked!')}
                />
              </div>

              <p className="text-sm text-gray-600">
                Hover and click the 3D buttons to see interactive animations.
              </p>
            </div>
          </div>

          {/* 3D Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <MdShoppingCart className="w-6 h-6 text-primary-600" />
              <span>3D Interactive Cards</span>
            </h2>
            
            <div className="space-y-4">
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <Card3D onClick={() => console.log('3D Card clicked!')}>
                  <div className="text-sm">
                    <div className="font-bold">3D Product Card</div>
                    <div className="text-gray-600">Hover to see 3D effects</div>
                  </div>
                </Card3D>
              </div>

              <p className="text-sm text-gray-600">
                3D cards with hover animations and interactive effects.
              </p>
            </div>
          </div>

          {/* Feature List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <MdFavorite className="w-6 h-6 text-primary-600" />
              <span>Available 3D Features</span>
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">3D Product Gallery with carousel navigation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">3D Cart Preview with floating items</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Interactive 3D buttons and elements</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Dynamic 3D background particles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">3D loading animations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Page transition effects</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-800 mb-2">How to Use:</h3>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>• Click "3D Gallery" on the products page</li>
                <li>• Click the cart icon in the navbar for 3D preview</li>
                <li>• Hover over product cards for 3D effects</li>
                <li>• Experience smooth 3D transitions throughout the app</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full Page Loading Demo */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Full Page 3D Loading</h2>
          <p className="text-gray-600 mb-4">
            Click the button below to experience a full-page 3D loading animation:
          </p>
          <button
            onClick={() => {
              // Show a simple alert instead of complex loading
              alert('3D Loading Animation Demo!\n\nThis would show a full-page 3D loading animation with DNA helix, particles, and smooth transitions.');
            }}
            className="btn-primary"
          >
            Experience 3D Loading
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreeDShowcase;
