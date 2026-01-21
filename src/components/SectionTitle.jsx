import { motion } from 'framer-motion';

export default function SectionTitle({
    icon: Icon,
    badge,
    title,
    highlight,
    color = 'srtb-green',
    align = 'left'
}) {
    const colorClasses = {
        'srtb-green': 'text-srtb-green',
        'srtb-yellow': 'text-srtb-yellow',
        'srtb-red': 'text-red-600',
    };

    const bgClasses = {
        'srtb-green': 'bg-srtb-green/10 border-srtb-green/20 text-srtb-green',
        'srtb-yellow': 'bg-srtb-yellow/10 border-srtb-yellow/20 text-srtb-yellow',
        'srtb-red': 'bg-red-600/10 border-red-600/20 text-red-600',
    };

    return (
        <div className={`mb-8 flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'}`}>
            {/* Premium Badge */}
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border mb-4 ${bgClasses[color] || bgClasses['srtb-green']}`}
                >
                    {Icon && <Icon className="w-3.5 h-3.5 animate-pulse" />}
                    <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">{badge}</span>
                </motion.div>
            )}

            {/* High-Impact Title */}
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9]"
            >
                {title} <span className={colorClasses[color] || colorClasses['srtb-green']}>{highlight}</span>
            </motion.h2>
        </div>
    );
}
