import React, { useState, useEffect } from 'react';
import { 
  MdInstallDesktop, 
  MdOfflineBolt, 
  MdSync, 
  MdNotifications, 
  MdSettings,
  MdClose,
  MdCheckCircle,
  MdError,
  MdInfo,
  MdWarning
} from 'react-icons/md';

// Service Worker Registration
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isOnline = navigator.onLine;
    this.updateAvailable = false;
    this.swRegistration = null;
  }

  async init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
        
        // Listen for updates
        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.updateAvailable = true;
              this.notifyUpdateAvailable();
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.notifyInstallAvailable();
    });

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.notifyInstalled();
    });

    // Listen for online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyOnlineStatus(true);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyOnlineStatus(false);
    });
  }

  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
    }
  }

  async updateApp() {
    if (this.swRegistration && this.swRegistration.waiting) {
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }

  notifyInstallAvailable() {
    // This would trigger a notification in the UI
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  }

  notifyInstalled() {
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  }

  notifyUpdateAvailable() {
    window.dispatchEvent(new CustomEvent('pwa-update-available'));
  }

  notifyOnlineStatus(isOnline) {
    window.dispatchEvent(new CustomEvent('pwa-online-status', { 
      detail: { isOnline } 
    }));
  }
}

// PWA Status Component
const PWAStatus = ({ isOnline, isInstalled, updateAvailable }) => {
  const getStatusColor = () => {
    if (!isOnline) return 'text-red-600 bg-red-50';
    if (updateAvailable) return 'text-yellow-600 bg-yellow-50';
    if (isInstalled) return 'text-green-600 bg-green-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline Mode';
    if (updateAvailable) return 'Update Available';
    if (isInstalled) return 'App Installed';
    return 'Online';
  };

  const getStatusIcon = () => {
    if (!isOnline) return MdError;
    if (updateAvailable) return MdWarning;
    if (isInstalled) return MdCheckCircle;
    return MdInfo;
  };

  const Icon = getStatusIcon();

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getStatusColor()}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{getStatusText()}</span>
    </div>
  );
};

// Install Prompt Component
const InstallPrompt = ({ isOpen, onClose, onInstall }) => {
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await onInstall();
      onClose();
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <MdInstallDesktop className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Install App</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Install this app on your device for a better experience with offline access and faster loading.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MdOfflineBolt className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Access content offline</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdSync className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Faster loading times</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdNotifications className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">Push notifications</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isInstalling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Installing...</span>
                </>
              ) : (
                <>
                  <MdInstallDesktop className="w-4 h-4" />
                  <span>Install</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update Prompt Component
const UpdatePrompt = ({ isOpen, onClose, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onUpdate();
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <MdSync className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">Update Available</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              A new version of the app is available. Update now to get the latest features and improvements.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <MdWarning className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  The app will reload after updating
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Later
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <MdSync className="w-4 h-4" />
                  <span>Update Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main PWA Manager Component
const PWAManagerComponent = () => {
  const [pwaManager] = useState(() => new PWAManager());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    // Initialize PWA manager
    pwaManager.init();

    // Listen for PWA events
    const handleInstallAvailable = () => {
      setShowInstallPrompt(true);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
    };

    const handleUpdateAvailable = () => {
      setUpdateAvailable(true);
      setShowUpdatePrompt(true);
    };

    const handleOnlineStatus = (event) => {
      setIsOnline(event.detail.isOnline);
    };

    window.addEventListener('pwa-install-available', handleInstallAvailable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);
    window.addEventListener('pwa-online-status', handleOnlineStatus);

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
      window.removeEventListener('pwa-online-status', handleOnlineStatus);
    };
  }, [pwaManager]);

  const handleInstall = async () => {
    await pwaManager.installApp();
  };

  const handleUpdate = async () => {
    await pwaManager.updateApp();
  };

  return (
    <>
      {/* PWA Status Indicator */}
      <div className="fixed top-4 left-4 z-40">
        <PWAStatus
          isOnline={isOnline}
          isInstalled={isInstalled}
          updateAvailable={updateAvailable}
        />
      </div>

      {/* Install Prompt */}
      <InstallPrompt
        isOpen={showInstallPrompt}
        onClose={() => setShowInstallPrompt(false)}
        onInstall={handleInstall}
      />

      {/* Update Prompt */}
      <UpdatePrompt
        isOpen={showUpdatePrompt}
        onClose={() => setShowUpdatePrompt(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default PWAManagerComponent;
export { PWAManager };
