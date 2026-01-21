import { Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center">

            {/* Dynamic Background - Video on Desktop, Image on Mobile */}
            <div className="absolute inset-0 z-0">
                {/* Desktop: YouTube Video */}
                <div className="hidden md:block absolute inset-0 select-none pointer-events-none">
                    <iframe
                        className="w-full h-full object-cover scale-[1.35]"
                        src="https://www.youtube.com/embed/mRxAsmfM-EM?autoplay=1&mute=1&controls=0&loop=1&playlist=mRxAsmfM-EM&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                        title="Hero Video"
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                        style={{ pointerEvents: 'none' }}
                    />
                </div>

                {/* Mobile: Static Image */}
                <div className="block md:hidden absolute inset-0">
                    <img
                        src="/hero-mobile.png"
                        alt="BPLAY News Studio"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Enhanced Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col justify-center h-full max-w-7xl">

                {/* Modern Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-6 md:mb-8"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-srtb-green rounded-md shadow-lg shadow-srtb-green/50">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        <span className="text-white text-xs md:text-sm font-black tracking-wider uppercase">Info</span>
                    </div>
                    <span className="text-gray-300 text-sm md:text-base font-medium border-l border-gray-500 pl-3 hidden sm:inline">
                        Édition Spéciale
                    </span>
                </motion.div>

                {/* Massive Impressive Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mb-4 md:mb-6 tracking-tight">
                        JOURNAL
                        <br />
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            DE 20H
                        </span>
                    </h1>
                </motion.div>

                {/* Stunning Subtitle with Gradient */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <span className="bg-gradient-to-r from-srtb-yellow via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
                        L'Actualité en Direct
                    </span>
                </motion.h2>

                {/* Description with Border Accent */}
                <motion.div
                    className="mb-8 md:mb-10 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="border-l-4 border-srtb-green pl-6 py-2 bg-black/30 backdrop-blur-sm rounded-r-lg">
                        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                            Retrouvez toutes les informations nationales et internationales.
                            Le grand rendez-vous de l'information sur la SRTB.
                        </p>
                    </div>
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {/* Primary Button */}
                    <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black text-base md:text-lg rounded-xl overflow-hidden flex items-center justify-center gap-3 hover:gap-5 transition-all shadow-2xl hover:shadow-white/30 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-srtb-green to-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Play className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:text-white transition-colors" />
                        <span className="relative z-10 group-hover:text-white transition-colors">REGARDER</span>
                    </button>

                    {/* Secondary Button */}
                    <button className="px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-bold text-base md:text-lg rounded-xl hover:bg-white/20 hover:border-white/50 transition-all hover:scale-105 shadow-xl">
                        PLUS D'INFOS
                    </button>
                </motion.div>

                {/* Stats Section - Hidden on very small screens */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-12 md:mt-16 flex flex-wrap gap-8 md:gap-12 hidden sm:flex"
                >
                    {[
                        { value: '20H', label: 'En Direct' },
                        { value: '+1M', label: 'Téléspectateurs' },
                        { value: '#1', label: 'Au Bénin' },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-srtb-green to-srtb-yellow bg-clip-text text-transparent">
                                {stat.value}
                            </span>
                            <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mt-1">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator - Hidden on mobile */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
}
