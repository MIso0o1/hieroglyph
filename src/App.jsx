import React from 'react';
import TranslationBar from './components/TranslationBar';
import DraggableCardsSection from './components/DraggableCardsSection';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 font-handwritten relative overflow-hidden">
      {/* Egyptian Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Desert landscape background */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/backgrounds/desert_landscape2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom'
          }}
        />
        
        {/* Hieroglyph pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{
            backgroundImage: 'url(/assets/backgrounds/hieroglyph_pattern1.jpg)',
            backgroundSize: '200px 200px'
          }}
        />
        
        {/* Egyptian decorative borders */}
        <div className="absolute top-0 left-0 right-0 h-4 egyptian-border-pattern opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-4 egyptian-border-pattern opacity-30" />
        
        {/* Floating sand particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="sand-drift absolute top-1/4 w-32 h-32 bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-20 rounded-full blur-xl" />
          <div className="sand-drift absolute top-3/4 w-24 h-24 bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-15 rounded-full blur-lg" style={{animationDelay: '5s'}} />
          <div className="sand-drift absolute top-1/2 w-20 h-20 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-10 rounded-full blur-md" style={{animationDelay: '10s'}} />
        </div>
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="relative">
            {/* Egyptian decorative elements around title */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-600 opacity-20">
              𓂀
            </div>
            <h1 className="text-6xl md:text-7xl font-handwritten-title text-amber-900 mb-4 tracking-wide egyptian-glow-animation">
              Hieroglyph Translator
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-4xl text-amber-600 opacity-20">
              𓈖𓏏𓂋
            </div>
          </div>
          <p className="text-xl md:text-2xl text-amber-700 max-w-4xl mx-auto leading-relaxed font-handwritten-bold mt-8">
            Transform your words into ancient Egyptian hieroglyphs and 
            explore the mystical writing system of the pharaohs
          </p>
        </header>

        {/* Egyptian divider */}
        <div className="egyptian-divider">
          <span>𓊪𓏏𓇯</span>
        </div>

        {/* Translation Section */}
        <section className="px-4 mb-16">
          <TranslationBar />
        </section>

        {/* Egyptian divider */}
        <div className="egyptian-divider">
          <span>𓈖𓏏𓂋</span>
        </div>

        {/* Interactive Cards Section */}
        <section className="papyrus-texture">
          <DraggableCardsSection />
        </section>

        {/* Footer */}
        <footer className="text-center py-12 px-4 mt-16 relative">
          <div className="absolute inset-0 egyptian-pattern-bg opacity-30" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="egyptian-divider mb-8">
              <span>𓂀𓈖𓏏𓂋𓂀</span>
            </div>
            <p className="text-amber-600 mb-4 font-handwritten">
              Discover the beauty of ancient Egyptian writing and create your own hieroglyphic messages
            </p>
            <p className="text-sm text-amber-500 font-handwritten">
              Created by Michal Šomský | michal.somsky@protonmail.com
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

