import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HieroglyphCard from './HieroglyphCard';
import { getAllHieroglyphs, getHieroglyphMeaning } from '../lib/hieroglyphMapping';
import { Button } from './ui/button';
import { Trash2, Copy, RotateCcw } from 'lucide-react';

const DraggableCardsSection = () => {
  const [hieroglyphs, setHieroglyphs] = useState([]);
  const [droppedHieroglyphs, setDroppedHieroglyphs] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [visibleCards, setVisibleCards] = useState(12);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const dropZoneRef = useRef(null);

  useEffect(() => {
    const allHieroglyphs = getAllHieroglyphs();
    setHieroglyphs(allHieroglyphs);
  }, []);

  const handleAddCard = (hieroglyph) => {
    setDroppedHieroglyphs(prev => [...prev, { ...hieroglyph, id: Date.now() }]);
  };

  const handleDragStart = (hieroglyph) => {
    setDraggedItem(hieroglyph);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsOverDropZone(false);
    setDragOverIndex(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('text/plain');
      const hieroglyph = JSON.parse(data);
      if (hieroglyph && hieroglyph.symbol) {
        setDroppedHieroglyphs(prev => [...prev, { ...hieroglyph, id: Date.now() }]);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
    setIsOverDropZone(false);
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsOverDropZone(true);
  };

  const handleDragLeave = (e) => {
    // Only set to false if we're leaving the drop zone entirely
    if (!dropZoneRef.current?.contains(e.relatedTarget)) {
      setIsOverDropZone(false);
    }
  };

  // Reordering functions for cards within the drop zone
  const handleDropZoneCardDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'reorder', index }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropZoneCardDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDropZoneCardDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const data = e.dataTransfer.getData('text/plain');
      const dragData = JSON.parse(data);
      
      if (dragData.type === 'reorder') {
        const dragIndex = dragData.index;
        if (dragIndex !== dropIndex) {
          const newItems = [...droppedHieroglyphs];
          const draggedItem = newItems[dragIndex];
          newItems.splice(dragIndex, 1);
          newItems.splice(dropIndex, 0, draggedItem);
          setDroppedHieroglyphs(newItems);
        }
      }
    } catch (error) {
      console.error('Error reordering cards:', error);
    }
    
    setDragOverIndex(null);
  };

  const handleDropZoneCardDragLeave = (e) => {
    e.stopPropagation();
    setDragOverIndex(null);
  };

  const removeFromDropZone = (id) => {
    setDroppedHieroglyphs(prev => prev.filter(item => item.id !== id));
  };

  const clearDropZone = () => {
    setDroppedHieroglyphs([]);
  };

  const copyDropZoneContent = async () => {
    const content = droppedHieroglyphs.map(h => h.symbol).join('');
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const loadMoreCards = () => {
    setVisibleCards(prev => Math.min(prev + 12, hieroglyphs.length));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const dropZoneVariants = {
    normal: {
      scale: 1,
      borderColor: "rgb(252 211 77)",
      backgroundColor: "rgba(254, 243, 199, 0.5)",
      transition: { duration: 0.2 }
    },
    dragOver: {
      scale: 1.02,
      borderColor: "rgb(34 197 94)",
      backgroundColor: "rgba(187, 247, 208, 0.7)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div ref={ref} className="mt-16 px-4">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-amber-900 mb-4 font-handwritten-title">
          Interactive Hieroglyph Cards
        </h2>
        <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed font-handwritten">
          Drag and drop these ancient symbols to create your own hieroglyphic messages. 
          Each card represents a letter, word, or concept from the fascinating world of ancient Egypt.
        </p>
      </motion.div>

      {/* Drop Zone */}
      <motion.div
        ref={dropZoneRef}
        className="mb-12 mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-amber-800 mb-4 text-center font-handwritten-bold">
          Your Hieroglyphic Sentence
        </h3>
        
        <motion.div
          variants={dropZoneVariants}
          animate={isOverDropZone ? "dragOver" : "normal"}
          className="min-h-[120px] border-3 border-dashed border-amber-300 rounded-xl p-6 bg-amber-50/50 backdrop-blur-sm"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {droppedHieroglyphs.length === 0 ? (
            <div className="text-center text-amber-600 py-8">
              <p className="text-lg mb-2">Drop or click and add hieroglyph cards here to create your sentence</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {droppedHieroglyphs.map((hieroglyph, index) => (
                <motion.div
                  key={hieroglyph.id}
                  className={`relative group ${dragOverIndex === index ? 'ring-2 ring-blue-400' : ''}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div 
                    className="bg-white rounded-lg p-4 border-2 border-amber-300 shadow-md min-w-[80px] text-center cursor-move"
                    draggable="true"
                    onDragStart={(e) => handleDropZoneCardDragStart(e, index)}
                    onDragOver={(e) => handleDropZoneCardDragOver(e, index)}
                    onDrop={(e) => handleDropZoneCardDrop(e, index)}
                    onDragLeave={handleDropZoneCardDragLeave}
                  >
                    <div className="text-3xl mb-2 text-amber-900 pointer-events-none">{hieroglyph.symbol}</div>
                    <div className="text-xs text-amber-700 capitalize pointer-events-none">{hieroglyph.meaning}</div>
                  </div>
                  <button
                    onClick={() => removeFromDropZone(hieroglyph.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  >
                    ×
                  </button>
                  {/* Reorder indicator */}
                  <div className="absolute -top-1 -left-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    ⋮⋮
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Drop Zone Controls */}
        {droppedHieroglyphs.length > 0 && (
          <motion.div
            className="flex justify-center gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={copyDropZoneContent}
              variant="outline"
              size="sm"
              className="border-amber-300 hover:bg-amber-100 text-amber-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              onClick={clearDropZone}
              variant="outline"
              size="sm"
              className="border-red-300 hover:bg-red-100 text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Hieroglyph Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto"
      >
        {hieroglyphs.slice(0, visibleCards).map((hieroglyph, index) => (
          <HieroglyphCard
            key={`${hieroglyph.symbol}-${index}`}
            hieroglyph={hieroglyph}
            index={index}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onAddCard={handleAddCard}
            isDragging={draggedItem?.symbol === hieroglyph.symbol}
            isInDropZone={isOverDropZone}
          />
        ))}
      </motion.div>

      {/* Load More Button */}
      {visibleCards < hieroglyphs.length && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={loadMoreCards}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Load More Hieroglyphs ({hieroglyphs.length - visibleCards} remaining)
          </Button>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        className="text-center mt-12 p-6 bg-amber-50/50 rounded-xl border border-amber-200 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
      >
        <h4 className="text-lg font-semibold text-amber-800 mb-3 font-handwritten-bold">How to Use</h4>
        <div className="text-amber-700 space-y-2 text-sm font-handwritten">
          <p>• <strong>Click to Add:</strong> Click any hieroglyph card and then click the "Add" button to add it to your sentence</p>
          <p>• <strong>Drag & Drop:</strong> Click and drag any hieroglyph card to the sentence area above</p>
          <p>• <strong>Reorder:</strong> Drag cards within your sentence to rearrange their order</p>
          <p>• <strong>Create Sentences:</strong> Combine multiple hieroglyphs to form words and sentences</p>
          <p>• <strong>Remove Cards:</strong> Hover over cards in your sentence and click the × to remove them</p>
          <p>• <strong>Copy & Share:</strong> Use the copy button to share your hieroglyphic creations</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DraggableCardsSection;

