import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Mail, 
  CheckCircle, 
  Loader2,
  Edit3,
  Save,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { realOcrService } from '@/services/realOcrService';
import { ocrService, CategorySuggestion } from '@/services/ocrService';
import { expenseService } from '@/services/expenseService';
import { categoryService } from '@/services/categoryService';

interface ExtractedData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

const ScanReceipt = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ExtractedData | null>(null);
  const [categorySuggestions, setCategorySuggestions] = useState<CategorySuggestion[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Mock categories for demo
  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Travel',
    'Education',
    'Other'
  ];

  const handleImageUpload = async (file: File) => {
    setSelectedImage(file);
    setIsScanning(true);
    
    try {
      console.log('Processing receipt image...');
      
      // Use real OCR service
      const result = await realOcrService.processReceiptImage(file);
      
      // Get category suggestions
      const suggestions = ocrService.getAllCategorySuggestions(result.merchant, result.items);
      setCategorySuggestions(suggestions);
      
      const mockData: ExtractedData = {
        merchant: result.merchant || 'Unknown Merchant',
        amount: result.amount || 0,
        date: result.date || new Date().toISOString().split('T')[0],
        category: result.category || suggestions[0]?.name || 'Other',
        description: result.items?.join(', ') || 'Receipt items'
      };
      
      setExtractedData(mockData);
      setEditData(mockData);
      setIsScanning(false);
      toast.success('Receipt scanned successfully!');
    } catch (error) {
      console.error('OCR processing failed:', error);
      setIsScanning(false);
      toast.error('Failed to scan receipt. Please try again.');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSaveExpense = async () => {
    if (!editData) return;
    
    try {
      // In a real implementation, you'd get the category_id from your categories
      const expenseData = {
        amount: editData.amount,
        description: editData.description,
        date: editData.date,
        category_id: 1, // This should be mapped from category name to ID
        receipt_url: selectedImage ? URL.createObjectURL(selectedImage) : undefined
      };
      
      await expenseService.create(expenseData);
      toast.success('Expense saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save expense:', error);
      toast.error('Failed to save expense');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(extractedData);
  };

  const handleCategoryChange = (category: string) => {
    if (editData) {
      setEditData({ ...editData, category });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Scan Receipt</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6">
        {!isScanning && !extractedData && (
          <div className="space-y-6">
            {/* Instructions */}
            <Card className="rounded-2xl border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-flux-gradient rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  AI-Powered Receipt Scanning
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced OCR technology automatically extracts expense details from your receipts with smart category suggestions.
                </p>
              </CardContent>
            </Card>

            {/* Scan Options */}
            <div className="space-y-4">
              <Button 
                onClick={triggerFileUpload}
                className="w-full bg-flux-gradient hover:opacity-90 text-white font-semibold py-6 rounded-2xl text-lg shadow-lg flex items-center justify-center"
              >
                <Camera className="w-6 h-6 mr-3" />
                Take Photo
              </Button>

              <Button 
                onClick={triggerFileUpload}
                variant="outline"
                className="w-full border-2 border-flux-blue text-flux-blue hover:bg-flux-blue hover:text-white font-semibold py-6 rounded-2xl text-lg flex items-center justify-center"
              >
                <Upload className="w-6 h-6 mr-3" />
                Upload Image
              </Button>

              <Button 
                onClick={() => toast.info('Email integration coming soon!')}
                variant="outline"
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 rounded-2xl text-lg flex items-center justify-center"
              >
                <Mail className="w-6 h-6 mr-3" />
                Email Receipt
              </Button>
            </div>

            {/* Tips */}
            <Card className="rounded-2xl border-gray-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Tips for better scanning:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ensure the receipt is well-lit and flat</li>
                  <li>• Include the entire receipt in the frame</li>
                  <li>• Avoid shadows and reflections</li>
                  <li>• Make sure text is clearly readable</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {isScanning && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-flux-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Loader2 className="w-16 h-16 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Receipt...
            </h2>
            <p className="text-gray-600 mb-4">
              Our AI is extracting and categorizing your expense data
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Image processed</p>
              <p>✓ Text extracted</p>
              <p className="animate-pulse">⏳ Analyzing data...</p>
            </div>
          </div>
        )}

        {extractedData && (
          <div className="space-y-6">
            {/* Success Header */}
            <Card className="rounded-2xl border-green-200 bg-green-50 shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Receipt Processed Successfully!
                </h2>
                <p className="text-gray-600">
                  Review and edit the extracted details below
                </p>
              </CardContent>
            </Card>

            {/* Category Suggestions */}
            {categorySuggestions.length > 0 && (
              <Card className="rounded-2xl border-blue-200 bg-blue-50 shadow-lg">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                    Smart Category Suggestions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySuggestions.slice(0, 3).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleCategoryChange(suggestion.name)}
                        className={`rounded-full text-xs ${
                          editData?.category === suggestion.name 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'border-blue-300 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        {suggestion.name} {suggestion.confidence > 0 && `(${Math.round(suggestion.confidence * 100)}%)`}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Extracted Data */}
            <Card className="rounded-2xl border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Expense Details</h3>
                  {!isEditing ? (
                    <Button 
                      onClick={handleEdit}
                      variant="ghost" 
                      size="sm"
                      className="text-flux-blue"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button 
                        onClick={handleCancelEdit}
                        variant="ghost" 
                        size="sm"
                        className="text-gray-600"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => setIsEditing(false)}
                        size="sm"
                        className="bg-flux-blue hover:bg-flux-blue/90 text-white"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700 font-medium">Merchant</Label>
                    {isEditing ? (
                      <Input
                        value={editData?.merchant || ''}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, merchant: e.target.value } : null)}
                        className="mt-1 rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold mt-1">{extractedData.merchant}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">Amount</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={editData?.amount || ''}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, amount: parseFloat(e.target.value) } : null)}
                        className="mt-1 rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold text-2xl mt-1">${extractedData.amount.toFixed(2)}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">Date</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editData?.date || ''}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, date: e.target.value } : null)}
                        className="mt-1 rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold mt-1">{new Date(extractedData.date).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">Category</Label>
                    {isEditing ? (
                      <Select 
                        value={editData?.category || ''} 
                        onValueChange={(value) => setEditData(prev => prev ? { ...prev, category: value } : null)}
                      >
                        <SelectTrigger className="mt-1 rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-1">
                        <span className="category-pill bg-flux-teal/10 text-flux-teal">
                          {extractedData.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Input
                        value={editData?.description || ''}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="mt-1 rounded-xl"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold mt-1">{extractedData.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleSaveExpense}
                className="w-full bg-flux-gradient hover:opacity-90 text-white font-semibold py-6 rounded-2xl text-lg shadow-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Expense
              </Button>
              
              <Button 
                onClick={() => {
                  setExtractedData(null);
                  setEditData(null);
                  setIsEditing(false);
                }}
                variant="outline"
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-6 rounded-2xl text-lg"
              >
                Scan Another Receipt
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanReceipt;
