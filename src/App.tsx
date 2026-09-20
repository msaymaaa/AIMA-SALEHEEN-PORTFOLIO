import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { CosmicSparkCanvas } from './components/Background/CosmicSparkCanvas';
import { GlowCursor, type CursorState } from './components/Cursor/GlowCursor';
import { SplashScreen } from './components/Splash/SplashScreen';
import { Navbar } from './components/Navbar/Navbar';
import { HeroBio } from './components/Dashboard/HeroBio';
import { ProjectsSection } from './components/Dashboard/ProjectsSection';
import { CredentialsSection } from './components/Dashboard/CredentialsSection';
import { CraftSection } from './components/Dashboard/CraftSection';
import { ExperienceSection } from './components/Dashboard/ExperienceSection';
import { IrisSection } from './components/Dashboard/IrisSection';
import { StreamSection } from './components/Dashboard/StreamSection';
import { FooterSection } from './components/Dashboard/FooterSection';
import { CommandPaletteModal } from './components/Dashboard/CommandPaletteModal';
import { VerticalContactSidebar } from './components/Contact/VerticalContactSidebar';
import { ResumeModal } from './components/Contact/ResumeModal';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
  const [activeSection, setActiveSection] = useState('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Helper to change cursor state
  const handleCursorChange = (type: 'default' | 'interactive', text?: string) => {
    setCursorState({ type, text });
  };

  // Keyboard shortcut for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (showSplash) return;

    const sections = ['home', 'projects', 'credentials', 'craft', 'experience', 'iris', 'stream'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSplash]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#f1f5f9] selection:bg-sky-500/30 selection:text-sky-200">
      {/* Interactive Particle / Cursor Spark Canvas */}
      <CosmicSparkCanvas />

      {/* Cyber Grid & Ambient Grain Backdrop */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-40 z-[1]" />
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-20 z-[1]" />

      {/* Custom Glowing Blue Cursor */}
      <GlowCursor cursorState={cursorState} />

      {/* Vertical Interactive "CONTACT" Sidebar on the Left */}
      {!showSplash && (
        <VerticalContactSidebar
          onResumeClick={() => setIsResumeModalOpen(true)}
          onCursorChange={handleCursorChange}
        />
      )}

      {/* Intro / Splash Screen with Hollow Outline Typography */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onEnter={() => setShowSplash(false)}
            onCursorChange={handleCursorChange}
          />
        )}
      </AnimatePresence>

      {/* Main Dashboard Experience */}
      <div className={`relative z-10 transition-opacity duration-700 ${showSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Sticky Top Navigation Bar */}
        <Navbar
          activeSection={activeSection}
          onNavigateSection={scrollToSection}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onReopenSplash={() => setShowSplash(true)}
          onCursorChange={handleCursorChange}
        />

        {/* Main Content Sections */}
        <main className="space-y-4">
          {/* Central Bio & Modular Widgets */}
          <HeroBio
            onNavigateSection={scrollToSection}
            onCursorChange={handleCursorChange}
          />

          {/* Featured Projects with Dark Glassmorphism Cards */}
          <ProjectsSection onCursorChange={handleCursorChange} />

          {/* Credentials, Education & Enterprise Job Simulations */}
          <CredentialsSection onCursorChange={handleCursorChange} />

          {/* Craft, 3D Tech Sphere, & Technical Domain Matrix */}
          <CraftSection onCursorChange={handleCursorChange} />

          {/* Experience Section (NRTC Cybersecurity & UAV, Mechaline BizDev) */}
          <ExperienceSection onCursorChange={handleCursorChange} />

          {/* Iris: Conversational AI Agent Terminal */}
          <IrisSection onCursorChange={handleCursorChange} />

          {/* Live Activity Stream & Building Telemetry */}
          <StreamSection onCursorChange={handleCursorChange} />
        </main>

        {/* Editorial Footer */}
        <FooterSection
          onNavigateSection={scrollToSection}
          onCursorChange={handleCursorChange}
        />
      </div>

      {/* Global Command Palette Modal (⌘K / ESC) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateSection={scrollToSection}
        onCursorChange={handleCursorChange}
      />

      {/* Dedicated Interactive Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onCursorChange={handleCursorChange}
      />
    </div>
  );
}
