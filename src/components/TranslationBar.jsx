import React, { useState } from 'react';
import { translateToHieroglyphs } from '../lib/hieroglyphMapping';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, RotateCcw } from 'lucide-react';

const TranslationBar = ({ onTranslation }) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate translation delay for better UX
    setTimeout(() => {
      const translated = translateToHieroglyphs(inputText);
      setTranslatedText(translated);
      onTranslation && onTranslation(translated, inputText);
      setIsTranslating(false);
    }, 500);
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    onTranslation && onTranslation('', '');
  };

  const handleCopy = async () => {
    if (translatedText) {
      try {
        await navigator.clipboard.writeText(translatedText);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-lg border border-amber-200">
      <div className="space-y-4">
        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Enter text to translate to hieroglyphs..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-lg p-4 border-2 border-amber-300 focus:border-amber-500 rounded-lg bg-white/80 backdrop-blur-sm"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="px-4 py-4 border-2 border-amber-300 hover:bg-amber-100 rounded-lg transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Translation Result */}
        {translatedText && (
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-amber-300 rounded-lg p-6 min-h-[80px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-amber-700 mb-2 font-medium">Translation:</p>
                <div className="text-4xl leading-relaxed font-serif text-amber-900 break-all select-all">
                  {translatedText}
                </div>
              </div>
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-amber-600 hover:text-amber-800 hover:bg-amber-100"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-sm text-amber-700">
          <p>Type any text above and click "Translate" to convert it to ancient Egyptian hieroglyphs</p>
        </div>
      </div>
    </div>
  );
};

export default TranslationBar;

