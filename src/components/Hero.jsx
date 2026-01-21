import { useState, useEffect } from 'react';
import { Play, ChevronRight, ChevronLeft, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_SLIDES = [
    {
        id: 1,
        title: "JOURNAL",
        highlight: "DE 20H",
        image: "/assets/content/news_studio_broadcast_1768941325755.png",
        color: "#008751",
    },
    {
        id: 2,
        title: "ÉCUREUILS",
        highlight: "BÉNIN",
        image: "/assets/content/sport_football_match_1768941252623.png",
        color: "#E2CC00",
    },
    {
        id: 3,
        title: "AFRIQUE",
        highlight: "FÊTE",
        image: "/assets/content/culture_african_music_1768941411484.png",
        color: "#DC2626",
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const SLIDE_DURATION = 8000;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
            setProgress(0);
        }, SLIDE_DURATION);

        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + (100 / (SLIDE_DURATION / 100)), 100));
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(progressInterval);
        };
    }, [currentIndex]);

    const currentSlide = HERO_SLIDES[currentIndex];

    return (
        <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black flex items-center">

            {/* BACKGROUND LAYER */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                </motion.div>
            </AnimatePresence>

            {/* MINIMALIST TYPOGRAPHY LAYER */}
            <div className="relative z-20 w-full px-6 md:px-16 lg:px-24 flex flex-col justify-center h-full max-w-[1920px] mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-start"
                    >
                        {/* THE ARTISTIC TYPOGRAPHY - THE STAR OF THE SHOW */}
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col select-none cursor-default"
                        >
                            <span
                                className="text-8xl sm:text-[10rem] md:text-[13rem] lg:text-[15rem] font-black leading-[0.8] tracking-tighter italic"
                                style={{
                                    color: 'transparent',
                                    WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                                    marginRight: '-0.02em'
                                }}
                            >
                                {currentSlide.title}
                            </span>
                            <span
                                className="text-8xl sm:text-[10rem] md:text-[13rem] lg:text-[15rem] font-black leading-[0.7] tracking-tighter -mt-4 lg:-mt-12"
                                style={{ color: currentSlide.color }}
                            >
                                {currentSlide.highlight}
                            </span>
                        </motion.h1>

                        {/* ESSENTIAL CTA ONLY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-12 md:mt-16"
                        >
                            <button className="group relative bg-white text-black px-12 py-5 rounded-none font-black text-sm uppercase tracking-widest flex items-center gap-4 transition-all hover:bg-srtb-yellow hover:scale-105 active:scale-95 shadow-2xl">
                                <Play className="w-5 h-5 fill-current" />
                                <span>REGARDER</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* MINIMALIST NAVIGATION Dashboard (Simplified) */}
            <div className="absolute bottom-12 right-6 md:right-16 lg:right-24 z-30 flex flex-col items-end gap-8">

                {/* Visual Indicators */}
                <div className="flex gap-6">
                    {HERO_SLIDES.map((slide, idx) => (
                        <button
                            key={slide.id}
                            onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                            className="relative flex flex-col gap-2 group items-end font-black"
                        >
                            <span className={`text-[10px] transition-colors ${idx === currentIndex ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                0{slide.id}
                            </span>
                            <div className="w-16 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                                {idx === currentIndex && (
                                    <motion.div
                                        className="h-full bg-white"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Micro Arrows */}
                <div className="flex gap-2">
                    <button
                        onClick={() => { setCurrentIndex(p => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); setProgress(0); }}
                        className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors border border-white/5 bg-black/20 backdrop-blur-md"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { setCurrentIndex(p => (p + 1) % HERO_SLIDES.length); setProgress(0); }}
                        className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors border border-white/5 bg-black/20 backdrop-blur-md"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ARTISTIC NOISE OVERLAY */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
