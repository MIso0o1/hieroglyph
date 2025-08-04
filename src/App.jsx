import React from 'react';
import TranslationBar from './components/TranslationBar';
import DraggableCardsSection from './components/DraggableCardsSection';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 font-handwritten">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-6xl md:text-7xl font-handwritten-title text-amber-900 mb-4 tracking-wide">
          Hieroglyph Translator
        </h1>
        <p className="text-xl md:text-2xl text-amber-700 max-w-4xl mx-auto leading-relaxed font-handwritten-bold">
          Transform your words into ancient Egyptian hieroglyphs and 
          explore the mystical writing system of the pharaohs
        </p>
      </header>

      {/* Translation Section */}
      <section className="px-4 mb-16">
        <TranslationBar />
      </section>

      {/* Interactive Cards Section */}
      <section>
        <DraggableCardsSection />
      </section>

      {/* Footer */}
      <footer className="text-center py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-600 mb-4 font-handwritten">
            Discover the beauty of ancient Egyptian writing and create your own hieroglyphic messages
          </p>
          <p className="text-sm text-amber-500 font-handwritten">
            Created by Michal Šomský | michal.somsky@protonmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

