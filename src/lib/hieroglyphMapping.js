// Hieroglyph mapping based on phonetic values and common symbols
// Using Unicode hieroglyph characters where available

export const hieroglyphMapping = {
  // Single consonants (alphabetic hieroglyphs)
  'a': '𓄿', // Egyptian vulture (aleph)
  'b': '𓃀', // Foot
  'c': '𓎡', // Basket (k sound)
  'd': '𓂧', // Hand
  'e': '𓇋', // Reed (i/y sound, used for vowels)
  'f': '𓆑', // Horned viper
  'g': '𓎼', // Jar stand
  'h': '𓉔', // Shelter
  'i': '𓇋', // Reed
  'j': '𓆳', // Cobra (dj sound)
  'k': '𓎡', // Basket
  'l': '𓃭', // Lion
  'm': '𓅓', // Owl
  'n': '𓈖', // Water ripple
  'o': '𓍯', // Quail chick (w sound, used for vowels)
  'p': '𓊪', // Stool
  'q': '𓈎', // Hill slope (q sound)
  'r': '𓂋', // Mouth
  's': '𓋴', // Folded cloth
  't': '𓏏', // Loaf of bread
  'u': '𓍯', // Quail chick (w sound, used for vowels)
  'v': '𓆑', // Horned viper (f sound)
  'w': '𓍯', // Quail chick
  'x': '𓐍', // Cross (kh sound)
  'y': '𓇋', // Reed (i/y sound)
  'z': '𓊃', // Door bolt
  
  // Common words and concepts (logograms)
  'sun': '𓇳', // Sun disk
  'water': '𓈖', // Water
  'life': '𓋹', // Ankh
  'god': '𓊹', // God determinative
  'king': '𓇓', // King
  'house': '𓉐', // House
  'man': '𓀀', // Man
  'woman': '𓁐', // Woman
  'bird': '𓅿', // Bird
  'eye': '𓁹', // Eye
  'hand': '𓂧', // Hand
  'foot': '𓃀', // Foot
  'heart': '𓄣', // Heart
  'mouth': '𓂋', // Mouth
  'love': '𓅓𓂋', // Love (mr)
  'good': '𓄤', // Good
  'beautiful': '𓄤𓆑', // Beautiful (nfr)
  'great': '𓄿𓄿', // Great (aa)
  'small': '𓈖𓂧𓋴', // Small (nds)
  'big': '𓄿𓄿', // Big (wr)
  'cat': '𓅓𓇋𓅱', // Cat (miw)
  'dog': '𓃛', // Dog
  'lion': '𓃭', // Lion
  'snake': '𓆑', // Snake
  'fish': '𓂋𓅓', // Fish
  'tree': '𓇳𓏏', // Tree
  'flower': '𓆸', // Flower
  'star': '𓇼', // Star
  'moon': '𓇹', // Moon
  'earth': '𓇾', // Earth
  'sky': '𓇯', // Sky
  'fire': '𓊖', // Fire
  'wind': '𓇳𓄿', // Wind
  'peace': '𓊵', // Peace
  'war': '𓌨', // War
  'temple': '𓉟', // Temple
  'pyramid': '𓉴', // Pyramid
  'pharaoh': '𓇓𓅱', // Pharaoh
  'egypt': '𓎡𓅓𓏏', // Egypt (kmt)
  'nile': '𓇋𓏏𓂋', // Nile (itrw)
  'desert': '𓂧𓈙𓂋', // Desert (dšrt)
  'gold': '𓈖𓃀𓅱', // Gold (nbw)
  'silver': '𓈖𓃀', // Silver
  'copper': '𓃀𓇋𓄿', // Copper
  'stone': '𓇋𓈖𓂋', // Stone
  'bread': '𓏏', // Bread
  'beer': '𓏲𓈖𓎡', // Beer
  'meat': '𓇋𓅱𓆑', // Meat
  'milk': '𓇋𓂋𓏏', // Milk
  'honey': '𓃀𓇋𓏏', // Honey
  'wine': '𓇋𓂋𓊪', // Wine
  
  // Numbers
  '1': '𓏺', // One
  '2': '𓏻', // Two  
  '3': '𓏼', // Three
  '4': '𓏽', // Four
  '5': '𓏾', // Five
  '6': '𓏿', // Six
  '7': '𓐀', // Seven
  '8': '𓐁', // Eight
  '9': '𓐂', // Nine
  '10': '𓎆', // Ten
  
  // Punctuation and spaces
  ' ': ' ', // Space remains space
  '.': '𓊪', // Period (using stool as separator)
  ',': '𓊪', // Comma (using stool as separator)
  '!': '𓊪', // Exclamation (using stool as separator)
  '?': '𓊪', // Question (using stool as separator)
};

// Function to translate English text to hieroglyphs
export function translateToHieroglyphs(text) {
  if (!text) return '';
  
  const lowerText = text.toLowerCase();
  let result = '';
  let i = 0;
  
  while (i < lowerText.length) {
    let found = false;
    
    // Try to match longer words first (up to 10 characters)
    for (let len = Math.min(10, lowerText.length - i); len > 0; len--) {
      const substring = lowerText.substring(i, i + len);
      if (hieroglyphMapping[substring]) {
        result += hieroglyphMapping[substring];
        i += len;
        found = true;
        break;
      }
    }
    
    // If no match found, skip the character
    if (!found) {
      i++;
    }
  }
  
  return result;
}

// Function to get all available hieroglyphs for the draggable cards
export function getAllHieroglyphs() {
  const hieroglyphs = [];
  
  Object.entries(hieroglyphMapping).forEach(([key, value]) => {
    if (key.length === 1 || ['sun', 'water', 'life', 'god', 'king', 'house', 'man', 'woman', 'bird', 'eye', 'hand', 'foot', 'heart', 'mouth', 'love', 'good', 'beautiful', 'cat', 'dog', 'lion', 'snake', 'fish', 'tree', 'flower', 'star', 'moon', 'earth', 'sky', 'fire', 'wind', 'peace', 'temple', 'pyramid', 'pharaoh', 'egypt', 'nile', 'desert', 'gold', 'bread', 'beer', 'wine'].includes(key)) {
      hieroglyphs.push({
        symbol: value,
        meaning: key,
        category: key.length === 1 ? 'letter' : 'word'
      });
    }
  });
  
  return hieroglyphs;
}

// Function to get hieroglyph meaning from symbol
export function getHieroglyphMeaning(symbol) {
  const entry = Object.entries(hieroglyphMapping).find(([key, value]) => value === symbol);
  return entry ? entry[0] : '';
}

