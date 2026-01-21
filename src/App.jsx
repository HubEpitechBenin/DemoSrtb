import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
import Footer from './components/Footer';

import CategoriesSection from './components/CategoriesSection';
import LiveSection from './components/LiveSection';
import TopShowsSection from './components/TopShowsSection';
import { contentSections } from './data/contentData';

function AppContent() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* Navbar - Now full width without sidebar */}
      <Navbar />

      {/* Main Content Area - No sidebar offset needed */}
      <div className="min-h-screen relative w-full bg-[#050505]">
        <main className="relative z-10 w-full">
          <Hero />

          <div className="relative space-y-0 pb-20 overflow-hidden">
            {/* Atmospheric Background Glows */}
            <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-srtb-green/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-srtb-red/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-[60%] left-[-10%] w-[40%] h-[40%] bg-srtb-yellow/5 blur-[150px] rounded-full pointer-events-none" />
            {/* Categories Image Blocks Section */}
            <CategoriesSection />

            {/* En Direct / Live Section */}
            <LiveSection />

            {/* Top Émissions / Best Shows Section */}
            <TopShowsSection />

            {/* Render truncated content sections from contentData */}
            {contentSections.map((section) => (
              <div key={section.id}>
                <ContentRow
                  title={section.title}
                  items={section.items}
                  variant={section.variant || 'default'}
                />
              </div>
            ))}
          </div>
        </main>

        <Footer />
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