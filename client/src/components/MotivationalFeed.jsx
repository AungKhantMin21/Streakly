import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote, BookOpen, Lightbulb } from 'lucide-react';

const MotivationalFeed = () => {
  const [currentFeed, setCurrentFeed] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const feedItems = [
    {
      type: 'quote',
      content: 'The fire of achievement is lit by the spark of action.',
      icon: <Quote className="text-golden-400" />,
      author: 'Ancient Flame Keeper'
    },
    {
      type: 'tip',
      content: 'Complete your morning quests first to maximize your daily XP bonus!',
      icon: <Lightbulb className="text-fire-400" />,
      source: 'Pro Tip'
    },
    {
      type: 'story',
      content: 'In the land of Pyralis, the Eternal Flame grows stronger with every completed task...',
      icon: <BookOpen className="text-amber-400" />,
      source: 'The Eternal Flame Chronicles'
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentFeed((prev) => (prev + 1) % feedItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered, feedItems.length]);

  const currentItem = feedItems[currentFeed];

  return (
    <div 
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-fire-500/30 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-fire-500/20 rounded-lg text-fire-400">
          {currentItem.icon}
        </div>
        <h3 className="text-lg font-bold text-white">
          {currentItem.type === 'quote' ? 'Daily Wisdom' : 
           currentItem.type === 'tip' ? 'Pro Tip' : 'Lore Update'}
        </h3>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeed}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-h-[100px]"
        >
          <p className="text-white/90 mb-3 italic">"{currentItem.content}"</p>
          <p className="text-sm text-fire-300">
            — {currentItem.author || currentItem.source}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-4">
        {feedItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentFeed(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentFeed === index ? 'bg-fire-500 w-6' : 'bg-fire-500/30'
            }`}
            aria-label={`View ${feedItems[index].type}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MotivationalFeed;