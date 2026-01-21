import { motion } from 'framer-motion';
import categoriesWithImages from '../data/categoriesWithImages';

export default function CategoriesSection() {
    return (
        <div className="py-6 px-4 md:px-8">
            {/* Title */}
            <div className="mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-black mb-1 md:mb-2">Catégories</h2>
                <p className="text-gray-400 text-xs md:text-sm">Explorez le contenu qui vous intéresse</p>
            </div>

            {/* Categories Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {categoriesWithImages.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -6, scale: 1.05 }}
                        className="group relative cursor-pointer rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
                    >
                        {/* Background Image */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Color Overlay */}
                        <div
                            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
                            style={{
                                background: `linear-gradient(135deg, ${category.color}CC 0%, ${category.color}99 100%)`
                            }}
                        ></div>

                        {/* Darker Bottom Gradient for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Content */}
                        <div className="relative h-full flex items-end p-3 md:p-4 z-10">
                            <h3 className="text-white font-black text-sm md:text-lg leading-tight">
                                {category.name}
                            </h3>
                        </div>

                        {/* Subtle Border on Hover */}
                        <div
                            className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl md:rounded-2xl"
                            style={{ borderColor: category.color }}
                        ></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
