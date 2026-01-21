import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Plus, Info, Clock, Eye, Calendar } from 'lucide-react';

export default function ContentRow({ title, items, variant = 'default' }) {
    const rowRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [brokenIndices, setBrokenIndices] = useState(new Set());

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = direction === 'left' ? -800 : 800;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Helper to format large numbers
    const formatViews = (views) => {
        if (!views) return '1.2K';
        if (views > 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views > 1000) return `${(views / 1000).toFixed(1)}K`;
        return views;
    };

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Récemment';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
    };

    const getCardClass = () => {
        switch (variant) {
            case 'large':
                return 'w-[280px] aspect-[2/3]';
            case 'wide':
                return 'w-[400px] aspect-video';
            case 'square':
                return 'w-[240px] aspect-square';
            default:
                return 'w-[320px] aspect-video';
        }
    };

    return (
        <div className="py-6 relative group/row">
            {/* Title - Only show if provided */}
            {title && (
                <div className="flex items-center justify-between mb-4 px-4">
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                        <span className="h-8 w-1 bg-srtb-green rounded-full" />
                        {title}
                    </h2>
                    <button className="text-sm flex items-center gap-1 transition-colors hover:text-srtb-green" style={{ color: 'var(--text-secondary)' }}>
                        Voir tout
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Scroll Controls */}
            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-full bg-gradient-to-r from-black/80 to-transparent flex items-center justify-start opacity-0 group-hover/row:opacity-100 transition-opacity pl-2"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-full bg-gradient-to-l from-black/80 to-transparent flex items-center justify-end opacity-0 group-hover/row:opacity-100 transition-opacity pr-2"
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </button>

                {/* Content Row */}
                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-12 pt-4" // Added pt-4 for hover overflow safely
                    style={{ scrollbarWidth: 'none' }}
                >
                    {items.map((item, index) => {
                        // If this item is marked as broken, do not render it.
                        if (brokenIndices.has(index)) return null;

                        // Safely extract data whether it's raw API or custom object
                        const title = item.snippet?.title || item.title;
                        const channel = item.snippet?.channelTitle || item.channel || "SRTB";
                        const date = item.snippet?.publishedAt || item.date;
                        const videoId = item.id?.videoId || item.videoId;
                        const category = item.category || '';

                        // Smart Image Logic: Support both YouTube thumbnails and local paths
                        let image;
                        if (item.image) {
                            // Use provided image path (from contentData)
                            image = item.image;
                        } else if (videoId) {
                            // Fallback to YouTube thumbnail
                            image = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                        } else {
                            // Default placeholder
                            image = "https://placehold.co/640x360?text=SRTB+Play";
                        }

                        return (
                            <motion.div
                                key={index}
                                className={`${getCardClass()} flex-shrink-0 relative group cursor-pointer`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={{ scale: 1.05, zIndex: 50 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Card Image */}
                                <div className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-900 shadow-md">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onLoad={(e) => {
                                            // Only hide YouTube thumbnails with 120px placeholder width
                                            // Local images won't trigger this
                                            if (videoId && e.target.naturalWidth === 120) {
                                                setBrokenIndices(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.add(index);
                                                    return newSet;
                                                });
                                            }
                                        }}
                                        onError={(e) => {
                                            // Only hide YouTube videos with broken images
                                            // Keep local images visible even if they fail
                                            if (videoId) {
                                                setBrokenIndices(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.add(index);
                                                    return newSet;
                                                });
                                            } else {
                                                // Show placeholder for local broken images
                                                console.log('Image failed to load:', item.image);
                                                e.target.src = 'https://placehold.co/640x360?text=Image+Non+Disponible';
                                            }
                                        }}
                                    />

                                    {/* Subtle Text Overlay - Always Visible */}
                                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10">
                                        <h3 className="text-white font-semibold text-xs mb-0.5 line-clamp-2 leading-tight">
                                            {title}
                                        </h3>
                                        <p className="text-gray-300 text-xs">
                                            {channel || category}
                                        </p>
                                    </div>

                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
                                        <div className="w-12 h-12 rounded-full bg-srtb-yellow/90 flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                                            <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                                        </div>
                                    </div>

                                    {/* Hover Details Card (Absolute to appear over neighbors) */}
                                    <AnimatePresence>
                                        {hoveredIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute inset-0 bg-zinc-900/95 backdrop-blur-md p-4 flex flex-col justify-end rounded-lg border border-white/10 shadow-2xl z-50 overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-0" />

                                                <div className="relative z-10">
                                                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-2 leading-tight">
                                                        {title}
                                                    </h3>
                                                    <p className="text-gray-400 text-xs mb-3 line-clamp-1">{channel}</p>

                                                    <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-300">
                                                        <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded"><Eye className="w-3 h-3" /> {formatViews(Math.floor(Math.random() * 50000))}</span>
                                                        <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded"><Calendar className="w-3 h-3" /> {formatDate(date)}</span>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <a
                                                            href={`https://www.youtube.com/watch?v=${item.id?.videoId || item.videoId}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-1 bg-srtb-green text-white py-1.5 px-2 rounded hover:bg-green-700 transition-colors text-xs font-bold"
                                                        >
                                                            <Play className="w-3 h-3 fill-current" /> Regarder
                                                        </a>
                                                        <button className="w-8 h-8 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 transition-colors">
                                                            <Plus className="w-4 h-4 text-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Top Badge (Only usually visible if not hovered, but we can keep it) */}
                                    {item.badge && (
                                        <div className="absolute top-2 left-2 bg-srtb-red text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm z-20">
                                            {item.badge}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
