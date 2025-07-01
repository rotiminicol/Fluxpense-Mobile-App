
import { createWorker } from 'tesseract.js';
import { OCRResult, CategorySuggestion, ocrService } from './ocrService';

export const realOcrService = {
  async processReceiptImage(imageFile: File): Promise<OCRResult> {
    try {
      console.log('Starting OCR processing...');
      
      // Initialize Tesseract worker
      const worker = await createWorker('eng');
      
      // Process the image
      const { data: { text } } = await worker.recognize(imageFile);
      await worker.terminate();
      
      console.log('OCR Text extracted:', text);
      
      // Parse the extracted text
      const result = this.parseReceiptText(text);
      
      // Add category suggestion
      const categorysuggestion = ocrService.suggestCategory(result.merchant, result.items);
      result.category = categorySuggestion.name;
      
      return result;
    } catch (error) {
      console.error('OCR processing failed:', error);
      // Fallback to mock service
      return ocrService.processReceiptImage(imageFile);
    }
  },

  parseReceiptText(text: string): OCRResult {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let merchant = '';
    let amount = 0;
    let date = '';
    const items: string[] = [];
    
    // Extract merchant (usually first few lines)
    if (lines.length > 0) {
      merchant = lines[0];
      // Check if second line is also part of merchant name
      if (lines.length > 1 && !this.containsAmount(lines[1]) && !this.containsDate(lines[1])) {
        merchant += ' ' + lines[1];
      }
    }
    
    // Extract amounts and date
    for (const line of lines) {
      // Look for total amount (usually has keywords like 'total', 'amount', or '$')
      const amountMatch = this.extractAmount(line);
      if (amountMatch && (line.toLowerCase().includes('total') || line.toLowerCase().includes('amount') || amountMatch > amount)) {
        amount = amountMatch;
      }
      
      // Look for date
      const dateMatch = this.extractDate(line);
      if (dateMatch) {
        date = dateMatch;
      }
      
      // Extract items (lines that don't contain amount or date and aren't merchant)
      if (!this.containsAmount(line) && !this.containsDate(line) && 
          line !== merchant && line.length > 3 && line.length < 50) {
        items.push(line);
      }
    }
    
    return {
      merchant: merchant || 'Unknown Merchant',
      amount: amount || 0,
      date: date || new Date().toISOString().split('T')[0],
      items: items.slice(0, 5), // Limit to 5 items
      confidence: 0.8
    };
  },

  extractAmount(text: string): number | null {
    // Look for currency patterns like $12.34, 12.34, $12
    const patterns = [
      /\$(\d+\.?\d*)/,
      /(\d+\.\d{2})/,
      /(\d+\.\d{1})/,
      /(\d+)\.00/,
      /Total:?\s*\$?(\d+\.?\d*)/i,
      /Amount:?\s*\$?(\d+\.?\d*)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = parseFloat(match[1]);
        if (amount > 0 && amount < 10000) { // Reasonable amount range
          return amount;
        }
      }
    }
    
    return null;
  },

  extractDate(text: string): string | null {
    // Look for date patterns
    const patterns = [
      /(\d{1,2}\/\d{1,2}\/\d{4})/,
      /(\d{1,2}-\d{1,2}-\d{4})/,
      /(\d{4}-\d{1,2}-\d{1,2})/,
      /(\d{1,2}\/\d{1,2}\/\d{2})/
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          const date = new Date(match[1]);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
          }
        } catch (e) {
          continue;
        }
      }
    }
    
    return null;
  },

  containsAmount(text: string): boolean {
    return /\$\d+|\d+\.\d{2}|total|amount/i.test(text);
  },

  containsDate(text: string): boolean {
    return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/i.test(text);
  }
};
