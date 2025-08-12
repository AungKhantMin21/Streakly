import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Zap, Target, TrendingUp, Users, Star, ChevronDown } from 'lucide-react';

const HeroBanner = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 1000], [0, -150]);

  // Floating UI card data
  const floatingCards = [
    {
      id: 1,
      icon: Zap,
      title: "25 Day Streak",
      subtitle: "🔥 On fire!",
      position: { top: '20%', right: '15%' },
      delay: 0,
      color: 'fire'
    },
    {
      id: 2,
      icon: Target,
      title: "+150 Points",
      subtitle: "Task completed!",
      position: { top: '60%', left: '10%' },
      delay: 1,
      color: 'golden'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Level 12",
      subtitle: "Productivity Ninja",
      position: { bottom: '25%', right: '20%' },
      delay: 2,
      color: 'energy'
    },
    {
      id: 4,
      icon: Users,
      title: "#3 on Team",
      subtitle: "Keep pushing!",
      position: { top: '40%', left: '5%' },
      delay: 1.5,
      color: 'fire'
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 1.2 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(255, 69, 0, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const floatingVariants = {
    initial: { opacity: 0, y: 100, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative" ref={heroRef}>

      {/* Main Content */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Main Title */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div variants={wordVariants} className="mb-4">
              <span className="text-6xl md:text-8xl lg:text-9xl font-black text-fire-gradient leading-none">
                STREAK
              </span>
              <motion.span 
                className="text-6xl md:text-8xl lg:text-9xl font-black text-golden-gradient leading-none ml-4"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(255, 165, 0, 0.5)",
                    "0 0 40px rgba(255, 165, 0, 0.8)",
                    "0 0 20px rgba(255, 165, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                LY
              </motion.span>
            </motion.div>
            
            <motion.h2 
              variants={wordVariants}
              className="text-xl md:text-2xl lg:text-3xl text-fire-300 font-semibold tracking-wider uppercase"
            >
              Level Up Your Team's Productivity
            </motion.h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={wordVariants}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform boring tasks into an addictive game. Track progress, earn points, 
            climb leaderboards, and build unstoppable habits with your team.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.05, borderColor: '#ffa500' }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline px-8 py-4 text-lg font-bold group"
            >
              <span className="flex items-center gap-3">
                <Play size={20} className="rotate-0 group-hover:rotate-12 transition-transform" />
                Start Playing Now
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 text-center"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: "500+", label: "Teams Playing", icon: Users },
              { number: "50K+", label: "Tasks Completed", icon: Target },
              { number: "98%", label: "Engagement Rate", icon: TrendingUp },
              { number: "4.9★", label: "User Rating", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={wordVariants}
                className="flex flex-col items-center gap-2 min-w-[120px]"
              >
                <stat.icon className="text-fire-400 mb-1" size={24} />
                <div className="text-2xl md:text-3xl font-black text-golden-gradient">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating UI Cards */}
      <AnimatePresence>
        {floatingCards.map((card) => (
          <motion.div
            key={card.id}
            className="absolute hidden lg:block z-20"
            style={card.position}
            variants={floatingVariants}
            initial="initial"
            animate={["animate", "float"]}
            transition={{ delay: card.delay }}
          >
            <motion.div
              className="card p-4 bg-black/20 backdrop-blur-xl border-fire-500/30 hover:border-fire-500/50 transition-all duration-300 min-w-[200px]"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  card.color === 'fire' ? 'bg-fire-500/20 text-fire-400' :
                  card.color === 'golden' ? 'bg-golden-500/20 text-golden-400' :
                  'bg-fire-600/20 text-fire-500'
                }`}>
                  <card.icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-white">{card.title}</div>
                  <div className="text-sm text-white/60">{card.subtitle}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 cursor-pointer transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;