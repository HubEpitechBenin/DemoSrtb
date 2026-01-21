import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import SectionTitle from './SectionTitle';
import topShows from '../data/topShowsData';

const RankCard = ({ show, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative cursor-pointer"
        >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[2/3] shadow-2xl bg-zinc-900 border border-white/5 transition-colors duration-500 group-hover:border-srtb-green/30">
                {/* Image */}
                <motion.img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* Rank Number - Ultra Premium Glass Style */}
                <div
                    className="absolute top-2 left-2 md:top-4 md:left-4 z-20"
                    style={{ transform: "translateZ(80px)" }}
                >
                    <div className="relative">
                        <span
                            className="text-7xl md:text-9xl font-black italic select-none"
                            style={{
                                color: 'transparent',
                                WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                                filter: isHovered ? 'drop-shadow(0 0 20px rgba(0,135,81,0.5))' : 'none',
                                transition: 'all 0.5s ease'
                            }}
                        >
                            {show.rank}
                        </span>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                                className="absolute inset-0 text-7xl md:text-9xl font-black italic text-white blur-sm select-none"
                            >
                                {show.rank}
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Top Badge */}
                {show.badge && (
                    <div className="absolute top-4 right-4 z-20">
                        <div className="bg-srtb-green px-3 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {show.badge}
                        </div>
                    </div>
                )}

                {/* Overlay Information */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 z-20 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <span className="text-srtb-green text-[10px] font-black uppercase tracking-[0.3em] mb-1 block">
                        {show.channel}
                    </span>
                    <h3 className="text-white font-black text-sm md:text-lg tracking-tight line-clamp-2 leading-tight group-hover:text-srtb-yellow transition-colors">
                        {show.title}
                    </h3>
                </div>

                {/* Play Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                </div>
            </div>

            {/* Glowing Aura */}
            <div className="absolute -inset-1 bg-gradient-to-br from-white/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </motion.div>
    );
};

export default function TopShowsSection() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-8 px-4 md:px-8 relative">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <SectionTitle
                    icon={TrendingUp}
                    badge="Tendances"
                    title="LE TOP"
                    highlight="DE LA SEMAINE"
                    color="srtb-yellow"
                />

                <div className="hidden md:flex gap-3">
                    <button onClick={() => scroll('left')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                        <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                    </button>
                    <button onClick={() => scroll('right')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                        <ChevronRight className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Desktop & Mobile Responsive Grid/Scroll */}
            <div
                ref={scrollRef}
                className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 overflow-x-auto md:overflow-visible scrollbar-hide pb-8"
                style={{ scrollbarWidth: 'none' }}
            >
                {topShows.map((show, index) => (
                    <div key={show.id} className="min-w-[220px] md:min-w-0">
                        <RankCard show={show} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
}
