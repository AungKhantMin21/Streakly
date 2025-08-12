import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Zap, Pause, Play, Volume2, VolumeX, SkipForward as Skip, Map, Crown, Target, Flame, Gift, ArrowRight, Users, BookOpen, Heart, Star, ArrowBigLeft, Trophy, ArrowBigRightDash, ArrowBigRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const OnboardingPage = ({ onComplete, onSkip, userName = "Traveler" }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [xpValue, setXpValue] = useState(0);
    const [level, setLevel] = useState(1);
    const [streakCount, setStreakCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const stepTimers = useRef([]);
    const startTime = useRef(Date.now());

    // Analytics tracking
    const trackEvent = (eventName, properties = {}) => {
        console.log('Analytics:', eventName, {
            step: currentStep,
            timestamp: Date.now() - startTime.current,
            ...properties
        });
    };

    const steps = [
        {
            id: 'entrance',
            duration: 20000,
            title: 'Welcome!',
            component: EntranceStep
        },
        {
            id: 'realms',
            duration: 20000,
            title: 'Explore Realms',
            component: RealmsStep
        },
        {
            id: 'xp-leveling',
            duration: 20000,
            title: 'Gain Experience',
            component: XPLevelingStep
        },
        {
            id: 'streaks',
            duration: 20000,
            title: 'Build Streaks',
            component: StreaksStep
        },
        {
            id: 'rewards',
            duration: 20000,
            title: 'Unlock Rewards',
            component: RewardsStep
        },
        {
            id: 'cta',
            duration: 0, // Manual progression
            title: 'Start Adventure',
            component: CTAStep
        }
    ];

    // Auto-advance steps with countdown timer
    useEffect(() => {
        if (!isPlaying || currentStep >= steps.length - 1) return;

        const currentStepDuration = steps[currentStep]?.duration;
        if (currentStepDuration > 0) {
            setTimeRemaining(Math.ceil(currentStepDuration / 1000));
            
            // Update timer every second
            const interval = setInterval(() => {
                setTimeRemaining(prev => Math.max(0, prev - 1));
            }, 1000);
            
            // Auto-advance after duration
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                trackEvent('step_auto_advance', { from_step: currentStep });
            }, currentStepDuration);

            stepTimers.current.push(interval, timer);
            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [currentStep, isPlaying]);

    // Cleanup timers
    useEffect(() => {
        return () => {
            stepTimers.current.forEach(timer => clearTimeout(timer));
        };
    }, []);

    const handleSkip = () => {
        if (currentStep < steps.length - 1) {
            trackEvent('step_skipped', { from_step: currentStep });
            setCurrentStep(prev => prev + 1);
            // Reset any running animations for the current step
            stepTimers.current.forEach(timer => clearTimeout(timer));
            stepTimers.current = [];
        }
    };

    const handleComplete = (action) => {
        trackEvent('onboarding_completed', { final_action: action });
        setIsPlaying(false);
        navigate('/solo-adventure-dashboard');
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        trackEvent(isPlaying ? 'onboarding_paused' : 'onboarding_resumed');
    };

    const CurrentStepComponent = steps[currentStep]?.component || (() => null);

    return (
        <div className="flex items-center justify-center">

            {/* Main Content */}
            <div className="relative w-full max-w-4xl mx-auto bg-fire-300/8 backdrop-blur-sm rounded-2xl px-12 py-8">

                {/* Top Controls */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        {/* Progress Bar */}
                        <div className="flex items-center gap-2">
                            <span className="text-fire-300 text-sm font-medium">
                                {currentStep + 1} / {steps.length}
                            </span>
                            <div className="w-32 bg-warm-800 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-fire-500 to-golden-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Play/Pause */}
                        <motion.button
                            onClick={togglePlayPause}
                            className="p-2 bg-fire-500/20 hover:bg-fire-500/30 text-fire-400 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </motion.button>

                        {/* Sound Toggle */}
                        <motion.button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-2 bg-fire-500/20 hover:bg-fire-500/30 text-fire-400 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        </motion.button>
                    </div>

                    {/* Next Step Timer */}
                    <motion.div 
                        className="flex items-center gap-2 px-4 py-2 text-white/60 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="min-w-[1.5rem] text-center font-mono">
                            {timeRemaining}s
                        </span>
                        <motion.button
                            onClick={handleSkip}
                            className="flex items-center gap-1 align-middle hover:text-white/80 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Skip to next step"
                        >
                            <Skip size={18} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Step Content */}
                <div className="min-h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full"
                        >
                            <CurrentStepComponent
                                userName={userName}
                                onComplete={handleComplete}
                                xpValue={xpValue}
                                setXpValue={setXpValue}
                                level={level}
                                setLevel={setLevel}
                                streakCount={streakCount}
                                setStreakCount={setStreakCount}
                                soundEnabled={soundEnabled}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Step 1: Entrance
const EntranceStep = ({ userName }) => {
    return (
        <div className="text-center">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "backOut" }}
                className="mb-6"
            >
                <img
                    src="/logo.png"
                    alt="Streakly Mascot"
                    className="w-32 h-32 mx-auto drop-shadow-2xl"
                />

            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative"
            >
                <motion.div
                    className="bg-fire-500/20 border border-fire-500/40 rounded-2xl px-8 py-6 inline-block relative backdrop-blur-sm"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                    <h1 className="text-4xl font-black text-fire-gradient mb-2">
                        Welcome, {userName}!
                    </h1>
                    <p className="text-xl text-golden-300 font-semibold">
                        Your productivity adventure begins now! 🔥
                    </p>

                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-fire-500/20 border-l border-b border-fire-500/40 rotate-45 backdrop-blur-sm" />
                </motion.div>
            </motion.div>
        </div>
    );
};

// Step 2: Realms/Map
const RealmsStep = React.memo(() => {
    const realms = React.useMemo(() => [
        {
            id: 'daily',
            name: 'Daily Quests',
            icon: Target,
            gradient: 'bg-gradient-to-br from-fire-500 to-red-600',
            description: 'Complete daily tasks and build habits'
        },
        {
            id: 'learning',
            name: 'Learning',
            icon: BookOpen,
            gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
            description: 'Expand your knowledge and skills'
        },
        {
            id: 'health',
            name: 'Health',
            icon: Heart,
            gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
            description: 'Take care of your body and mind'
        }
    ], []);

    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Map className="text-golden-400" size={32} />
                    <h2 className="text-3xl font-black text-golden-gradient">
                        Explore the Realms
                    </h2>
                </div>
                <p className="text-white/80 text-lg">
                    Choose your path and conquer different areas of life
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {realms.map((realm, index) => (
                    <motion.div
                        key={realm.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.4,
                            delay: index * 0.1,
                            ease: "easeOut"
                        }}
                        className="relative"
                    >
                        <motion.div
                            className={`${realm.gradient} p-6 rounded-2xl border border-white/20 shadow-lg`}
                            whileHover={{ 
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <realm.icon 
                                size={48} 
                                className="text-white mx-auto mb-4" 
                            />
                            <h3 className="text-xl font-bold text-white mb-2">
                                {realm.name}
                            </h3>
                            <p className="text-white/90 text-sm">
                                {realm.description}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
});

// Step 3: XP & Leveling
const XPLevelingStep = ({ xpValue, setXpValue, level, setLevel }) => {
    useEffect(() => {
        setXpValue(75);
        // Animate XP filling
        const timer = setTimeout(() => {
            setXpValue(100);
            setTimeout(() => {
                setLevel(2);
            }, 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, [setXpValue, setLevel]);

    return (
        <div className="text-center max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="text-golden-400" size={32} />
                    <h2 className="text-3xl font-black text-golden-gradient">
                        Gain Experience & Level Up
                    </h2>
                </div>
                <p className="text-white/80 text-lg">
                    Complete quests to earn XP and unlock new features
                </p>
            </motion.div>

            {/* Level Display */}
            <motion.div
                className="bg-black/40 border border-fire-500/30 rounded-2xl p-8 mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-center gap-4 mb-6">
                    <motion.div
                        className="level-badge text-golden-200 text-2xl px-6 py-3"
                        animate={level === 2 ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5, delay: 2 }}
                    >
                        Level {level}
                    </motion.div>

                    <AnimatePresence>
                        {level === 2 && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="text-golden-400"
                            >
                                <Crown size={32} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* XP Bar */}
                <div className="relative">
                    <div className="w-full bg-warm-800/50 rounded-full h-3 overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                            initial={{ width: "15%" }}
                            animate={{ width: `${xpValue}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between text-sm text-white/60">
                        <span>{xpValue}/100 XP</span>
                        <span>Next: Level {level + 1}</span>
                    </div>
                </div>
            </motion.div>

            {/* Quest Example */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="bg-fire-500/10 border border-fire-500/30 rounded-xl p-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-fire-500 rounded-full flex items-center justify-center">
                        <Target size={16} className="text-white" />
                    </div>
                    <div>
                        <div className="font-semibold text-white">
                            Complete Daily Standup
                        </div>
                        <div className="text-sm text-golden-400">
                            +25 XP • Daily Quest
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Step 4: Streaks
const StreaksStep = ({ streakCount, setStreakCount }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            let count = 0;
            const interval = setInterval(() => {
                count++;
                setStreakCount(count);
                if (count >= 7) clearInterval(interval);
            }, 200);
        }, 500);

        return () => clearTimeout(timer);
    }, [setStreakCount]);

    return (
        <div className="text-center max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Flame className="text-fire-400" size={32} />
                    <h2 className="text-3xl font-black text-fire-gradient">
                        Build Epic Streaks
                    </h2>
                </div>
                <p className="text-white/80 text-lg">
                    Consistency is key! Keep your streaks alive for bonus rewards
                </p>
            </motion.div>

            {/* Streak Counter */}
            <motion.div
                className="mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="streak-counter text-3xl md:text-4xl lg:text-6xl px-4 py-4 md:px-8 md:py-6 lg:px-12 lg:py-8 mx-auto inline-flex items-center flex-wrap justify-center gap-2 md:gap-4 text-center"
                    animate={streakCount > 0 ? {
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 5px 15px rgba(255, 69, 0, 0.2)",
                            "0 10px 30px rgba(255, 69, 0, 0.4)",
                            "0 5px 15px rgba(255, 69, 0, 0.2)"
                        ]
                    } : {}}
                    transition={{ 
                        duration: 0.5, 
                        repeat: streakCount > 0 ? Infinity : 0, 
                        repeatDelay: 1,
                        ease: "easeInOut"
                    }}
                >
                    <Flame className="flex-shrink-0" size={32} />
                    <span className="whitespace-nowrap">
                        {streakCount} Day{streakCount !== 1 ? 's' : ''} Streak
                    </span>
                </motion.div>
            </motion.div>

            {/* Streak Benefits */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { days: "3 Days", bonus: "+10% XP", icon: Star },
                    { days: "7 Days", bonus: "+25% XP", icon: Trophy },
                    { days: "30 Days", bonus: "Rare Items", icon: Gift },
                    { days: "100 Days", bonus: "Legend Status", icon: Crown }
                ].map((benefit, index) => (
                    <motion.div
                        key={benefit.days}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className={`bg-black/40 border rounded-xl p-4 flex flex-col items-center text-center ${streakCount >= parseInt(benefit.days)
                                ? 'border-golden-500/50 bg-golden-500/10'
                                : 'border-fire-500/30'
                            }`}
                    >
                        <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center mb-2">
                            <benefit.icon
                                size={24}
                                className={streakCount >= parseInt(benefit.days) ? 'text-golden-400' : 'text-fire-400'}
                            />
                        </div>
                        <div className="text-sm font-semibold text-white mt-1">
                            {benefit.days}
                        </div>
                        <div className="text-xs text-white/60">
                            {benefit.bonus}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Step 5: Rewards
const RewardsStep = () => {
    const rewards = [
        { id: 1, name: "Fire Crown", type: "Avatar", rarity: "Epic", icon: "👑" },
        { id: 2, name: "Lightning BG", type: "Background", rarity: "Rare", icon: "⚡" },
        { id: 3, name: "Golden Frame", type: "Border", rarity: "Legendary", icon: "🖼️" }
    ];

    return (
        <div className="text-center max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Gift className="text-golden-400" size={32} />
                    <h2 className="text-3xl font-black text-golden-gradient">
                        Unlock Rewards
                    </h2>
                </div>
                <p className="text-white/80 text-lg">
                    Customize your avatar and show off your achievements
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {rewards.map((reward, index) => (
                    <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, y: 50, rotateY: -90 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.6 }}
                        className="bg-black/40 border border-golden-500/30 rounded-xl p-4 relative overflow-hidden group"
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <div className="text-4xl mb-2">{reward.icon}</div>
                        <div className="font-semibold text-white text-sm">{reward.name}</div>
                        <div className="text-xs text-golden-400">{reward.type}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${reward.rarity === 'Legendary' ? 'bg-golden-500/20 text-golden-300' :
                                reward.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
                                    'bg-blue-500/20 text-blue-300'
                            }`}>
                            {reward.rarity}
                        </div>

                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-golden-400/20 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.3 + 1,
                                repeatDelay: 2
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-fire-300 text-sm"
            >
                💡 Earn coins by completing quests to buy items in the shop!
            </motion.div>
        </div>
    );
};

// Step 6: CTA
const CTAStep = ({ onComplete }) => {
    return (
        <div className="text-center max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <h2 className="text-4xl font-black text-fire-gradient mb-4">
                        Ready to Begin?
                    </h2>
                </motion.div>
                <p className="text-white/80 text-lg">
                    Your productivity adventure awaits! Choose your path:
                </p>
            </motion.div>

            <div className="space-y-4">
                {/* Primary CTA */}
                <motion.button
                    onClick={() => onComplete('start_solo')}
                    className="btn-primary w-full py-6 text-xl font-bold relative overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 60px rgba(255, 69, 0, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        <Zap size={24} />
                        Start Your Adventure
                        <ArrowRight size={24} />
                    </span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-golden-500 to-fire-500"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Pulsing glow */}
                    <motion.div
                        className="absolute inset-0 bg-fire-500 rounded-full opacity-20"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                    onClick={() => onComplete('create_clan')}
                    className="btn-outline w-full py-4 text-lg flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Users size={20} />
                    Create a Clan Instead
                </motion.button>

                {/* Skip option */}
                <motion.button
                    onClick={() => onComplete('skip_to_dashboard')}
                    className="text-white/60 hover:text-white/80 text-sm transition-colors underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Skip to Dashboard
                </motion.button>
            </div>
        </div>
    );
};

export default OnboardingPage;