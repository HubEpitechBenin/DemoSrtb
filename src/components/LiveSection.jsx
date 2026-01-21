import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Clock } from 'lucide-react';
import liveShows from '../data/liveData';

export default function LiveSection() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-6 px-4 md:px-8 relative">
            {/* Header */}
            <div className="mb-4 md:mb-6 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-red-600 font-bold text-xs uppercase tracking-wider">En Direct</span>
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black">À Regarder Maintenant</h2>
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

            {/* Cards Container - Mobile Optimized */}
            <div
                ref={scrollRef}
                className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {liveShows.map((show, index) => (
                    <motion.div
                        key={show.id}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="flex-shrink-0 w-[280px] md:w-[320px] group cursor-pointer"
                    >
                        <div className="relative overflow-hidden rounded-xl">
                            {/* Thumbnail */}
                            <div className="relative aspect-video">
                                <img
                                    src={show.image}
                                    alt={show.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                                {/* Live Badge */}
                                {show.isLive && (
                                    <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                                        <div className="flex items-center gap-1 md:gap-1.5 bg-red-600 px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                                            <span className="text-white text-xs font-bold uppercase tracking-wide">Direct</span>
                                        </div>
                                    </div>
                                )}

                                {/* Time Badge */}
                                {show.time && (
                                    <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-white" />
                                            <span className="text-white text-xs font-bold">{show.time}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="w-14 md:w-16 h-14 md:h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                                        <Play className="w-6 md:w-7 h-6 md:h-7 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* Bottom Info Overlay */}
                                <div className="absolute bottom-0 inset-x-0 p-3 md:p-4 z-10">
                                    {/* Channel */}
                                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                                            {show.channel}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-white font-bold text-base md:text-lg mb-1 line-clamp-1">
                                        {show.title}
                                    </h3>

                                    {/* Description - hidden on mobile */}
                                    <p className="hidden md:block text-gray-300 text-sm line-clamp-2">
                                        {show.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
