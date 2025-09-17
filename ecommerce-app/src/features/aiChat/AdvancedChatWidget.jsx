import React, { useState, useRef, useEffect } from 'react';
import { 
  MdChat, 
  MdClose, 
  MdSend, 
  MdPerson, 
  MdOnlinePrediction,
  MdSmartToy,
  MdShoppingCart,
  MdTrackChanges,
  MdSupport,
  MdAccountCircle,
  MdRefresh,
  MdMoreVert,
  MdAttachFile,
  MdEmojiEmotions,
  MdImage,
  MdVideoCall
} from 'react-icons/md';
import { FiThumbsUp, FiThumbsDown, FiStar, FiTrendingUp } from 'react-icons/fi';
import { useAdvancedChatStore } from './advancedChatStore';

const AdvancedChatWidget = () => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProductCards, setShowProductCards] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const {
    isOpen,
    isConnected,
    isTyping,
    messages,
    currentAgent,
    quickReplies,
    recommendedProducts,
    toggleChat,
    sendMessage,
    connect,
    disconnect,
    updateContext,
    setAIMode,
    clearConversation,
    getChatAnalytics
  } = useAdvancedChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      connect();
    } else {
      disconnect();
    }
  }, [isOpen, connect, disconnect]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim(), 'user');
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply, 'user');
    setShowSuggestions(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    sendMessage(`Tell me more about ${product.name}`, 'user');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const chatAnalytics = getChatAnalytics();

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <MdSmartToy className="w-6 h-6" />
          <span className="hidden sm:block font-medium">AI Assistant</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <MdSmartToy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-100">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            title="Quick Actions"
          >
            <MdMoreVert className="w-4 h-4" />
          </button>
          <button
            onClick={toggleChat}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      {showSuggestions && (
        <div className="bg-gray-50 p-3 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setAIMode('shopping');
                handleQuickReply('Help me find products');
              }}
              className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <MdShoppingCart className="w-4 h-4 text-blue-600" />
              <span>Find Products</span>
            </button>
            <button
              onClick={() => {
                setAIMode('support');
                handleQuickReply('Track my order');
              }}
              className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <MdTrackChanges className="w-4 h-4 text-green-600" />
              <span>Track Order</span>
            </button>
            <button
              onClick={() => {
                setAIMode('technical');
                handleQuickReply('Technical support');
              }}
              className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <MdSupport className="w-4 h-4 text-orange-600" />
              <span>Get Support</span>
            </button>
            <button
              onClick={() => {
                setAIMode('account');
                handleQuickReply('Account help');
              }}
              className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <MdAccountCircle className="w-4 h-4 text-purple-600" />
              <span>Account Help</span>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.sender === 'agent' && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <MdSmartToy className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-gray-500">AI Assistant</span>
                </div>
              )}
              
              <div
                className={`px-4 py-2 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>

              {/* Message suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(suggestion)}
                      className="block w-full text-left px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Product recommendations */}
              {msg.products && msg.products.length > 0 && (
                <div className="mt-3 space-y-2">
                  {msg.products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        <p className="text-xs text-gray-600">${product.price}</p>
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Message actions */}
              {msg.sender === 'agent' && (
                <div className="flex items-center space-x-2 mt-2">
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <FiThumbsUp className="w-3 h-3 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <FiThumbsDown className="w-3 h-3 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <MdRefresh className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <MdSmartToy className="w-3 h-3 text-white" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Emoji"
              >
                <MdEmojiEmotions className="w-4 h-4 text-gray-500" />
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Attach File"
              >
                <MdAttachFile className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <MdSend className="w-4 h-4" />
          </button>
        </form>

        {/* Quick replies */}
        {quickReplies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {quickReplies.slice(0, 3).map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat Analytics */}
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{chatAnalytics.totalMessages} messages</span>
          <span>Avg response: {chatAnalytics.averageResponseTime}</span>
          <span>⭐ {chatAnalytics.userSatisfaction}</span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedChatWidget;
