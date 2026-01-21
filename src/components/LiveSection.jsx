import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Clock, Radio } from 'lucide-react';
import SectionTitle from './SectionTitle';
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
        <div className="py-6 px-4 md:px-8 relative overflow-hidden">
            {/* Background Ambient Glow removed - Global glow takes over */}

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <SectionTitle
                    icon={Radio}
                    badge="Live Stream"
                    title="À REGARDER"
                    highlight="MAINTENANT"
                    color="srtb-red"
                />

                <div className="flex gap-3">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                    >
                        <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                    >
                        <ChevronRight className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
                style={{ scrollbarWidth: 'none' }}
            >
                {liveShows.map((show, index) => (
                    <motion.div
                        key={show.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="flex-shrink-0 w-[300px] md:w-[380px] group relative"
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-zinc-900">
                            {/* Image with Parallax-like scale */}
                            <motion.img
                                src={show.image}
                                alt={show.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            />

                            {/* Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            {/* Floating Glassmorphic Badges */}
                            <div className="absolute top-4 left-4 z-20">
                                <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">En Direct</span>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 z-20">
                                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-red-500" />
                                        <span className="text-white text-[10px] font-bold uppercase tracking-tight">{show.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Play Hover State */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <Play className="w-7 h-7 fill-current ml-1" />
                                </div>
                            </div>

                            {/* Info Box - Solid Bar Style for "Pro" look */}
                            <div className="absolute bottom-0 inset-x-0 p-6 z-20">
                                <div className="flex flex-col gap-1">
                                    <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                                        {show.channel}
                                    </span>
                                    <h3 className="text-white font-black text-xl md:text-2xl tracking-tighter line-clamp-1 drop-shadow-md">
                                        {show.title}
                                    </h3>
                                    <p className="text-zinc-400 text-xs line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-y-2 md:group-hover:translate-y-0">
                                        {show.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Glow behind each card on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
