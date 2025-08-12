import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame, Zap, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

const PublicNavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features', icon: Zap },
    { name: 'How It Works', href: '#how-it-works', icon: Users },
    { name: 'Leaderboard', href: '#leaderboard', icon: Trophy },
    { name: 'Pricing', href: '#pricing', icon: Flame },
  ];

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    },
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`top-0 left-0 w-full z-50 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.div 
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')} 
            >
              <div className="relative">
                <div className="text-4xl"><img src="/logo.png" alt="" className='w-16 h-16' /></div>
                <motion.div
                  className="absolute inset-0 text-4xl"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <img src="/logo.png" alt="" className='w-16 h-16' />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-fire-gradient">
                  Streakly
                </h1>
                <div className="text-xs text-golden-400 font-semibold tracking-wider">
                  PRODUCTIVITY GAME
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative group px-4 py-2 text-white/80 hover:text-white transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={18} className="text-fire-400" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  
                  {/* Hover effect line */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-fire-500 to-golden-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-fire-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline px-6 py-2 text-sm"
                onClick={() => {
                    navigate('/login');
                }}
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 69, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-2 text-sm relative overflow-hidden group"
                onClick={() => {
                    navigate('/register');
                }}
              >
                <span className="relative z-10">Start Playing</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-golden-500 to-fire-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-fire-400 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-fire-900/95 to-black/95 backdrop-blur-lg border-l border-fire-500/30 shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 px-6">
                
                {/* Navigation Items */}
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      variants={mobileItemVariants}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-fire-500/20 hover:border-fire-500/40 transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-fire-500/20 group-hover:bg-fire-500/30 transition-colors">
                        <item.icon size={20} className="text-fire-400" />
                      </div>
                      <span className="text-white font-medium">{item.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="mt-8 space-y-4">
                  <motion.button
                    variants={mobileItemVariants}
                    className="w-full btn-outline py-3"
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/login');
                    }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    variants={mobileItemVariants}
                    className="w-full btn-primary py-3 relative overflow-hidden group"
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/register');
                    }}
                  >
                    <span className="relative z-10">Start Playing</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-golden-500 to-fire-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-auto mb-8">
                  <div className="text-center text-fire-300/60 text-sm">
                    🔥 Level up your productivity 🔥
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicNavBar;