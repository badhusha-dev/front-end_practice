import React, { useState } from 'react';
import { useBlockchainRewardsStore } from './blockchainRewardsStore';
import { 
  FiCreditCard, 
  FiX, 
  FiCopy, 
  FiExternalLink, 
  FiGift, 
  FiStar, 
  FiTrendingUp,
  FiAward,
  FiSend,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiDownload
} from 'react-icons/fi';

const BlockchainRewardsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  
  const {
    walletAddress,
    isWalletConnected,
    isConnecting,
    loyaltyPoints,
    totalEarned,
    totalSpent,
    pendingPoints,
    transactions,
    rewards,
    nfts,
    achievements,
    connectWallet,
    disconnectWallet,
    earnPoints,
    spendPoints,
    mintNFT,
    transferPoints,
    getTransactionHistory,
    getAvailableRewards,
    getEarnedRewards,
    getWalletInfo
  } = useBlockchainRewardsStore();

  const walletInfo = getWalletInfo();
  const transactionHistory = getTransactionHistory();
  const availableRewards = getAvailableRewards();
  const earnedRewards = getEarnedRewards();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleMintNFT = async (rewardId) => {
    try {
      await mintNFT(rewardId);
    } catch (error) {
      console.error('NFT minting failed:', error);
    }
  };

  const handleTransferPoints = async () => {
    if (!transferAddress || !transferAmount) return;
    
    try {
      await transferPoints(transferAddress, parseInt(transferAmount));
      setShowTransferModal(false);
      setTransferAddress('');
      setTransferAmount('');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <FiCreditCard className="w-6 h-6" />
          <span className="hidden sm:block font-medium">Blockchain Rewards</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FiCreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Blockchain Rewards</h2>
              <p className="text-sm text-purple-100">
                {isWalletConnected ? `Connected: ${formatAddress(walletAddress)}` : 'Connect your wallet to start earning'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet Connection */}
        {!isWalletConnected && (
          <div className="p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCreditCard className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600 mb-6">
              Connect your wallet to start earning blockchain-based loyalty points and NFTs
            </p>
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isConnecting ? (
                <div className="flex items-center space-x-2">
                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        )}

        {/* Main Content */}
        {isWalletConnected && (
          <>
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview', icon: FiTrendingUp },
                  { id: 'rewards', label: 'Rewards', icon: FiGift },
                  { id: 'nfts', label: 'NFTs', icon: FiAward },
                  { id: 'transactions', label: 'Transactions', icon: FiSend }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Loyalty Points</p>
                          <p className="text-2xl font-bold text-purple-600">{loyaltyPoints.toLocaleString()}</p>
                        </div>
                        <FiStar className="w-8 h-8 text-purple-400" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Earned</p>
                          <p className="text-2xl font-bold text-green-600">{totalEarned.toLocaleString()}</p>
                        </div>
                        <FiTrendingUp className="w-8 h-8 text-green-400" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">NFTs Owned</p>
                          <p className="text-2xl font-bold text-blue-600">{nfts.length}</p>
                        </div>
                        <FiAward className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                  </div>

                  {/* Wallet Info */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Wallet Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Wallet Address</label>
                        <div className="flex items-center space-x-2">
                          <code className="bg-white px-3 py-2 rounded border text-sm font-mono">
                            {formatAddress(walletAddress)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(walletAddress)}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                          >
                            <FiCopy className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">ETH Balance</label>
                        <p className="text-lg font-semibold text-gray-900">{walletInfo.ethBalance} ETH</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                      <button
                        onClick={() => setActiveTab('transactions')}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {transactionHistory.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              tx.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                              {tx.type === 'earn' ? <FiTrendingUp className="w-4 h-4" /> : <FiSend className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{tx.description}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(tx.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount}
                            </p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <FiCheckCircle className="w-3 h-3" />
                              <span>Confirmed</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Rewards Tab */}
              {activeTab === 'rewards' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Available Rewards</h3>
                    <button
                      onClick={() => earnPoints(100, 'Demo Reward')}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Earn Demo Points
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableRewards.map((reward) => (
                      <div key={reward.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center">
                          <FiGift className="w-12 h-12 text-purple-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{reward.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-purple-600">
                            {reward.pointsRequired} points
                          </span>
                          <button
                            onClick={() => handleMintNFT(reward.id)}
                            disabled={loyaltyPoints < reward.pointsRequired}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                          >
                            Mint NFT
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NFTs Tab */}
              {activeTab === 'nfts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Your NFTs</h3>
                    <button
                      onClick={() => setShowTransferModal(true)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Transfer Points
                    </button>
                  </div>
                  
                  {nfts.length === 0 ? (
                    <div className="text-center py-12">
                      <FiAward className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No NFTs Yet</h3>
                      <p className="text-gray-600 mb-6">Mint your first NFT by earning loyalty points!</p>
                      <button
                        onClick={() => setActiveTab('rewards')}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        View Rewards
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nfts.map((nft) => (
                        <div key={nft.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center">
                            <FiAward className="w-12 h-12 text-purple-400" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{nft.name}</h4>
                          <p className="text-sm text-gray-600 mb-4">{nft.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Token ID: {nft.tokenId}</span>
                            <span className="capitalize">{nft.rarity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900">Transaction History</h3>
                  
                  <div className="space-y-3">
                    {transactionHistory.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'earn' ? 'bg-green-100 text-green-600' : 
                            tx.type === 'spend' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {tx.type === 'earn' ? <FiTrendingUp className="w-5 h-5" /> : 
                             tx.type === 'spend' ? <FiSend className="w-5 h-5" /> : <FiRefreshCw className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{tx.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(tx.timestamp).toLocaleString()}
                            </p>
                            {tx.txHash && (
                              <div className="flex items-center space-x-2 mt-1">
                                <code className="text-xs text-gray-400 font-mono">
                                  {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(tx.txHash)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <FiCopy className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                          </p>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <FiCheckCircle className="w-3 h-3" />
                            <span>Confirmed</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Transfer Modal */}
        {showTransferModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Transfer Points</h3>
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Recipient Address</label>
                  <input
                    type="text"
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Amount</label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTransferModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTransferPoints}
                    disabled={!transferAddress || !transferAmount}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainRewardsWidget;
