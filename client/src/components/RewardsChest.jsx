import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ChevronRight, X, Zap, Crown, Star, Flame, Lock } from 'lucide-react';

const RewardsChest = () => {
  const [chestState, setChestState] = useState('closed'); // 'closed' | 'opening' | 'opened'
  const [selectedReward, setSelectedReward] = useState(null);
  const [showReward, setShowReward] = useState(false);

  const rewards = [
    {
      id: 'r1',
      name: 'Flame Wielder Title',
      description: 'A rare title for consistent achievers',
      icon: Flame,
      iconClass: 'text-fire-500',
      rarity: 'rare',
      xp: 100,
      unlocked: true
    },
    {
      id: 'r2',
      name: 'Golden Avatar Frame',
      description: 'Shine bright with this exclusive frame',
      icon: Star,
      iconClass: 'text-golden-400',
      rarity: 'epic',
      xp: 250,
      unlocked: true
    },
    {
      id: 'r3',
      name: 'Dragon Companion',
      description: 'A loyal fire dragon companion',
      icon: Zap,
      iconClass: 'text-amber-400',
      rarity: 'legendary',
      xp: 500,
      unlocked: false
    }
  ];

  const handleChestClick = () => {
    if (chestState === 'closed') {
      setChestState('opening');
      setTimeout(() => {
        setChestState('opened');
        // Auto-select a random unlocked reward
        const unlockedRewards = rewards.filter(r => r.unlocked);
        if (unlockedRewards.length > 0) {
          const randomReward = unlockedRewards[Math.floor(Math.random() * unlockedRewards.length)];
          setTimeout(() => {
            setSelectedReward(randomReward);
            setShowReward(true);
          }, 500);
        }
      }, 1000);
    }
  };

  const handleCloseReward = () => {
    setShowReward(false);
    setTimeout(() => {
      setChestState('closed');
      setSelectedReward(null);
    }, 300);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-300';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-golden-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-fire-500/30 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Gift className="text-fire-400" />
          Your Reward Chest
        </h3>
        <div className="text-sm text-fire-300">
          {rewards.filter(r => r.unlocked).length} / {rewards.length} Unlocked
        </div>
      </div>

      {/* Chest animation */}
      <div className="relative h-48 mb-6 flex items-center justify-center">
        <AnimatePresence>
          {chestState === 'closed' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="text-6xl cursor-pointer hover:scale-110 transition-transform"
                onClick={handleChestClick}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                🎁
              </motion.div>
            </motion.div>
          )}

          {chestState === 'opening' && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-6xl">🎁</div>
            </motion.div>
          )}

          {chestState === 'opened' && !showReward && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-6xl">✨</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reward popup */}
        <AnimatePresence>
          {showReward && selectedReward && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border border-fire-500/30 flex flex-col items-center justify-center"
            >
              <button
                onClick={handleCloseReward}
                className="absolute top-2 right-2 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div
                className={`mb-4 p-4 rounded-full bg-gradient-to-br from-fire-900/50 to-black/50 border ${
                  getRarityColor(selectedReward.rarity).replace('text-', 'border-')
                }`}
              >
                <selectedReward.icon className={selectedReward.iconClass} size={24} />
              </div>
              
              <h4 className="text-xl font-bold text-center text-white mb-1">
                {selectedReward.name}
              </h4>
              <p className="text-sm text-center text-white/70 mb-3">
                {selectedReward.description}
              </p>
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                <Zap size={16} className="fill-amber-400" />
                +{selectedReward.xp} XP
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-fire-500 to-amber-500 text-white rounded-full text-sm font-medium"
              >
                Claim Reward
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rewards grid */}
      <div className="grid grid-cols-3 gap-3">
        {rewards.map((reward) => {
          const Icon = reward.icon;
          return (
            <div
              key={reward.id}
              className={`p-3 rounded-lg border ${
                reward.unlocked
                  ? 'border-fire-500/30 bg-gradient-to-br from-fire-900/10 to-black/20'
                  : 'border-gray-700/50 bg-gray-900/20'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  reward.unlocked
                    ? getRarityColor(reward.rarity).replace('text-', 'bg-') + '/10'
                    : 'bg-gray-800'
                }`}
              >
                {reward.unlocked ? (
                  <Icon className={reward.iconClass} size={16} />
                ) : (
                  <Lock className="text-gray-600" size={16} />
                )}
              </div>
              <div className="text-xs font-medium text-white/90 truncate">
                {reward.name}
              </div>
              {!reward.unlocked && (
                <div className="text-[10px] text-gray-500 mt-1">Locked</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsChest;
