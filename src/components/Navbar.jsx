import { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    const BurgerMenu = ({ title, items, menuKey }) => {
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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                    style={{ color: 'var(--text-primary)' }}
                >
                    <Menu className="w-5 h-5 group-hover:text-srtb-green transition-colors" />
                    <span className="font-semibold text-sm hidden md:inline group-hover:text-srtb-green transition-colors">{title}</span>
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-srtb-green' : 'group-hover:text-srtb-green'}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute top-full left-0 mt-3 w-72 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.92) 100%)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                            }}
                        >
                            {/* Header with gradient */}
                            <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'linear-gradient(to right, rgba(0,135,81,0.2), transparent)' }}>
                                <p className="text-xs font-bold uppercase tracking-wider text-srtb-green">
                                    {title}
                                </p>
                            </div>

                            {/* Items */}
                            <div className="max-h-[420px] overflow-y-auto py-2">
                                {items.map((item, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ x: 6, backgroundColor: 'rgba(0,135,81,0.15)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-5 py-3 text-left flex items-center gap-3 transition-all duration-200 group/item"
                                        style={{
                                            color: 'var(--text-primary)',
                                        }}
                                        onClick={() => setOpenMenu(null)}
                                    >
                                        {/* Icon for categories */}
                                        {menuKey === 'categories' && (
                                            <span className="text-lg group-hover/item:scale-110 transition-transform">
                                                {getIcon(item)}
                                            </span>
                                        )}

                                        <span className="text-sm font-medium group-hover/item:text-srtb-green transition-colors flex-1">
                                            {item}
                                        </span>

                                        {/* Live badge for direct menu */}
                                        {menuKey === 'direct' && index === 0 && (
                                            <span className="flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded text-white text-xs font-bold">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                                LIVE
                                            </span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Footer subtle gradient */}
                            <div className="h-1 bg-gradient-to-r from-transparent via-srtb-green/30 to-transparent"></div>
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
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer">
                    <span className="text-srtb-green">B</span>
                    <span style={{ color: 'var(--text-primary)' }}>PLAY</span>
                </h1>

                {/* Burger Menus */}
                <div className="flex items-center gap-2">
                    <BurgerMenu title="Catégories" items={categories} menuKey="categories" />
                    <BurgerMenu title="Chaînes" items={channels} menuKey="channels" />
                    <BurgerMenu title="Direct" items={directOptions} menuKey="direct" />
                </div>
            </div>

            {/* Right side: Search only */}
            <div className="flex items-center gap-4 md:gap-6" style={{ color: 'var(--text-primary)' }}>
                <Search className="w-5 h-5 cursor-pointer hover:text-srtb-green transition-colors" />
            </div>
        </motion.header>
    );
}
