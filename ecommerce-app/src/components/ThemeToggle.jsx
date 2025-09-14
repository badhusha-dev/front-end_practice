import React from 'react';
import { MdLightMode, MdDarkMode, MdSettings } from 'react-icons/md';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark, setLightTheme, setDarkTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <MdLightMode className="w-5 h-5" />
        ) : (
          <MdDarkMode className="w-5 h-5" />
        )}
      </button>

      {/* Theme Options Tooltip */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-2 py-1">
            Theme
          </div>
          
          <button
            onClick={setLightTheme}
            className={`w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm transition-colors ${
              theme === 'light'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <MdLightMode className="w-4 h-4" />
            <span>Light</span>
          </button>
          
          <button
            onClick={setDarkTheme}
            className={`w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <MdDarkMode className="w-4 h-4" />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
