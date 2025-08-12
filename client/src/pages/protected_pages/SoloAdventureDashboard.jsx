import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Settings, 
  Bell,
  Map as MapIcon,
  Trophy,
  Zap,
  Crown,
  Sparkles,
  Target,
  Gift
} from 'lucide-react';
import AdventureMap from '../../components/AdventureMap';
import DailyQuestPanel from '../../components/DailyQuestPanel';
import StatsAchievementsPanel from '../../components/StatsAchievementsPanel';
import MotivationalFeed from '../../components/MotivationalFeed';
import RewardsChest from '../../components/RewardsChest';


// Main Dashboard Component
const SoloAdventureDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [dailyData, setDailyData] = useState(null);

  // Mock user data
  const [user] = useState({
    id: '1',
    inAppName: 'DragonSlayer42',
    avatar: {
      type: 'Fire Mage',
      level: 12,
      xp: 2350,
      xpToNext: 500,
      image: '/logo.png'
    },
    streak: 7,
    totalXP: 15420
  });

  const [quests] = useState([
    {
      id: '1',
      title: 'Complete Morning Routine',
      description: 'Start your day with energy!',
      difficulty: 'easy',
      xpReward: 50,
      completed: true,
      dueDate: new Date()
    },
    {
      id: '2',
      title: 'Finish Project Report',
      description: 'The kingdom needs this document!',
      difficulty: 'hard',
      xpReward: 200,
      completed: false,
      dueDate: new Date()
    },
    {
      id: '3',
      title: 'Gym Workout Session',
      description: 'Train your warrior body',
      difficulty: 'medium',
      xpReward: 100,
      completed: false,
      dueDate: new Date()
    }
  ]);

  const [achievements] = useState([
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first quest',
      icon: '🏃',
      rarity: 'common',
      unlockedAt: new Date()
    },
    {
      id: '2',
      name: 'Week Warrior',
      description: '7-day streak achieved!',
      icon: '🔥',
      rarity: 'rare',
      unlockedAt: new Date()
    }
  ]);

  const [stats] = useState({
    todayXP: 250,
    weeklyStreak: 7,
    completionRate: 85,
    totalQuests: 156
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleTaskComplete = (taskId) => {
    console.log('Completing task:', taskId);
    setCelebrationMode(true);
    setTimeout(() => setCelebrationMode(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Zap size={60} className="text-fire-500 mx-auto" />
          </motion.div>
          <div className="text-fire-300 text-xl font-bold">Loading your adventure...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Component */}
      
      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black text-fire-gradient mb-2">
              Welcome back, {user.inAppName}!
            </h1>
            <p className="text-white/80">Ready for today's adventure?</p>
          </div>
          <QuickActionsBar 
            onAddQuest={() => console.log('Add quest')}
            onViewInventory={() => console.log('View inventory')}
            onOpenSettings={() => console.log('Settings')}
            notificationCount={3}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Avatar Section */}
            <HeroAvatarSection 
              avatar={user.avatar}
              isLevelingUp={celebrationMode}
              onAvatarClick={() => console.log('Avatar clicked')}
            />
            
            {/* Daily Quest Panel */}
            <DailyQuestPanel 
              quests={quests}
              onQuestComplete={handleTaskComplete}
              onQuestAdd={() => console.log('Add quest')}
            />
            
            {/* Adventure Map */}
            <AdventureMap 
              currentZone="Productivity Plains"
              unlockedAreas={['Habit Hills', 'Focus Forest', 'Productivity Plains']}
              progressPercentage={65}
              onZoneSelect={(zone) => console.log('Selected zone:', zone)}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats & Achievements */}
            <StatsAchievementsPanel 
              stats={stats}
              achievements={achievements}
              recentUnlocks={achievements.slice(0, 1)}
            />
            
            {/* Motivational Feed */}
            <MotivationalFeed 
              dailyQuote="Every small step is a victory in your grand adventure!"
              storyUpdate="The fires of determination burn bright in your kingdom today..."
              tip="Pro tip: Complete harder quests for bigger XP rewards!"
            />
            
            {/* Rewards Chest */}
            <RewardsChest 
              ownedRewards={[]}
              nextRewards={[
                { id: '1', name: 'Golden Crown', rarity: 'epic', xpRequired: 500 }
              ]}
              chestState="closed"
              onRewardClaim={(id) => console.log('Claim reward:', id)}
            />
          </div>
        </div>
      </div>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {celebrationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {/* Celebration particles and effects */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 50,
                    scale: 0 
                  }}
                  animate={{ 
                    y: -50, 
                    scale: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute w-6 h-6 bg-fire-500 rounded-full"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 69, 0, 0.8)'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hero Avatar Section Component
const HeroAvatarSection = ({ avatar, isLevelingUp, onAvatarClick }) => {
  const xpPercentage = (avatar.xp / (avatar.xp + avatar.xpToNext)) * 100;

  return (
    <motion.div
      className="card-elevated bg-black/40 backdrop-blur-xl border-fire-500/30 p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <motion.div
          className="relative cursor-pointer"
          onClick={onAvatarClick}
          animate={isLevelingUp ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fire-500 to-golden-500 p-1">
            <img 
              src={avatar.image} 
              alt={avatar.type}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 level-badge">
            Lvl {avatar.level}
          </div>
          {isLevelingUp && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
              className="absolute inset-0 rounded-full bg-golden-400/20 border-2 border-golden-400"
            />
          )}
        </motion.div>

        {/* Stats */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-fire-gradient mb-2">
            {avatar.type}
          </h3>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/80">Experience</span>
              <span className="text-golden-400 font-semibold">
                {avatar.xp.toLocaleString()} XP
              </span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill-golden"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs text-white/60 mt-1">
              {avatar.xpToNext} XP to next level
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-fire-400 font-bold text-lg">{avatar.level}</div>
              <div className="text-xs text-white/60">Level</div>
            </div>
            <div className="text-center">
              <div className="text-golden-400 font-bold text-lg">
                {Math.floor(avatar.xp / 100)}
              </div>
              <div className="text-xs text-white/60">Quests</div>
            </div>
            <div className="text-center">
              <div className="text-fire-500 font-bold text-lg">7</div>
              <div className="text-xs text-white/60">Streak</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Quick Actions Bar Component
const QuickActionsBar = ({ onAddQuest, onViewInventory, onOpenSettings, notificationCount }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="flex items-center gap-2"
        animate={{ scale: expanded ? 1.05 : 1 }}
      >
        <motion.button
          className="btn-primary p-3 relative"
          onClick={onAddQuest}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={20} />
        </motion.button>
        
        <motion.button
          className="btn-secondary p-3 relative"
          onClick={onViewInventory}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Gift size={20} />
        </motion.button>
        
        <motion.button
          className="btn-outline p-3 relative"
          onClick={onOpenSettings}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={20} />
          {notificationCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-fire-500 text-white text-xs rounded-full flex items-center justify-center">
              {notificationCount}
            </div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

// Dashboard Background Component
const DashboardBackground = ({ activityLevel, achievements }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-fire-950/20 to-black" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-fire-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 69, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 69, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />
    </div>
  );
};

export default SoloAdventureDashboard;