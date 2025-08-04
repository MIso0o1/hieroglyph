import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const HieroglyphCard = ({ 
  hieroglyph, 
  index, 
  onDragStart, 
  onDragEnd, 
  onAddCard,
  isDragging = false,
  isInDropZone = false 
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(hieroglyph));
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart && onDragStart(hieroglyph);
  };

  const handleDragEnd = (e) => {
    onDragEnd && onDragEnd();
  };

  const handleCardClick = (e) => {
    // Prevent click when dragging
    if (e.defaultPrevented) return;
    
    setIsClicked(true);
    // Auto-hide after 3 seconds
    setTimeout(() => setIsClicked(false), 3000);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddCard && onAddCard(hieroglyph);
    setIsClicked(false);
  };

  const handleClickOutside = () => {
    setIsClicked(false);
  };

  return (
    <motion.div
      className="relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : isClicked ? 100 : 1
      }}
      onClick={handleCardClick}
    >
      {/* Main card */}
      <div 
        className={`
          relative bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 
          rounded-xl p-6 border-2 border-amber-300 
          shadow-lg backdrop-blur-sm
          transition-all duration-300
          ${isDragging ? 'ring-4 ring-amber-400 ring-opacity-50 opacity-50' : ''}
          ${isClicked ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''}
          hover:shadow-xl hover:border-amber-400
          min-w-[120px] min-h-[140px]
          flex flex-col items-center justify-center
          group select-none
        `}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        
        {/* Hieroglyph symbol */}
        <div className="text-5xl mb-3 text-amber-900 font-serif select-none group-hover:scale-110 transition-transform duration-200 pointer-events-none">
          {hieroglyph.symbol}
        </div>
        
        {/* Meaning */}
        <div className="text-center pointer-events-none">
          <p className="text-sm font-semibold text-amber-800 capitalize mb-1 font-handwritten">
            {hieroglyph.meaning}
          </p>
          <p className="text-xs text-amber-600 capitalize font-handwritten">
            {hieroglyph.category}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-amber-400 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-amber-400 rounded-full opacity-60 pointer-events-none" />
      </div>
      
      {/* Drag indicator */}
      <motion.div
        className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: isDragging ? 1.2 : 1 }}
      >
        ⋮⋮
      </motion.div>

      {/* Add button - appears when card is clicked */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClickOutside}
        >
          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 font-semibold text-sm transition-colors duration-200"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            onClick={handleAddClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add
          </motion.button>
        </motion.div>
      )}

      {/* Click hint */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Click to add • Drag to move
      </div>
    </motion.div>
  );
};

export default HieroglyphCard;

