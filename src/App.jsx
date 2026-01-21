import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
import AmbientBackground from './components/AmbientBackground';
import CategoriesSection from './components/CategoriesSection';
import LiveSection from './components/LiveSection';
import TopShowsSection from './components/TopShowsSection';
import { contentSections } from './data/contentData';

function AppContent() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <AmbientBackground />

      {/* Navbar - Now full width without sidebar */}
      <Navbar />

      {/* Main Content Area - No sidebar offset needed */}
      <div className="min-h-screen relative w-full">
        <main className="relative z-10 w-full">
          <Hero />

          <div className="relative space-y-3 pb-20 overflow-hidden">



            {/* Categories Image Blocks Section */}
            <CategoriesSection />

            {/* En Direct / Live Section */}
            <LiveSection />

            {/* Top Émissions / Best Shows Section */}
            <TopShowsSection />

            {/* Render all content sections from contentData - Mobile Optimized */}
            {contentSections.map((section, index) => (
              <div key={section.id} className="py-4">
                <div className="px-4 md:px-8 mb-4 md:mb-5 flex items-center gap-3 md:gap-4">
                  <div className="w-1 md:w-1.5 h-6 md:h-8 rounded-full" style={{ backgroundColor: section.sectionColor }}></div>
                  <h2 className="text-2xl md:text-3xl font-black">{section.title}</h2>
                </div>
                <ContentRow
                  items={section.items}
                  variant={index % 3 === 0 ? 'wide' : index % 3 === 1 ? 'large' : 'default'}
                />
              </div>
            ))}


          </div>
        </main>

        {/* Footer */}
        <footer className="relative py-16 mt-20" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-elevated)' }}>
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-black mb-4">
                <span className="text-srtb-green">B</span>
                <span style={{ color: 'var(--text-primary)' }}>PLAY</span>
              </h3>
              <p className="text-sm opacity-60 mb-6">
                L'expérience digitale de la SRTB.
                <br />Information, divertissement et culture en illimité.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-80">Chaînes</h4>
              <div className="space-y-2 text-sm opacity-60">
                <p className="hover:text-srtb-green cursor-pointer">Bénin TV</p>
                <p className="hover:text-srtb-green cursor-pointer">Bénin Sport</p>
                <p className="hover:text-srtb-green cursor-pointer">Alafia</p>
                <p className="hover:text-srtb-green cursor-pointer">Radio Bénin</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-80">Pratique</h4>
              <div className="space-y-2 text-sm opacity-60">
                <p className="hover:text-srtb-green cursor-pointer">Grille des programmes</p>
                <p className="hover:text-srtb-green cursor-pointer">Replay</p>
                <p className="hover:text-srtb-green cursor-pointer">Devenir Annonceur</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider opacity-80">Légal</h4>
              <div className="space-y-2 text-sm opacity-60">
                <p className="hover:text-srtb-green cursor-pointer">Mentions Légales</p>
                <p className="hover:text-srtb-green cursor-pointer">Politique de Confidentialité</p>
                <p className="hover:text-srtb-green cursor-pointer">CGU</p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 text-center text-xs opacity-40 border-t border-white/5">
            <p>&copy; 2026 SRTB - Tous droits réservés. Une réalisation digitale avancée.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;