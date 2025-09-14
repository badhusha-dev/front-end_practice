import React, { useState } from 'react';
import { 
  MdShare, 
  MdWhatsapp, 
  MdEmail, 
  MdContentCopy,
  MdClose
} from 'react-icons/md';
import { FaLinkedin, FaTwitter, FaFacebook, FaTelegram } from 'react-icons/fa';
import { useSocialStore } from '../features/social/socialStore';

const SocialShare = ({ product, size = 'md' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { shareProduct } = useSocialStore();

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: FaFacebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-blue-600'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: FaTwitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-sky-500'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-blue-700'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MdWhatsapp,
      color: 'bg-green-600 hover:bg-green-700',
      textColor: 'text-green-600'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: FaTelegram,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-500'
    },
    {
      id: 'email',
      name: 'Email',
      icon: MdEmail,
      color: 'bg-gray-600 hover:bg-gray-700',
      textColor: 'text-gray-600'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: MdContentCopy,
      color: 'bg-purple-600 hover:bg-purple-700',
      textColor: 'text-purple-600'
    }
  ];

  const handleShare = (platformId) => {
    shareProduct(product.id, platformId, product);
    setIsOpen(false);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 p-1';
      case 'lg':
        return 'w-12 h-12 p-3';
      default:
        return 'w-10 h-10 p-2';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${getSizeClasses()} bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-200 hover:scale-110`}
        title="Share product"
      >
        <MdShare className={getIconSize()} />
      </button>

      {/* Share Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Share Product</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-lg font-bold text-primary-600">${product.price}</p>
                </div>
              </div>
            </div>

            {/* Share Platforms */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">Choose a platform to share:</p>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handleShare(platform.id)}
                    className={`${platform.color} text-white p-4 rounded-lg flex items-center space-x-3 transition-all duration-200 hover:scale-105`}
                  >
                    <platform.icon className="w-5 h-5" />
                    <span className="font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Share Stats */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Share this product to help others discover it!</span>
                  <span className="text-primary-600 font-medium">
                    {Math.floor(Math.random() * 100)} shares
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialShare;
