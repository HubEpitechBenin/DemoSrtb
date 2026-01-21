import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Tv, Radio, MonitorPlay, Activity, Heart,
    Globe, Film, Sparkles, LayoutGrid, Crown
} from 'lucide-react';

const channels = [
    { name: 'Accueil', icon: LayoutGrid, color: '#008751' },
    { name: 'Bénin TV', icon: Tv, color: '#008751', description: 'Chaîne nationale' },
    { name: 'Vibes TV', icon: Radio, color: '#a855f7', description: 'Musique & Culture' },
    { name: 'Alafia', icon: Heart, color: '#fb923c', description: 'Tradition & Patrimoine' },
    { name: 'Bénin Info', icon: Globe, color: '#60a5fa', description: 'Actualités' },
    { name: 'Bénin Sport', icon: Activity, color: '#FCD116', description: 'Sports' },
    { name: 'Omoplay', icon: Sparkles, color: '#ec4899', description: 'Jeunesse' },
    { name: 'Films & Séries', icon: Film, color: '#8b5cf6', description: 'Cinéma' },
];

export default function VerticalNav({ isOpen, setIsOpen }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className="fixed left-0 top-0 h-full z-50 flex flex-col shadow-2xl"
                style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderRight: '1px solid var(--border-color)'
                }}
                initial={false}
                animate={{
                    width: isOpen ? '300px' : '80px',
                    x: 0
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                    mass: 0.8
                }}
            >
                {/* Header with Toggle */}
                <div className="h-20 flex items-center justify-center border-b px-2" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full h-full flex items-center justify-center group hover:bg-white/5 transition-colors rounded-lg"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        <h2 className={`font-black tracking-tighter transition-all duration-300 ${isOpen ? 'text-3xl' : 'text-xl'}`}>
                            <span className="text-srtb-green">B</span>PLAY
                        </h2>
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-3 overflow-y-auto">
                    <div className="space-y-1">
                        {channels.map((channel, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
                  transition-all duration-200 group relative
                  ${activeIndex === index
                                        ? 'bg-srtb-green/15'
                                        : 'hover:bg-opacity-5'
                                    }
                `}
                                style={{
                                    color: activeIndex === index ? channel.color : 'var(--text-secondary)',
                                    backgroundColor: activeIndex === index ? `${channel.color}15` : 'transparent'
                                }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Active Indicator Bar */}
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            layoutId="activeBar"
                                            className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                                            style={{ backgroundColor: channel.color }}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            exit={{ scaleY: 0 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Icon */}
                                <div className="relative flex-shrink-0">
                                    <channel.icon
                                        className="w-6 h-6 transition-transform group-hover:scale-110"
                                    />
                                    {activeIndex === index && (
                                        <motion.div
                                            className="absolute inset-0 blur-md opacity-40"
                                            style={{ backgroundColor: channel.color }}
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Label - Only shown when expanded */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="flex-1 text-left overflow-hidden"
                                        >
                                            <div
                                                className="font-semibold text-sm whitespace-nowrap"
                                                style={{
                                                    color: activeIndex === index ? channel.color : 'var(--text-primary)'
                                                }}
                                            >
                                                {channel.name}
                                            </div>
                                            {channel.description && (
                                                <div
                                                    className="text-[11px] opacity-60 whitespace-nowrap"
                                                    style={{ color: 'var(--text-tertiary)' }}
                                                >
                                                    {channel.description}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </nav>

                {/* Bottom Premium Section */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="p-4 border-t"
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <div className="bg-gradient-to-br from-srtb-green to-emerald-600 rounded-xl p-4 text-center shadow-lg">
                                <Crown className="w-6 h-6 text-white mx-auto mb-2" />
                                <p className="text-white text-xs font-bold mb-1">BPLAY Premium</p>
                                <p className="text-white/80 text-[10px] mb-3">Accès illimité à tous les contenus</p>
                                <button className="w-full bg-white text-srtb-green text-xs font-bold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                                    Découvrir
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.aside>
        </>
    );
}
