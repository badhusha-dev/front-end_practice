import React, { useState } from 'react';
import { 
  MdShare, 
  MdEmail, 
  MdCopyAll, 
  MdClose,
  MdCheckCircle,
  MdLink,
  MdQrCode,
  MdDownload
} from 'react-icons/md';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Social Media Platforms
const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    icon: FaFacebook,
    color: 'bg-blue-600',
    baseUrl: 'https://www.facebook.com/sharer/sharer.php?u='
  },
  twitter: {
    name: 'Twitter',
    icon: FaTwitter,
    color: 'bg-blue-400',
    baseUrl: 'https://twitter.com/intent/tweet?url='
  },
  linkedin: {
    name: 'LinkedIn',
    icon: FaLinkedin,
    color: 'bg-blue-700',
    baseUrl: 'https://www.linkedin.com/sharing/share-offsite/?url='
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    color: 'bg-green-500',
    baseUrl: 'https://wa.me/?text='
  },
  email: {
    name: 'Email',
    icon: MdEmail,
    color: 'bg-gray-600',
    baseUrl: 'mailto:?subject='
  }
};

// QR Code Generator Component
const QRCodeGenerator = ({ url, onClose }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  React.useEffect(() => {
    // Generate QR code using a free service
    const qrCodeService = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    setQrCodeUrl(qrCodeService);
  }, [url]);

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'product-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code downloaded successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">QR Code</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center">
            {qrCodeUrl ? (
              <div className="mb-4">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="mx-auto border border-gray-200 rounded-lg"
                />
              </div>
            ) : (
              <div className="mb-4 h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            <p className="text-sm text-gray-600 mb-4">
              Scan this QR code to view the product
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={downloadQRCode}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MdDownload className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Share Button Component
const SocialShareButton = ({ platform, url, title, description, onShare }) => {
  const platformData = SOCIAL_PLATFORMS[platform];
  const Icon = platformData.icon;

  const handleShare = () => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    switch (platform) {
      case 'facebook':
        shareUrl = `${platformData.baseUrl}${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `${platformData.baseUrl}${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `${platformData.baseUrl}${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `${platformData.baseUrl}${encodedTitle}%20${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `${platformData.baseUrl}${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`;
        break;
      default:
        return;
    }

    // Open share URL
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    if (onShare) {
      onShare(platform);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center space-x-2 px-4 py-2 ${platformData.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{platformData.name}</span>
    </button>
  );
};

// Copy Link Component
const CopyLinkButton = ({ url, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      
      if (onCopy) {
        onCopy();
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast.success('Link copied to clipboard!');
      
      if (onCopy) {
        onCopy();
      }
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      {copied ? (
        <MdCheckCircle className="w-4 h-4 text-green-400" />
      ) : (
        <MdCopyAll className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {copied ? 'Copied!' : 'Copy Link'}
      </span>
    </button>
  );
};

// Main Social Sharing Component
const SocialSharing = ({ 
  product, 
  isOpen, 
  onClose, 
  onShare = () => {} 
}) => {
  const [showQRCode, setShowQRCode] = useState(false);
  
  const productUrl = `${window.location.origin}/products/${product?.id}`;
  const productTitle = product?.name || 'Check out this product';
  const productDescription = product?.description || 'Amazing product available now!';

  const handleShare = (platform) => {
    onShare(platform);
    toast.success(`Shared on ${SOCIAL_PLATFORMS[platform].name}!`);
  };

  const handleCopy = () => {
    onShare('copy');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MdShare className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Share Product</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{productTitle}</h3>
              <p className="text-sm text-gray-600 mb-3">{productDescription}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <MdLink className="w-3 h-3" />
                <span className="truncate">{productUrl}</span>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Share on Social Media</h4>
              <div className="grid grid-cols-2 gap-3">
                <SocialShareButton
                  platform="facebook"
                  url={productUrl}
                  title={productTitle}
                  description={productDescription}
                  onShare={handleShare}
                />
                <SocialShareButton
                  platform="twitter"
                  url={productUrl}
                  title={productTitle}
                  description={productDescription}
                  onShare={handleShare}
                />
                <SocialShareButton
                  platform="linkedin"
                  url={productUrl}
                  title={productTitle}
                  description={productDescription}
                  onShare={handleShare}
                />
                <SocialShareButton
                  platform="whatsapp"
                  url={productUrl}
                  title={productTitle}
                  description={productDescription}
                  onShare={handleShare}
                />
                <SocialShareButton
                  platform="email"
                  url={productUrl}
                  title={productTitle}
                  description={productDescription}
                  onShare={handleShare}
                />
              </div>
            </div>

            {/* Additional Actions */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Other Options</h4>
              <div className="flex space-x-3">
                <CopyLinkButton
                  url={productUrl}
                  onCopy={handleCopy}
                />
                <button
                  onClick={() => setShowQRCode(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <MdQrCode className="w-4 h-4" />
                  <span className="text-sm font-medium">QR Code</span>
                </button>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <QRCodeGenerator
          url={productUrl}
          onClose={() => setShowQRCode(false)}
        />
      )}
    </>
  );
};

// Floating Share Button Component
const FloatingShareButton = ({ product, onShare }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
        title="Share Product"
      >
        <MdShare className="w-6 h-6" />
      </button>

      <SocialSharing
        product={product}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onShare={onShare}
      />
    </>
  );
};

export default SocialSharing;
export { FloatingShareButton, SocialShareButton, CopyLinkButton, QRCodeGenerator };
