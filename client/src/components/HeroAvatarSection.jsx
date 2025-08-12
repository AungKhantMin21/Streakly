import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, ChevronDown } from 'lucide-react';

const HeroAvatarSection = ({ avatar, onAvatarClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const xpPercentage = Math.min(100, Math.max(0, (avatar.xp / (avatar.xp + avatar.xpToNext)) * 100));

  return (
    <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-fire-500/30">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar Image */}
        <motion.div 
          className="relative group cursor-pointer"
          onClick={onAvatarClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-fire-500 to-golden-500 p-1">
            <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
              <img 
                src={avatar.image} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-fire-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>Lv. {avatar.level}</span>
          </div>
        </motion.div>

        {/* XP and Stats */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{avatar.type}</h2>
            <div 
              className="text-fire-300 text-sm cursor-help relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Zap className="w-5 h-5" />
              {showTooltip && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 border border-fire-500/30 rounded-lg p-3 text-xs z-10">
                  <p>XP: {avatar.xp} / {avatar.xp + avatar.xpToNext}</p>
                  <p>Next level: {avatar.xpToNext} XP</p>
                </div>
              )}
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-fire-500 to-golden-500"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-fire-400 text-sm">Total XP</div>
              <div className="text-white font-bold">{avatar.totalXP}</div>
            </div>
            <div className="text-center">
              <div className="text-fire-400 text-sm">Streak</div>
              <div className="text-white font-bold flex items-center justify-center gap-1">
                <Flame className="text-fire-500" size={16} />
                {avatar.streak}
              </div>
            </div>
            <div className="text-center">
              <div className="text-fire-400 text-sm">Title</div>
              <div className="text-white font-bold text-sm">Flame Keeper</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAvatarSection;