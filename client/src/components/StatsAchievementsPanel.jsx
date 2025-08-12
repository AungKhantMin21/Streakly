import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, Award, Star, ChevronRight } from 'lucide-react';

const StatsAchievementsPanel = ({ stats, achievements, className = '' }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Default stats if not provided
  const statsData = stats || {
    streak: 7,
    level: 12,
    xp: 2350,
    xpToNext: 500,
    questsCompleted: 42,
    weeklyGoal: 15,
  };

  const StatItem = ({ icon, label, value, progress, color }) => (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-fire-500/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-fire-300">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-white font-bold">{value}</span>
      </div>
      {progress !== undefined && (
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );

  // Default achievements if not provided
  const achievementsData = achievements || [
    {
      id: 'a1',
      title: 'First Steps',
      description: 'Complete your first quest',
      icon: <Star className="text-amber-400" />,
      unlocked: true,
      date: '2025-08-05',
      rarity: 'common',
    },
    {
      id: 'a2',
      title: 'Flame Keeper',
      description: 'Maintain a 7-day streak',
      icon: <Flame className="text-fire-500" />,
      unlocked: true,
      date: '2025-08-11',
      rarity: 'rare',
    },
    {
      id: 'a3',
      title: 'Quest Master',
      description: 'Complete 50 quests',
      icon: <Award className="text-golden-400" />,
      unlocked: false,
      progress: 42,
      total: 50,
      rarity: 'epic',
    },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-500';
      case 'rare': return 'border-blue-500';
      case 'epic': return 'border-purple-500';
      case 'legendary': return 'border-golden-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className={`bg-black/30 backdrop-blur-sm rounded-2xl border border-fire-500/30 overflow-hidden ${className}`}>
      {/* Tabs */}
      <div className="flex border-b border-fire-500/20">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'stats'
              ? 'text-fire-400 border-b-2 border-fire-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          Stats
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-3 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'achievements'
              ? 'text-fire-400 border-b-2 border-fire-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          Achievements
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'stats' ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <StatItem
                icon={<Flame className="text-fire-400" />}
                label="Current Streak"
                value={`${statsData.streak} days`}
                progress={statsData.streak / 7 * 100}
                color="from-fire-500 to-amber-500"
              />
              <StatItem
                icon={<Zap className="text-amber-400" />}
                label="Level Progress"
                value={`${statsData.level} (${statsData.xp}/${statsData.xpToNext + statsData.xp} XP)`}
                progress={(statsData.xp / (statsData.xpToNext + statsData.xp)) * 100}
                color="from-amber-400 to-golden-500"
              />
              <StatItem
                icon={<Award className="text-golden-400" />}
                label="Quests Completed"
                value={`${statsData.questsCompleted}`}
                progress={(statsData.questsCompleted / 100) * 100}
                color="from-golden-400 to-yellow-300"
              />
              <StatItem
                icon={<Star className="text-white/80" />}
                label="Weekly Goal"
                value={`${Math.min(statsData.questsCompleted, statsData.weeklyGoal)}/${statsData.weeklyGoal}`}
                progress={(statsData.questsCompleted / statsData.weeklyGoal) * 100}
                color="from-blue-400 to-cyan-400"
              />
            </motion.div>
          ) : (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {achievementsData.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked
                      ? `${getRarityColor(achievement.rarity)}/30 bg-gradient-to-r from-black/30 to-black/10`
                      : 'border-gray-700/50 bg-gray-900/20'
                  } relative overflow-hidden group`}
                  whileHover={{ y: -2 }}
                  onClick={() => achievement.unlocked && setSelectedAchievement(achievement)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-fire-900/50 to-black/50'
                        : 'bg-gray-800/50'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate ${
                        achievement.unlocked ? 'text-white' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        {achievement.description}
                      </p>
                      {!achievement.unlocked && achievement.progress && (
                        <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-fire-500 to-amber-500"
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <ChevronRight className="text-gray-500 group-hover:text-fire-400 transition-colors" />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedAchievement(null);
              }}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-fire-500/30 p-6 w-full max-w-md relative overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              > 
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-fire-500/20 to-amber-500/20 rounded-xl blur opacity-70"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-fire-900/50 to-black/50 border ${
                        getRarityColor(selectedAchievement.rarity)
                      }`}>
                        {selectedAchievement.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{selectedAchievement.title}</h3>
                        <div className={`text-sm ${
                          selectedAchievement.rarity === 'common' ? 'text-gray-300' :
                          selectedAchievement.rarity === 'rare' ? 'text-blue-400' :
                          selectedAchievement.rarity === 'epic' ? 'text-purple-400' : 'text-golden-400'
                        } font-medium`}>
                          {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAchievement(null)}
                      className="text-gray-400 hover:text-white p-1 -m-2"
                    >
                      ✕
                    </button>
                  </div>
  
                  <p className="text-gray-300 mb-6">{selectedAchievement.description}</p>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-fire-500/20">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Unlocked on:</span>
                      <span className="text-white font-medium">
                        {selectedAchievement.unlockedAt ? (
                          selectedAchievement.unlockedAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        ) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Reward:</span>
                      <div className="flex items-center gap-2 text-golden-400 font-medium">
                        <Zap className="w-4 h-4" />
                        <span>+100 XP</span>
                      </div>
                    </div>
                  </div>
  
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="mt-6 w-full py-2.5 bg-gradient-to-r from-fire-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Got it!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  // Add this at the very end of the file
  export default StatsAchievementsPanel;
          