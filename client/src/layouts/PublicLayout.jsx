import { Outlet } from "react-router";
import PublicNavBar from "../components/PublicNavBar";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

function PublicLayout() {
    const [particlePositions, setParticlePositions] = useState([]);
    const { scrollY } = useScroll();
    
    // Parallax transforms
    const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
    const particleY = useTransform(scrollY, [0, 1000], [0, -200]);

    // Generate random particles on mount
    useEffect(() => {
        const particles = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
        }));
        setParticlePositions(particles);
    }, []);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Animated Background */}
            <motion.div 
                style={{ y: backgroundY }}
                className="fixed inset-0 -z-10"
            >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-fire-900/30 via-black to-fire-800/10" />
                
                {/* Animated Grid */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 69, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 69, 0, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        animation: 'gridMove 20s linear infinite'
                    }}
                />
                
                {/* Floating Particles */}
                <motion.div style={{ y: particleY }} className="absolute inset-0">
                    {particlePositions.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-1 h-1 bg-fire-400 rounded-full opacity-60"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            <PublicNavBar />
            <main className="flex-grow relative">
                <Outlet />
            </main>
        </div>
    )
}

export default PublicLayout;