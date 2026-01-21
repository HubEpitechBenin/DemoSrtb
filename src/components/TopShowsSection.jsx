import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import topShows from '../data/topShowsData';

export default function TopShowsSection() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-6 px-4 md:px-8">
            {/* Title */}
            <div className="mb-4 md:mb-6 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <Star className="w-5 h-5 md:w-6 md:h-6 text-srtb-yellow fill-srtb-yellow" />
                        <h2 className="text-2xl md:text-3xl font-black">Les Meilleures Émissions</h2>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm">Les contenus les plus populaires de la semaine</p>
                </div>

                {/* Scroll Buttons - Hidden on mobile */}
                <div className="hidden lg:flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Shows - Grid on Desktop, Horizontal Scroll on Mobile */}
            <div className="relative">
                {/* Mobile: Horizontal Scroll */}
                <div
                    ref={scrollRef}
                    className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {topShows.map((show, index) => (
                        <motion.div
                            key={show.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="group relative cursor-pointer flex-shrink-0 w-[160px]"
                        >
                            {/* Card */}
                            <div className="relative rounded-xl overflow-hidden aspect-[2/3] shadow-lg">
                                {/* Image */}
                                <img
                                    src={show.image}
                                    alt={show.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>

                                {/* Rank Number */}
                                <div className="absolute top-2 left-2 z-20">
                                    <div
                                        className="text-5xl font-black leading-none"
                                        style={{
                                            WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                                            color: 'transparent',
                                            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                                        }}
                                    >
                                        {show.rank}
                                    </div>
                                </div>

                                {/* Badge */}
                                {show.badge && (
                                    <div className="absolute top-2 right-2 z-20 bg-srtb-green px-2 py-0.5 rounded text-white text-xs font-bold uppercase">
                                        {show.badge}
                                    </div>
                                )}

                                {/* Info - Bottom */}
                                <div className="absolute bottom-0 inset-x-0 p-2 z-20">
                                    <h3 className="text-white font-bold text-xs mb-0.5 line-clamp-2">
                                        {show.title}
                                    </h3>
                                    <span className="text-gray-300 text-xs">{show.channel}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Desktop/Tablet: Grid */}
                <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {topShows.map((show, index) => (
                        <motion.div
                            key={show.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Card */}
                            <div className="relative rounded-xl overflow-hidden aspect-[2/3] shadow-lg">
                                {/* Image */}
                                <img
                                    src={show.image}
                                    alt={show.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                {/* Rank Number - Large and Prominent */}
                                <div className="absolute top-2 md:top-3 left-2 md:left-3 z-20">
                                    <div
                                        className="text-5xl md:text-7xl font-black leading-none"
                                        style={{
                                            WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                                            color: 'transparent',
                                            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                                        }}
                                    >
                                        {show.rank}
                                    </div>
                                </div>

                                {/* Badge */}
                                {show.badge && (
                                    <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 bg-srtb-green px-2 py-0.5 md:py-1 rounded text-white text-xs font-bold uppercase">
                                        {show.badge}
                                    </div>
                                )}

                                {/* Play Button on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                                        <Play className="w-5 md:w-6 h-5 md:h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* Info - Bottom */}
                                <div className="absolute bottom-0 inset-x-0 p-2 md:p-3 z-20">
                                    <h3 className="text-white font-bold text-xs md:text-sm mb-0.5 md:mb-1 line-clamp-2">
                                        {show.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-300 text-xs">{show.channel}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
