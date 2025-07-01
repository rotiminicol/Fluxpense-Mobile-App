
export interface OCRResult {
  merchant?: string;
  amount?: number;
  date?: string;
  items?: string[];
  category?: string;
  confidence?: number;
}

export interface CategorySuggestion {
  name: string;
  confidence: number;
  keywords: string[];
}

// Default categories with keywords for smart categorization
const CATEGORY_KEYWORDS = {
  'Food & Dining': ['restaurant', 'cafe', 'food', 'pizza', 'burger', 'coffee', 'starbucks', 'mcdonalds', 'subway', 'dining', 'meal', 'lunch', 'dinner', 'breakfast'],
  'Transportation': ['gas', 'fuel', 'uber', 'lyft', 'taxi', 'bus', 'train', 'metro', 'parking', 'toll', 'car', 'vehicle', 'transport'],
  'Shopping': ['store', 'mall', 'retail', 'amazon', 'target', 'walmart', 'costco', 'shopping', 'purchase', 'buy'],
  'Entertainment': ['movie', 'cinema', 'theater', 'concert', 'game', 'entertainment', 'netflix', 'spotify', 'ticket', 'show'],
  'Healthcare': ['doctor', 'hospital', 'pharmacy', 'medical', 'health', 'medicine', 'clinic', 'dental', 'prescription'],
  'Utilities': ['electric', 'water', 'gas', 'internet', 'phone', 'cable', 'utility', 'bill', 'service'],
  'Travel': ['hotel', 'flight', 'airline', 'booking', 'travel', 'vacation', 'trip', 'airbnb'],
  'Education': ['school', 'university', 'course', 'book', 'education', 'tuition', 'class', 'learning'],
  'Other': []
};

export const ocrService = {
  // Simulate OCR processing with Tesseract.js or similar
  async processReceiptImage(imageFile: File): Promise<OCRResult> {
    return new Promise((resolve) => {
      // Simulate OCR processing time
      setTimeout(() => {
        // Mock OCR result - in real implementation, use Tesseract.js
        const mockResult: OCRResult = {
          merchant: this.extractMerchantFromMockData(),
          amount: this.extractAmountFromMockData(),
          date: new Date().toISOString().split('T')[0],
          items: this.extractItemsFromMockData(),
          confidence: 0.85
        };
        
        mockResult.category = this.suggestCategory(mockResult.merchant, mockResult.items).name;
        resolve(mockResult);
      }, 2000);
    });
  },

  // Extract text from image using OCR
  async extractTextFromImage(imageFile: File): Promise<string> {
    // In a real implementation, use Tesseract.js:
    // const { createWorker } = require('tesseract.js');
    // const worker = createWorker();
    // await worker.load();
    // await worker.loadLanguage('eng');
    // await worker.initialize('eng');
    // const { data: { text } } = await worker.recognize(imageFile);
    // await worker.terminate();
    // return text;
    
    // Mock implementation
    return Promise.resolve("Mock OCR text extraction from receipt");
  },

  // Smart category suggestion based on merchant and items
  suggestCategory(merchant?: string, items?: string[]): CategorySuggestion {
    const text = `${merchant || ''} ${items?.join(' ') || ''}`.toLowerCase();
    
    let bestMatch: CategorySuggestion = {
      name: 'Other',
      confidence: 0,
      keywords: []
    };

    Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
      const matches = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
      const confidence = matches.length / keywords.length;
      
      if (confidence > bestMatch.confidence) {
        bestMatch = {
          name: category,
          confidence,
          keywords: matches
        };
      }
    });

    return bestMatch;
  },

  // Get all category suggestions sorted by confidence
  getAllCategorySuggestions(merchant?: string, items?: string[]): CategorySuggestion[] {
    const text = `${merchant || ''} ${items?.join(' ') || ''}`.toLowerCase();
    
    return Object.entries(CATEGORY_KEYWORDS)
      .map(([category, keywords]) => {
        const matches = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
        const confidence = keywords.length > 0 ? matches.length / keywords.length : 0;
        
        return {
          name: category,
          confidence,
          keywords: matches
        };
      })
      .sort((a, b) => b.confidence - a.confidence);
  },

  // Mock data generators for demo
  extractMerchantFromMockData(): string {
    const merchants = [
      'Starbucks Coffee #1234',
      'Target Store #5678',
      'Shell Gas Station',
      'Amazon.com',
      'McDonald\'s #9012',
      'Best Buy Electronics',
      'CVS Pharmacy #3456',
      'Uber Technologies'
    ];
    return merchants[Math.floor(Math.random() * merchants.length)];
  },

  extractAmountFromMockData(): number {
    return Math.round((Math.random() * 100 + 5) * 100) / 100;
  },

  extractItemsFromMockData(): string[] {
    const itemSets = [
      ['Grande Latte', 'Blueberry Muffin'],
      ['T-Shirt', 'Jeans', 'Socks'],
      ['Gasoline', 'Car Wash'],
      ['Wireless Headphones', 'Phone Case'],
      ['Big Mac Meal', 'Apple Pie'],
      ['Laptop Computer', 'Mouse Pad'],
      ['Prescription Medicine', 'Vitamins'],
      ['Ride to Airport']
    ];
    return itemSets[Math.floor(Math.random() * itemSets.length)];
  }
};
