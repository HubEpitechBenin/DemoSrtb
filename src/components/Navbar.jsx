import { useState, useEffect } from 'react';
import { Search, ChevronDown, Grid, Layers, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bplayLogo from '../assets/bplay_logo.png';

// Categories from the reference image
const categories = [
    'POLITIQUE', 'SOCIÉTÉ', 'CULTURE', 'SPORT',
    'ÉCONOMIE', 'SANTÉ', 'ENVIRONNEMENT', 'INTERNATIONAL', 'E-SERVICES'
];

// Channels from the reference image
const channels = [
    'Bénin TV', 'Bénin Vibes TV', 'Bénin Info',
    'Bénin TV Alafia', 'Bénin TV Sport', 'Bénin TV Junior',
    'Émissions Phares', 'Radio Bénin', 'Riff FM', 'Radio Bénin Alafia'
];

// Direct/Live options
const directOptions = [
    'Bénin TV Direct', 'Bénin Sport Direct', 'Bénin Info Direct',
    'Radio Bénin Direct', 'Alafia Direct'
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // 'categories', 'channels', 'direct', or null

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (openMenu && !e.target.closest('.burger-menu')) {
                setOpenMenu(null);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [openMenu]);

    const BurgerMenu = ({ title, items, menuKey, icon: MenuIcon }) => {
        const isOpen = openMenu === menuKey;

        // Get icon for category items
        const getIcon = (item) => {
            const iconMap = {
                'POLITIQUE': '🏛️',
                'SOCIÉTÉ': '👥',
                'CULTURE': '🎭',
                'SPORT': '⚽',
                'ÉCONOMIE': '💼',
                'SANTÉ': '🏥',
                'ENVIRONNEMENT': '🌿',
                'INTERNATIONAL': '🌍',
                'E-SERVICES': '💻',
            };
            return iconMap[item] || '📺';
        };

        return (
            <div className="relative burger-menu">
                <button
                    onClick={() => setOpenMenu(isOpen ? null : menuKey)}
                    className="flex items-center gap-1.5 px-2 md:px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                    style={{ color: 'var(--text-primary)' }}
                >
                    <MenuIcon className="w-5 h-5 md:w-5 md:h-5 group-hover:text-srtb-green transition-colors" />
                    <span className="font-bold text-xs md:text-sm hidden sm:inline group-hover:text-srtb-green transition-colors uppercase tracking-wider">{title}</span>
                    <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-srtb-green' : 'group-hover:text-srtb-green'}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute top-full left-0 mt-3 w-[85vw] sm:w-72 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl"
                            style={{
                                background: 'rgba(9, 9, 11, 0.98)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                            }}
                        >
                            {/* Header */}
                            <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-srtb-green/10 to-transparent">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-srtb-green">
                                    {title}
                                </p>
                            </div>

                            {/* Items */}
                            <div className="max-h-[60vh] md:max-h-[420px] overflow-y-auto py-2">
                                {items.map((item, index) => (
                                    <motion.button
                                        key={index}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-5 py-4 md:py-3 text-left flex items-center gap-3 transition-all duration-200 hover:bg-white/5 group/item"
                                        style={{ color: 'var(--text-primary)' }}
                                        onClick={() => setOpenMenu(null)}
                                    >
                                        {menuKey === 'categories' && (
                                            <span className="text-lg opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all">
                                                {getIcon(item)}
                                            </span>
                                        )}

                                        <span className="text-sm font-bold group-hover/item:text-srtb-green transition-colors flex-1 uppercase tracking-tight">
                                            {item}
                                        </span>

                                        {menuKey === 'direct' && index === 0 && (
                                            <div className="flex items-center gap-1.5 bg-red-600/20 text-red-500 px-2 py-1 rounded ring-1 ring-red-600/30 text-[9px] font-black uppercase">
                                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                                                LIVE
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-[60] py-4 px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled
                ? 'bg-bg-primary/90 backdrop-blur-xl shadow-lg'
                : 'bg-transparent'
                }`}
            style={{
                backgroundColor: isScrolled ? 'var(--bg-primary)' : 'transparent',
                borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none'
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
        >
            {/* Left side: Logo + Burger Menus */}
            <div className="flex items-center gap-4 md:gap-6">
                {/* BPLAY Logo */}
                {/* BPLAY Logo */}
                <img
                    src={bplayLogo}
                    alt="BPLAY"
                    className="h-8 md:h-10 cursor-pointer object-contain"
                />

                {/* Burger Menus */}
                <div className="flex items-center gap-1 md:gap-2">
                    <BurgerMenu title="Catégories" items={categories} menuKey="categories" icon={Grid} />
                    <BurgerMenu title="Chaînes" items={channels} menuKey="channels" icon={Layers} />
                    <BurgerMenu title="Direct" items={directOptions} menuKey="direct" icon={Radio} />
                </div>
            </div>

            {/* Right side: Search only */}
            <div className="flex items-center gap-4 md:gap-6" style={{ color: 'var(--text-primary)' }}>
                <Search className="w-5 h-5 cursor-pointer hover:text-srtb-green transition-colors" />
            </div>
        </motion.header>
    );
}
