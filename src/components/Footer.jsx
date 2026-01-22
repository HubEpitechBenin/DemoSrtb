import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Twitter, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';
import bplayLogo from '../assets/bplay_logo.png';

const footerLinks = [
    {
        title: "Plateforme",
        links: ["Séries & Films", "Documentaires", "En Direct", "Catégories", "Notre Sélection"]
    },
    {
        title: "Support",
        links: ["Centre d'aide", "Compte", "Modes de paiement", "Nous contacter"]
    },
    {
        title: "Légal",
        links: ["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales", "Gestion des cookies"]
    }
];

const SocialIcon = ({ Icon, href }) => (
    <motion.a
        href={href}
        whileHover={{ y: -3, scale: 1.1 }}
        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-srtb-green hover:border-srtb-green/50 transition-all duration-300"
    >
        <Icon className="w-5 h-5" />
    </motion.a>
);

export default function Footer() {
    return (
        <footer className="relative bg-zinc-950 pt-16 md:pt-20 pb-10 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <div className="mb-6">
                                <img
                                    src={bplayLogo}
                                    alt="BPLAY"
                                    className="h-12 object-contain"
                                />
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                                Vivez l'excellence médiatique avec SRTB BPLAY. Votre fenêtre premium sur l'information,
                                la culture et le divertissement au Bénin et en Afrique.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap gap-3 md:gap-4">
                            <SocialIcon Icon={Facebook} href="#" />
                            <SocialIcon Icon={Instagram} href="#" />
                            <SocialIcon Icon={Youtube} href="#" />
                            <SocialIcon Icon={Twitter} href="#" />
                            <SocialIcon Icon={Linkedin} href="#" />
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-1 hidden lg:block" /> {/* Spacer */}

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8">
                        {footerLinks.map((column, idx) => (
                            <div key={idx}>
                                <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 border-b border-srtb-green/30 pb-2 inline-block">
                                    {column.title}
                                </h4>
                                <ul className="space-y-4">
                                    {column.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <a
                                                href="#"
                                                className="text-zinc-500 hover:text-white transition-colors text-sm font-medium flex items-center group"
                                            >
                                                <span className="w-1.5 h-1.5 bg-srtb-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter / Contact Section - High Impact */}
                <div className="relative rounded-2xl bg-zinc-900 p-6 md:p-12 border border-white/5 mb-16 md:mb-20 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-srtb-green/5 blur-[100px] -mr-32 -mt-32" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                                Restez connecté à <span className="text-srtb-green">l'info</span>
                            </h3>
                            <p className="text-zinc-400 mb-0 text-sm md:text-base">Inscrivez-vous pour recevoir les temps forts de la SRTB directement dans votre boîte mail.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-srtb-green/50 transition-all font-medium text-sm"
                            />
                            <button className="bg-srtb-green hover:bg-green-700 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg shadow-srtb-green/20 text-sm whitespace-nowrap">
                                S'ABONNER
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-srtb-green/5 blur-[80px] -z-10" />

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            SRTB © 2026
                        </span>
                        <span className="hidden md:inline text-zinc-800">|</span>
                        <a href="#" className="hover:text-srtb-green transition-colors">Politique de confidentialité</a>
                        <span className="hidden md:inline text-zinc-800">|</span>
                        <a href="#" className="hover:text-srtb-green transition-colors">Mentions légales</a>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-zinc-600 font-bold uppercase tracking-tighter">
                        <Globe className="w-4 h-4 text-srtb-green animate-pulse" />
                        <span>Fait par la <span className="text-white">TEAM SRTB SQUAD</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
