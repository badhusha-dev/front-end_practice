import React, { useState, useEffect, useRef } from 'react';
import { useVideoChatStore } from './videoChatStore';
import { 
  FiVideo, 
  FiVideoOff, 
  FiMic, 
  FiMicOff, 
  FiMonitor, 
  FiPhone,
  FiPhoneCall,
  FiX,
  FiSend,
  FiSmile,
  FiMoreVertical,
  FiStar,
  FiClock,
  FiUser,
  FiMessageCircle
} from 'react-icons/fi';

const VideoChatWidget = () => {
  const {
    isVideoChatOpen,
    isConnecting,
    isConnected,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    supportAgent,
    messages,
    connectionStatus,
    error,
    openVideoChat,
    closeVideoChat,
    sendMessage,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    endCall,
    getAvailableAgents,
    getChatStats
  } = useVideoChatStore();

  const [messageInput, setMessageInput] = useState('');
  const [showAgentList, setShowAgentList] = useState(false);
  const [showChatStats, setShowChatStats] = useState(false);
  const messagesEndRef = useRef(null);
  const videoRef = useRef(null);

  const availableAgents = getAvailableAgents();
  const chatStats = getChatStats();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput.trim());
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVideoChatOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={openVideoChat}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <FiVideo className="w-6 h-6" />
          <span className="hidden sm:block font-medium">Video Support</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FiVideo className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Video Support Chat</h2>
              {supportAgent && (
                <p className="text-sm text-blue-100">
                  Connected with {supportAgent.name} • {supportAgent.role}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isConnected && (
              <button
                onClick={() => setShowChatStats(!showChatStats)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Chat Statistics"
              >
                <FiStar className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={closeVideoChat}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Video Section */}
          <div className="flex-1 bg-gray-900 relative">
            {isConnecting ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Connecting to Support Agent...</h3>
                  <p className="text-gray-300">Please wait while we connect you with our team</p>
                </div>
              </div>
            ) : isConnected ? (
              <div className="relative h-full">
                {/* Remote Video */}
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  {supportAgent && (
                    <div className="text-center text-white">
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold">
                          {supportAgent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold">{supportAgent.name}</h3>
                      <p className="text-gray-300">{supportAgent.role}</p>
                      <div className="flex items-center justify-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(supportAgent.rating) ? 'text-yellow-400' : 'text-gray-400'
                              }`}
                              fill={i < Math.floor(supportAgent.rating) ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-300">
                          {supportAgent.rating}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Local Video */}
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <FiUser className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">You</p>
                    </div>
                  </div>
                </div>

                {/* Connection Status */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Connected</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <FiPhoneCall className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Connect</h3>
                  <p className="text-gray-300 mb-6">Click the call button to start your video support session</p>
                  <button
                    onClick={openVideoChat}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Start Video Call
                  </button>
                </div>
              </div>
            )}

            {/* Video Controls */}
            {isConnected && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-6 py-3">
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full transition-colors ${
                    isAudioEnabled ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
                  }`}
                >
                  {isAudioEnabled ? <FiMic className="w-5 h-5" /> : <FiMicOff className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoEnabled ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
                  }`}
                >
                  {isVideoEnabled ? <FiVideo className="w-5 h-5" /> : <FiVideoOff className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={toggleScreenShare}
                  className={`p-3 rounded-full transition-colors ${
                    isScreenSharing ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  {isScreenSharing ? <FiVideoOff className="w-5 h-5" /> : <FiMonitor className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={endCall}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiPhone className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Chat Messages</h3>
                <button
                  onClick={() => setShowAgentList(!showAgentList)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiMoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent List Modal */}
        {showAgentList && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Available Support Agents</h3>
                <button
                  onClick={() => setShowAgentList(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {availableAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-lg border ${
                      agent.status === 'online' ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{agent.name}</h4>
                        <p className="text-sm text-gray-600">{agent.role}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill={i < Math.floor(agent.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">
                            {agent.rating} • {agent.responseTime}
                          </span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Stats Modal */}
        {showChatStats && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Support Statistics</h3>
                <button
                  onClick={() => setShowChatStats(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{chatStats.totalChats}</div>
                  <div className="text-sm text-gray-600">Total Chats</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{chatStats.averageResponseTime}</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{chatStats.customerSatisfaction}</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{chatStats.activeAgents}</div>
                  <div className="text-sm text-gray-600">Active Agents</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChatWidget;
