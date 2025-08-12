import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map as MapIcon, 
  MapPin, 
  Lock, 
  Unlock,
  Mountain, 
  TreePine, 
  Castle, 
  Zap,
  Crown,
  Star,
  ChevronRight
} from 'lucide-react';

const AdventureMap = ({ currentZone, unlockedAreas, progressPercentage, onZoneSelect }) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(true);
  const [animatingProgress, setAnimatingProgress] = useState(false);

  // Adventure zones data
  const zones = [
    {
      id: 'habit-hills',
      name: 'Habit Hills',
      description: 'Where small routines become mighty habits',
      icon: Mountain,
      position: { x: 15, y: 70 },
      unlockLevel: 1,
      rewards: ['Basic Avatar Items', '50 XP per quest'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'focus-forest',
      name: 'Focus Forest',
      description: 'Deep concentration grows here',
      icon: TreePine,
      position: { x: 40, y: 45 },
      unlockLevel: 5,
      rewards: ['Focus Boost Items', '75 XP per quest'],
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'productivity-plains',
      name: 'Productivity Plains',
      description: 'Vast fields of completed tasks',
      icon: MapPin,
      position: { x: 65, y: 60 },
      unlockLevel: 10,
      rewards: ['Efficiency Tools', '100 XP per quest'],
      color: 'from-fire-500 to-orange-600'
    },
    {
      id: 'mastery-mountains',
      name: 'Mastery Mountains',
      description: 'Peak performance awaits the dedicated',
      icon: Mountain,
      position: { x: 85, y: 25 },
      unlockLevel: 20,
      rewards: ['Master Equipment', '150 XP per quest'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'legend-castle',
      name: 'Legend Castle',
      description: 'Where productivity legends are born',
      icon: Castle,
      position: { x: 90, y: 15 },
      unlockLevel: 50,
      rewards: ['Legendary Titles', '200 XP per quest'],
      color: 'from-golden-500 to-yellow-600'
    }
  ];

  const handleZoneClick = (zone) => {
    const isUnlocked = unlockedAreas.includes(zone.name);
    if (isUnlocked) {
      setSelectedZone(zone);
      onZoneSelect(zone.name);
    }
  };

  const handleZoneEnter = (zone) => {
    if (selectedZone?.id !== zone.id) {
      setSelectedZone(zone);
    }
  };

  const isZoneUnlocked = (zoneName) => {
    return unlockedAreas.includes(zoneName);
  };

  const isCurrentZone = (zoneName) => {
    return currentZone === zoneName;
  };

  return (
    <motion.div
      className="card-elevated bg-black/40 backdrop-blur-xl border-fire-500/30 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-fire-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MapIcon size={24} className="text-fire-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-fire-gradient">Adventure Map</h2>
          </div>
          
          <div className="text-right">
            <div className="text-golden-400 font-bold text-lg">
              {progressPercentage}%
            </div>
            <div className="text-xs text-white/60">Journey Complete</div>
          </div>
        </div>
        
        {/* Progress Trail */}
        <div className="mt-4">
          <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-fire-500 via-golden-500 to-fire-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Animated spark at progress end */}
            <motion.div
              className="absolute top-1/2 w-3 h-3 bg-golden-400 rounded-full transform -translate-y-1/2"
              style={{ left: `${Math.max(progressPercentage - 2, 0)}%` }}
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 10px rgba(255, 165, 0, 0.5)',
                  '0 0 20px rgba(255, 165, 0, 0.8)',
                  '0 0 10px rgba(255, 165, 0, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80 p-6 overflow-hidden">
        {/* Background landscape */}
        <div className="absolute inset-0">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-purple-900/20 to-black/40" />
          
          {/* Mountain silhouettes */}
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 400 100">
            <polygon 
              fill="url(#mountainGradient)" 
              points="0,100 50,60 100,70 150,40 200,50 250,30 300,45 350,20 400,35 400,100"
            />
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#1f2937', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:'#0f172a', stopOpacity:1}} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Floating particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-fire-400/40 rounded-full"
              animate={{
                x: [0, Math.random() * 100, 0],
                y: [0, Math.random() * 50, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
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

        {/* Adventure Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset={`${progressPercentage}%`} stopColor="#f59e0b" />
              <stop offset={`${progressPercentage + 5}%`} stopColor="#6b7280" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>
          
          <path
            d={`M ${zones[0].position.x / 100 * 1000} ${zones[0].position.y / 100 * 500} ${
              zones.slice(1).map(zone => `L ${zone.position.x / 100 * 1000} ${zone.position.y / 100 * 500}`).join(' ')
            }`}
            stroke="url(#pathGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
            className="opacity-60"
            transform="scale(0.1)"
          />
          
          {/* Animated path progress */}
          <motion.path
            d={`M ${zones[0].position.x / 100 * 1000} ${zones[0].position.y / 100 * 500} ${
              zones.slice(1).map(zone => `L ${zone.position.x / 100 * 1000} ${zone.position.y / 100 * 500}`).join(' ')
            }`}
            stroke="#f59e0b"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progressPercentage / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))'
            }}
            transform="scale(0.1)"
          />
        </svg>

        {/* Zone Markers */}
        {zones.map((zone, index) => {
          const IconComponent = zone.icon;
          const unlocked = isZoneUnlocked(zone.name);
          const current = isCurrentZone(zone.name);
          
          return (
            <motion.div
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{
                left: `${zone.position.x}%`,
                top: `${zone.position.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => handleZoneClick(zone)}
              onHoverStart={() => handleZoneEnter(zone)}
              whileHover={{ scale: unlocked ? 1.1 : 1 }}
              whileTap={{ scale: unlocked ? 0.95 : 1 }}
            >
              {/* Zone Circle */}
              <div className={`
                relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${unlocked 
                  ? `bg-gradient-to-br ${zone.color} border-white/50 shadow-lg` 
                  : 'bg-gray-600 border-gray-400 opacity-50'
                }
                ${current ? 'ring-4 ring-fire-400/50 animate-pulse' : ''}
              `}>
                {unlocked ? (
                  <IconComponent size={20} className="text-white" />
                ) : (
                  <Lock size={16} className="text-gray-300" />
                )}
                
                {/* Current zone indicator */}
                {current && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-fire-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Star size={10} className="text-white" />
                  </motion.div>
                )}
              </div>

              {/* Zone Label */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                <div className={`text-xs font-semibold px-2 py-1 rounded ${
                  unlocked ? 'text-white bg-black/50' : 'text-gray-400 bg-black/30'
                }`}>
                  {zone.name}
                </div>
              </div>

              {/* Unlock level indicator */}
              {!unlocked && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {zone.unlockLevel}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Zone Details Tooltip */}
        <AnimatePresence>
          {selectedZone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl border border-fire-500/30 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedZone.color}`}>
                  <selectedZone.icon size={20} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{selectedZone.name}</h3>
                  <p className="text-white/70 text-sm mb-2">{selectedZone.description}</p>
                  
                  <div className="space-y-1">
                    <div className="text-xs text-golden-400">Rewards:</div>
                    {selectedZone.rewards.map((reward, i) => (
                      <div key={i} className="text-xs text-white/60 flex items-center gap-1">
                        <ChevronRight size={10} />
                        {reward}
                      </div>
                    ))}
                  </div>
                </div>

                {isZoneUnlocked(selectedZone.name) && (
                  <motion.button
                    className="btn-primary text-xs py-2 px-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onZoneSelect(selectedZone.name)}
                  >
                    Enter Zone
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdventureMap;