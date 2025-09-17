import React, { useState } from 'react';
import { useI18nStore } from './i18nStore';
import { MdLanguage, MdClose, MdCheck } from 'react-icons/md';

const LanguageSelectorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentLanguage, 
    availableLanguages, 
    setLanguage, 
    getCurrentLanguage,
    t 
  } = useI18nStore();

  const currentLang = getCurrentLanguage();

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-40 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <MdLanguage className="w-6 h-6" />
          <span className="hidden sm:block font-medium">{currentLang?.flag}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MdLanguage className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{t('features.language')}</h2>
              <p className="text-sm text-indigo-100">Select your preferred language</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Language List */}
        <div className="p-6">
          <div className="space-y-2">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                  currentLanguage === language.code
                    ? 'bg-indigo-50 border-2 border-indigo-200'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{language.name}</h3>
                    <p className="text-sm text-gray-500">{language.code.toUpperCase()}</p>
                  </div>
                </div>
                
                {currentLanguage === language.code && (
                  <MdCheck className="w-5 h-5 text-indigo-600" />
                )}
              </button>
            ))}
          </div>
          
          {/* Current Language Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Current Language</h4>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentLang?.flag}</span>
              <div>
                <p className="font-medium text-gray-900">{currentLang?.name}</p>
                <p className="text-sm text-gray-500">
                  {currentLang?.rtl ? 'Right-to-left' : 'Left-to-right'} text direction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectorWidget;
