import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sword, 
  Shield, 
  Sparkles, 
  Plus, 
  Check, 
  Clock, 
  Star,
  Zap,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const DailyQuestPanel = ({ quests, onQuestComplete, onQuestAdd }) => {
  const [completingQuest, setCompletingQuest] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [expanded, setExpanded] = useState(true);

  const filteredQuests = quests.filter(quest => {
    if (filterType === 'completed') return quest.completed;
    if (filterType === 'active') return !quest.completed;
    return true;
  });

  const handleQuestComplete = async (questId) => {
    setCompletingQuest(questId);
    
    // Simulate completion animation
    setTimeout(() => {
      onQuestComplete(questId);
      setCompletingQuest(null);
    }, 800);
  };

  const getDifficultyInfo = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return { color: 'text-green-400', bg: 'bg-green-500/20', icon: Sparkles, gems: 1 };
      case 'medium':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Sword, gems: 2 };
      case 'hard':
        return { color: 'text-red-400', bg: 'bg-red-500/20', icon: Shield, gems: 3 };
      default:
        return { color: 'text-fire-400', bg: 'bg-fire-500/20', icon: Star, gems: 1 };
    }
  };

  return (
    <motion.div
      className="card-elevated bg-black/40 backdrop-blur-xl border-fire-500/30 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-fire-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Target size={24} className="text-fire-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-fire-gradient">Daily Quests</h2>
            <div className="streak-counter text-sm px-3 py-1">
              {filteredQuests.filter(q => q.completed).length}/{filteredQuests.length}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filter Buttons */}
            <div className="flex bg-black/30 rounded-lg p-1">
              {['all', 'active', 'completed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  className={`px-3 py-1 text-xs rounded capitalize transition-all ${
                    filterType === filter
                      ? 'bg-fire-500 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 text-fire-400 hover:text-fire-300 transition-colors"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Quest List */}
              <AnimatePresence mode="popLayout">
                {filteredQuests.map((quest, index) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={() => handleQuestComplete(quest.id)}
                    isCompleting={completingQuest === quest.id}
                    delay={index * 0.1}
                  />
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {filteredQuests.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-white/40 mb-4">
                    {filterType === 'completed' ? 'No completed quests yet' : 
                     filterType === 'active' ? 'No active quests' : 'No quests available'}
                  </div>
                  <button
                    onClick={onQuestAdd}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Your First Quest
                  </button>
                </motion.div>
              )}

              {/* Add Quest Button */}
              {filteredQuests.length > 0 && (
                <motion.button
                  onClick={onQuestAdd}
                  className="w-full border-2 border-dashed border-fire-500/30 hover:border-fire-500/60 rounded-xl p-4 text-fire-400 hover:text-fire-300 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={20} />
                  Add New Quest
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Individual Quest Card Component
const QuestCard = ({ quest, onComplete, isCompleting, delay = 0 }) => {
  const difficultyInfo = getDifficultyInfo(quest.difficulty);
  const DifficultyIcon = difficultyInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.3, delay }}
      className={`relative group ${
        quest.completed ? 'opacity-60' : ''
      }`}
    >
      <div className={`
        bg-gradient-to-r from-black/50 to-fire-950/30 rounded-xl border transition-all duration-300
        ${quest.completed 
          ? 'border-golden-500/50 shadow-[0_0_20px_rgba(255,165,0,0.2)]' 
          : 'border-fire-500/20 hover:border-fire-500/40 hover:shadow-[0_0_20px_rgba(255,69,0,0.1)]'
        }
      `}>
        
        {/* Completion Animation Overlay */}
        <AnimatePresence>
          {isCompleting && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-golden-500/20 rounded-xl flex items-center justify-center z-10"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
                className="text-golden-400"
              >
                <Sparkles size={40} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4">
          <div className="flex items-start gap-4">
            {/* Difficulty Indicator */}
            <div className={`flex-shrink-0 p-2 rounded-lg ${difficultyInfo.bg}`}>
              <DifficultyIcon size={20} className={difficultyInfo.color} />
            </div>

            {/* Quest Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    quest.completed ? 'text-white/80 line-through' : 'text-white'
                  }`}>
                    {quest.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{quest.description}</p>
                  
                  {/* Quest Meta */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-golden-400">
                      <Zap size={12} />
                      {quest.xpReward} XP
                    </div>
                    <div className="flex items-center gap-1 text-fire-400">
                      <Star size={12} />
                      {quest.difficulty}
                    </div>
                    {quest.dueDate && (
                      <div className="flex items-center gap-1 text-white/50">
                        <Clock size={12} />
                        Due today
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  {quest.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-10 h-10 bg-golden-500/20 border border-golden-500/50 rounded-full flex items-center justify-center"
                    >
                      <Check size={16} className="text-golden-400" />
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={onComplete}
                      disabled={isCompleting}
                      className="w-10 h-10 bg-fire-500/20 hover:bg-fire-500/40 border border-fire-500/50 hover:border-fire-500 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isCompleting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles size={16} className="text-fire-400" />
                        </motion.div>
                      ) : (
                        <div className="w-3 h-3 border-2 border-fire-400 rounded-full group-hover:bg-fire-400 transition-all" />
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar for Completion Animation */}
          {isCompleting && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-fire-500 to-golden-500 rounded-b-xl"
            />
          )}
        </div>
      </div>

      {/* Difficulty Gems */}
      <div className="absolute top-2 right-2 flex gap-1">
        {[...Array(difficultyInfo.gems)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + (i * 0.1) }}
            className={`w-2 h-2 rounded-full ${difficultyInfo.bg} ${difficultyInfo.color.replace('text-', 'bg-')}`}
            style={{ 
              boxShadow: `0 0 8px ${difficultyInfo.color.includes('green') ? '#10b981' : 
                                   difficultyInfo.color.includes('yellow') ? '#f59e0b' : '#ef4444'}40`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Helper function moved outside component
const getDifficultyInfo = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { color: 'text-green-400', bg: 'bg-green-500/20', icon: Sparkles, gems: 1 };
    case 'medium':
      return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Sword, gems: 2 };
    case 'hard':
      return { color: 'text-red-400', bg: 'bg-red-500/20', icon: Shield, gems: 3 };
    default:
      return { color: 'text-fire-400', bg: 'bg-fire-500/20', icon: Star, gems: 1 };
  }
};

export default DailyQuestPanel;