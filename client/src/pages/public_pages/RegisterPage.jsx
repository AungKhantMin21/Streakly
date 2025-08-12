import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Zap,
  Crown,
  Shield,
  Sword,
  Star,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    inAppName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Dummy avatars with gaming themes
  const avatarOptions = [
    { id: 1, name: 'Fire Mage', image: '/logo.png', color: 'from-red-500 to-orange-500' },
    { id: 2, name: 'Thunder Knight', image: '/logo.png', color: 'from-blue-500 to-purple-500' },
    { id: 3, name: 'Nature Druid', image: '/logo.png', color: 'from-green-500 to-emerald-500' },
    { id: 4, name: 'Shadow Ninja', image: '/logo.png', color: 'from-purple-600 to-indigo-600' },
    { id: 5, name: 'Golden Warrior', image: '/logo.png', color: 'from-yellow-500 to-amber-500' },
    { id: 6, name: 'Ice Guardian', image: '/logo.png', color: 'from-cyan-400 to-blue-500' },
    { id: 7, name: 'Star Archer', image: '/logo.png', color: 'from-pink-500 to-rose-500' },
    { id: 8, name: 'Crystal Monk', image: '/logo.png', color: 'from-teal-500 to-cyan-500' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.inAppName.trim()) newErrors.inAppName = 'In-app name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (selectedAvatar) {
      // Handle registration submission
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-4xl">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= 1 ? 'bg-fire-500 text-white' : 'bg-warm-300 text-warm-600'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {currentStep > 1 ? <Check size={16} /> : '1'}
              </motion.div>
              <div className={`w-20 h-1 rounded ${currentStep >= 2 ? 'bg-fire-500' : 'bg-warm-300'}`} />
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= 2 ? 'bg-fire-500 text-white' : 'bg-warm-300 text-warm-600'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                2
              </motion.div>
            </div>
            <div className="text-center">
              <span className="text-fire-300 font-semibold">
                Step {currentStep} of 2: {currentStep === 1 ? 'Create Account' : 'Choose Your Avatar'}
              </span>
            </div>
          </div>

          {/* Registration Card */}
          <motion.div
            className="card-elevated bg-black/40 backdrop-blur-xl border-fire-500/30 p-8 md:p-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Step 1: Registration Form */}
                  <div className="text-center mb-8">
                    {/* Mascot */}
                    <motion.div
                      className="mb-6"
                      animate={{ 
                        y: [-5, 5, -5],
                        rotate: [-2, 2, -2]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <img 
                        src="/welcome traveler.png" 
                        alt="Streakly Mascot" 
                        className="w-28 h-28 mx-auto mb-4 drop-shadow-lg"
                      />
                      <motion.div
                        className="bg-fire-500/20 border border-fire-500/30 rounded-xl px-4 py-2 inline-block relative"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="text-fire-300 font-semibold">
                          "Welcome, traveler! Ready to start your quest?"
                        </div>
                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-fire-500/20 border-l border-b border-fire-500/30 rotate-45" />
                      </motion.div>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-black text-fire-gradient mb-2">
                      Join the Quest
                    </h1>
                    <p className="text-white/80 text-lg">
                      Create your account and begin your productivity adventure
                    </p>
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-fire-300 font-semibold mb-2 flex items-center gap-2">
                        <User size={18} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="input-primary bg-black/50 border-fire-500/30 focus:border-fire-500"
                        placeholder="Your real name"
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* In-App Name */}
                    <div>
                      <label className="block text-fire-300 font-semibold mb-2 flex items-center gap-2">
                        <Sparkles size={18} />
                        In-App Name
                        <span className="text-xs text-golden-400 bg-golden-500/20 px-2 py-1 rounded">
                          Make it epic!
                        </span>
                      </label>
                      <input
                        type="text"
                        name="inAppName"
                        value={formData.inAppName}
                        onChange={handleInputChange}
                        className="input-primary bg-black/50 border-fire-500/30 focus:border-fire-500"
                        placeholder="DragonSlayer42, TaskMaster, etc."
                      />
                      {errors.inAppName && (
                        <p className="text-red-400 text-sm mt-1">{errors.inAppName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-fire-300 font-semibold mb-2 flex items-center gap-2">
                        <Mail size={18} />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-primary bg-black/50 border-fire-500/30 focus:border-fire-500"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-fire-300 font-semibold mb-2 flex items-center gap-2">
                        <Lock size={18} />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="input-primary bg-black/50 border-fire-500/30 focus:border-fire-500 pr-12"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fire-400 hover:text-fire-300"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-fire-300 font-semibold mb-2 flex items-center gap-2">
                        <Lock size={18} />
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="input-primary bg-black/50 border-fire-500/30 focus:border-fire-500 pr-12"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fire-400 hover:text-fire-300"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Next Button */}
                    <motion.button
                      onClick={handleNextStep}
                      className="btn-primary w-full py-4 text-lg font-bold relative overflow-hidden group"
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(255, 69, 0, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Continue Quest
                        <ArrowRight size={20} />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-golden-500 to-fire-500"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Step 2: Avatar Selection */}
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Zap size={60} className="text-golden-400 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-golden-gradient mb-2">
                      Choose Your Avatar
                    </h2>
                    <p className="text-white/80">
                      Pick your gaming persona for the leaderboards
                    </p>
                  </div>

                  {/* Avatar Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {avatarOptions.map((avatar, index) => (
                      <motion.div
                        key={avatar.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`cursor-pointer group relative ${
                          selectedAvatar?.id === avatar.id ? 'scale-105' : ''
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`
                          bg-gradient-to-br ${avatar.color} p-6 rounded-2xl 
                          border-2 transition-all duration-300
                          ${selectedAvatar?.id === avatar.id 
                            ? 'border-fire-400 shadow-[0_0_30px_rgba(255,69,0,0.6)]' 
                            : 'border-fire-500/30 hover:border-fire-500/50'
                          }
                        `}>
                          <div className="mb-2">
                            <img src={avatar.image} alt={avatar.name} className="w-16 h-16 mx-auto" />
                          </div>
                          <div className="text-white font-bold text-sm text-center">
                            {avatar.name}
                          </div>
                          
                          {/* Selection indicator */}
                          <AnimatePresence>
                            {selectedAvatar?.id === avatar.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -top-2 -right-2 bg-fire-500 text-white rounded-full p-1"
                              >
                                <Check size={16} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => setCurrentStep(1)}
                      className="btn-outline flex-1 py-3 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft size={20} />
                      Back
                    </motion.button>
                    
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!selectedAvatar}
                      className={`flex-1 py-3 font-bold relative overflow-hidden ${
                        selectedAvatar 
                          ? 'btn-primary' 
                          : 'bg-warm-400 text-warm-600 cursor-not-allowed'
                      }`}
                      whileHover={selectedAvatar ? { 
                        scale: 1.02, 
                        boxShadow: "0 20px 40px rgba(255, 69, 0, 0.4)" 
                      } : {}}
                      whileTap={selectedAvatar ? { scale: 0.98 } : {}}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Crown size={20} />
                        Start Adventure!
                      </span>
                      {selectedAvatar && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-golden-500 to-fire-500"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Login Link */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white/60">
              Already have an account?{' '}
              <a href="/login" className="text-fire-400 hover:text-fire-300 font-semibold">
                Sign in here
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </div>
  );
};

export default RegistrationPage;