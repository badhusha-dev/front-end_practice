import React, { useState } from 'react';
import { MdMic, MdMicOff, MdClear } from 'react-icons/md';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

const VoiceSearch = ({ onSearch, placeholder = "Search with your voice..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isListening, transcript, isSupported, error, startListening, stopListening, clearTranscript } = useVoiceSearch();

  // Update search term when transcript changes
  React.useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
      onSearch?.(transcript);
    }
  }, [transcript, onSearch]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch?.(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    clearTranscript();
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleManualSearch} className="relative">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          
          {/* Voice Button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`absolute right-12 p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice search'}
          >
            {isListening ? <MdMicOff className="w-4 h-4" /> : <MdMic className="w-4 h-4" />}
          </button>

          {/* Clear Button */}
          {(searchTerm || transcript) && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Clear search"
            >
              <MdClear className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Voice Status */}
        {isListening && (
          <div className="mt-2 text-sm text-primary-600 flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Listening...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-2 text-sm text-red-600">
            Error: {error}
          </div>
        )}

        {/* Transcript Display */}
        {transcript && !isListening && (
          <div className="mt-2 text-sm text-gray-600">
            You said: "{transcript}"
          </div>
        )}
      </form>
    </div>
  );
};

export default VoiceSearch;
