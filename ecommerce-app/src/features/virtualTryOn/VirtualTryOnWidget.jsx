import React, { useState, useRef, useEffect } from 'react';
import { useVirtualTryOnStore } from './virtualTryOnStore';
import { 
  MdCamera, 
  MdCameraAlt, 
  MdClose, 
  MdPhotoCamera, 
  MdSettings,
  MdPerson,
  MdStraighten,
  MdPalette,
  MdLightbulb,
  MdRefresh,
  MdDownload,
  MdShare,
  MdFavorite,
  MdShoppingCart,
  MdInfo,
  MdCheckCircle,
  MdWarning
} from 'react-icons/md';
import { FiUser, FiEye, FiHeart } from 'react-icons/fi';

const VirtualTryOnWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('camera');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMeasurementsModal, setShowMeasurementsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFitAnalysis, setShowFitAnalysis] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const {
    isActive,
    isCameraActive,
    isProcessing,
    userProfile,
    selectedItems,
    currentSession,
    fittingRoom,
    tryOnHistory,
    initializeVirtualTryOn,
    startTryOnSession,
    endTryOnSession,
    addItemToTryOn,
    removeItemFromTryOn,
    updateUserProfile,
    updateMeasurements,
    takeSnapshot,
    updateFittingRoom,
    calculateFit,
    getTryOnCompatibleItems,
    getTryOnAnalytics,
    cleanup
  } = useVirtualTryOnStore();

  const compatibleItems = getTryOnCompatibleItems();
  const analytics = getTryOnAnalytics();

  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      videoRef.current.srcObject = null; // Will be set by the store
    }
  }, [isCameraActive]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const handleStartTryOn = async () => {
    try {
      await initializeVirtualTryOn();
      if (selectedItems.length > 0) {
        startTryOnSession(selectedItems);
      }
    } catch (error) {
      console.error('Failed to start virtual try-on:', error);
    }
  };

  const handleTakeSnapshot = () => {
    takeSnapshot();
  };

  const handleItemSelect = (item) => {
    if (selectedItems.find(selected => selected.id === item.id)) {
      removeItemFromTryOn(item.id);
    } else {
      addItemToTryOn(item);
    }
  };

  const handleFitAnalysis = (item) => {
    setSelectedItem(item);
    setShowFitAnalysis(true);
  };

  const fitAnalysis = selectedItem ? calculateFit(selectedItem, userProfile) : null;

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-20 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <MdCameraAlt className="w-6 h-6" />
          <span className="hidden sm:block font-medium">Virtual Try-On</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MdCameraAlt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Virtual Try-On</h2>
              <p className="text-sm text-pink-100">
                {isActive ? 'Session Active' : 'Ready to try on items'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Profile Settings"
            >
              <MdPerson className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'camera', label: 'Camera', icon: MdCamera },
              { id: 'items', label: 'Items', icon: MdShoppingCart },
              { id: 'history', label: 'History', icon: MdPhotoCamera },
              { id: 'analytics', label: 'Analytics', icon: MdInfo }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Camera View */}
          {activeTab === 'camera' && (
            <div className="flex-1 flex flex-col">
              {/* Camera Area */}
              <div className="flex-1 bg-gray-900 relative">
                {!isCameraActive ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <MdCameraAlt className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-semibold mb-2">Start Virtual Try-On</h3>
                      <p className="text-gray-300 mb-6">
                        Enable your camera to start trying on items virtually
                      </p>
                      <button
                        onClick={handleStartTryOn}
                        disabled={isProcessing}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Starting...' : 'Start Camera'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    {/* Video Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* AR Overlay Canvas */}
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                    />
                    
                    {/* Camera Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                      <button
                        onClick={handleTakeSnapshot}
                        className="p-4 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <MdPhotoCamera className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={() => setShowMeasurementsModal(true)}
                        className="p-4 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <MdStraighten className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={() => updateFittingRoom({ mirrorMode: !fittingRoom.mirrorMode })}
                        className={`p-4 rounded-full shadow-lg transition-colors ${
                          fittingRoom.mirrorMode ? 'bg-pink-600 text-white' : 'bg-white text-gray-800'
                        }`}
                      >
                        <MdRefresh className="w-6 h-6" />
                      </button>
                    </div>
                    
                    {/* Selected Items Overlay */}
                    {selectedItems.length > 0 && (
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 max-w-xs">
                        <h4 className="font-semibold text-gray-900 mb-2">Trying On:</h4>
                        <div className="space-y-2">
                          {selectedItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                              <span className="text-sm text-gray-700">{item.name}</span>
                              <button
                                onClick={() => removeItemFromTryOn(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <MdClose className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Items Tab */}
          {activeTab === 'items' && (
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Try-On Compatible Items</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{selectedItems.length} selected</span>
                  {selectedItems.length > 0 && (
                    <button
                      onClick={handleStartTryOn}
                      className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Start Try-On
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compatibleItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      {selectedItems.find(selected => selected.id === item.id) && (
                        <div className="absolute top-2 right-2 bg-pink-600 text-white rounded-full p-1">
                          <MdCheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                    <p className="text-lg font-bold text-gray-900 mb-4">${item.price}</p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleItemSelect(item)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedItems.find(selected => selected.id === item.id)
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-pink-600 text-white hover:bg-pink-700'
                        }`}
                      >
                        {selectedItems.find(selected => selected.id === item.id) ? 'Remove' : 'Select'}
                      </button>
                      
                      <button
                        onClick={() => handleFitAnalysis(item)}
                        className="p-2 text-gray-500 hover:text-pink-600 transition-colors"
                        title="Fit Analysis"
                      >
                        <MdStraighten className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="flex-1 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Try-On History</h3>
              
              {tryOnHistory.length === 0 ? (
                <div className="text-center py-12">
                  <MdPhotoCamera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Try-On Sessions Yet</h3>
                  <p className="text-gray-600 mb-6">Start trying on items to see your history here</p>
                  <button
                    onClick={() => setActiveTab('items')}
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Browse Items
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tryOnHistory.map((session) => (
                    <div key={session.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">
                          Session #{session.id}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(session.startTime).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        {session.items.map((item) => (
                          <div key={item.id} className="text-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mx-auto mb-2"
                            />
                            <p className="text-xs text-gray-600">{item.name}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Duration: {Math.round(session.duration / 1000)}s</span>
                        <span>Items: {session.items.length}</span>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <MdDownload className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <MdShare className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <MdFavorite className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="flex-1 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Try-On Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Sessions</p>
                      <p className="text-2xl font-bold text-pink-600">{analytics.totalSessions}</p>
                    </div>
                    <MdPhotoCamera className="w-8 h-8 text-pink-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Duration</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(analytics.averageSessionDuration / 1000)}s
                      </p>
                    </div>
                    <MdStraighten className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Fit Accuracy</p>
                      <p className="text-2xl font-bold text-green-600">{analytics.fitAccuracy}%</p>
                    </div>
                    <MdCheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                      <p className="text-2xl font-bold text-yellow-600">{analytics.userSatisfaction}</p>
                    </div>
                    <FiHeart className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Most Tried Items</h4>
                <div className="space-y-3">
                  {analytics.mostTriedItems.map((item, index) => (
                    <div key={item.itemId} className="flex items-center justify-between">
                      <span className="text-gray-700">Item #{item.itemId}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-600 h-2 rounded-full"
                            style={{ width: `${(item.count / analytics.totalSessions) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{item.count} times</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Profile Settings</h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={userProfile.height}
                      onChange={(e) => updateUserProfile({ height: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={userProfile.weight}
                      onChange={(e) => updateUserProfile({ weight: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Body Type</label>
                  <select
                    value={userProfile.bodyType}
                    onChange={(e) => updateUserProfile({ bodyType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="slim">Slim</option>
                    <option value="average">Average</option>
                    <option value="athletic">Athletic</option>
                    <option value="plus">Plus</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Skin Tone</label>
                  <select
                    value={userProfile.skinTone}
                    onChange={(e) => updateUserProfile({ skinTone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="tan">Tan</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fit Analysis Modal */}
        {showFitAnalysis && fitAnalysis && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Fit Analysis</h3>
                <button
                  onClick={() => setShowFitAnalysis(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {fitAnalysis.fitScore}%
                  </div>
                  <p className="text-sm text-gray-600">Fit Score</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {fitAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <MdCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recommended Size</h4>
                  <p className="text-lg font-semibold text-pink-600">{fitAnalysis.sizeRecommendation}</p>
                </div>
                
                {fitAnalysis.alterations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Suggested Alterations</h4>
                    <ul className="space-y-1">
                      {fitAnalysis.alterations.map((alt, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <MdWarning className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTryOnWidget;
