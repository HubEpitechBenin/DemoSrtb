import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function AmbientBackground() {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ opacity: theme === 'dark' ? 1 : 0.3 }}>
            {/* Top Left Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: theme === 'dark' ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-srtb-green rounded-full blur-[120px] mix-blend-screen"
            />

            {/* Bottom Right Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: theme === 'dark' ? [0.15, 0.3, 0.15] : [0.08, 0.15, 0.08],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-srtb-yellow rounded-full blur-[150px] mix-blend-screen"
            />
        </div>
    );
}
