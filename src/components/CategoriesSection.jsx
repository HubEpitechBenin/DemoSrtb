import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Newspaper, Home, Gamepad2, Mic2, Heart, Sparkles, Tv, Grid } from 'lucide-react';
import SectionTitle from './SectionTitle';
import categoriesWithImages from '../data/categoriesWithImages';

const iconMap = {
    'Actualités & Infos': Newspaper,
    'Famille & LifeStyle': Home,
    'Jeunesse': Gamepad2,
    'Comédie': Heart,
    'Talk-shows': Mic2,
    'Religion': Sparkles,
};

const TiltCard = ({ category, index }) => {
    const Icon = iconMap[category.name] || Tv;
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative h-40 md:h-48 cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-srtb-green/40 transition-colors duration-500 shadow-2xl"
        >
            {/* High-Resolution feeling Sharp Background */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-opacity duration-700 opacity-40 group-hover:opacity-60"
                />
                {/* Sophisticated Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>

            {/* Glowing Brand Accent Overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at center, ${category.color}, transparent 70%)` }}
            />

            {/* Content Container (elevated for 3D depth) */}
            <div
                className="relative h-full flex flex-col justify-end p-6 z-10"
                style={{ transform: "translateZ(50px)" }}
            >
                {/* Floating Glowing Icon */}
                <motion.div
                    className="absolute top-6 left-6"
                    animate={{ y: isHovered ? -5 : 0 }}
                >
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-lg group-hover:shadow-green-500/20 transition-all duration-300"
                        style={{ backgroundColor: isHovered ? category.color + '33' : 'rgba(255,255,255,0.05)' }}
                    >
                        <Icon
                            className="w-6 h-6 transition-colors duration-300"
                            style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.6)' }}
                        />
                    </div>
                </motion.div>

                {/* Status Dot */}
                <div
                    className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ backgroundColor: category.color }}
                />

                <h3 className="text-white font-black text-base md:text-lg leading-tight uppercase tracking-widest group-hover:text-srtb-green transition-colors duration-300 drop-shadow-md">
                    {category.name}
                </h3>
            </div>

            {/* Reflection Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
};

export default function CategoriesSection() {
    return (
        <div className="py-8 px-4 md:px-8 overflow-hidden">
            <SectionTitle
                icon={Grid}
                badge="Thématiques"
                title="EXPLOREZ"
                highlight="NOS UNIVERS"
                color="srtb-green"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 perspective-1000">
                {categoriesWithImages.map((category, index) => (
                    <TiltCard key={index} category={category} index={index} />
                ))}
            </div>
        </div>
    );
}
