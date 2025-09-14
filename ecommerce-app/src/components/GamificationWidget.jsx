import React, { useState, useEffect } from 'react';
import { MdStars, MdEmojiEvents, MdCardGiftcard, MdTrendingUp, MdClose } from 'react-icons/md';
import { useGamificationStore } from '../features/gamification/gamificationStore';

const GamificationWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const {
    userProfile,
    badges,
    rewards,
    leaderboard,
    getLevelInfo,
    getLeaderboard,
    getRewards,
    redeemReward
  } = useGamificationStore();

  const levelInfo = getLevelInfo();

  useEffect(() => {
    getLeaderboard();
    getRewards();
  }, [getLeaderboard, getRewards]);

  const handleRedeemReward = (rewardId) => {
    if (redeemReward(rewardId)) {
      alert('Reward redeemed successfully!');
    } else {
      alert('Not enough points or reward unavailable');
    }
  };

  return (
    <>
      {/* Gamification Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
        title="View Rewards & Achievements"
      >
        <MdStars className="w-6 h-6" />
        {userProfile.points > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {userProfile.points}
          </div>
        )}
      </button>

      {/* Gamification Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-5/6 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <MdStars className="w-6 h-6" />
                    <span>Rewards & Achievements</span>
                  </h2>
                  <p className="text-purple-100">Level {levelInfo.level} • {userProfile.points} points</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>

              {/* Level Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Level {levelInfo.level}</span>
                  <span>{levelInfo.pointsToNext} points to next level</span>
                </div>
                <div className="w-full bg-purple-300 rounded-full h-3">
                  <div 
                    className="bg-white rounded-full h-3 transition-all duration-500"
                    style={{ width: `${levelInfo.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'profile', label: 'Profile', icon: MdTrendingUp },
                { id: 'badges', label: 'Badges', icon: MdEmojiEvents },
                { id: 'rewards', label: 'Rewards', icon: MdCardGiftcard }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{userProfile.points}</div>
                      <div className="text-sm text-blue-800">Total Points</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{userProfile.level}</div>
                      <div className="text-sm text-green-800">Current Level</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">{userProfile.streak}</div>
                      <div className="text-sm text-orange-800">Day Streak</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">{badges.length}</div>
                      <div className="text-sm text-purple-800">Badges Earned</div>
                    </div>
                  </div>

                  {/* Leaderboard */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
                    <div className="space-y-2">
                      {leaderboard.map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                            <span className="text-2xl">{user.avatar}</span>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">Level {user.level}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">{user.points} pts</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'badges' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Badges</h3>
                  {badges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {badges.map((badge) => (
                        <div key={badge.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-3xl">{badge.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{badge.name}</h4>
                              <p className="text-sm text-gray-600">{badge.description}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MdEmojiEvents className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No badges yet</h3>
                      <p className="text-gray-600">Start shopping to earn your first badge!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'rewards' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((reward) => (
                      <div key={reward.id} className={`p-4 rounded-lg border-2 ${
                        reward.available 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{reward.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{reward.name}</h4>
                              <p className="text-sm text-gray-600">{reward.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">{reward.pointsCost} pts</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRedeemReward(reward.id)}
                          disabled={!reward.available}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            reward.available
                              ? 'bg-purple-600 hover:bg-purple-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {reward.available ? 'Redeem' : 'Not Available'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GamificationWidget;
