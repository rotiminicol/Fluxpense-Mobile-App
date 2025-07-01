import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Scan } from 'lucide-react';
import { toast } from 'sonner';

const AddExpense = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    notes: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      console.log('Saving expense:', formData);
      toast.success('Expense added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save expense');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-ivory shadow-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-emerald" />
        </Button>
        <h1 className="text-xl font-semibold text-charcoal">Add Expense</h1>
        <Button 
          size="icon"
          onClick={() => navigate('/scan-receipt')}
          className="bg-emerald-champagne-gradient hover:opacity-90 text-ivory rounded-full"
        >
          <Scan className="w-6 h-6" />
        </Button>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-charcoal font-medium">
              Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald text-lg">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="pl-8 py-6 rounded-2xl border-champagne focus:border-emerald text-2xl font-semibold bg-ivory text-charcoal"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-charcoal font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="description"
              placeholder="What did you buy?"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="py-4 rounded-2xl border-champagne focus:border-emerald"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-charcoal font-medium">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="py-4 rounded-2xl border-champagne focus:border-emerald bg-ivory text-charcoal">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-charcoal font-medium">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="py-4 rounded-2xl border-champagne focus:border-emerald"
            />
          </div>

          {/* Merchant */}
          <div className="space-y-2">
            <Label htmlFor="merchant" className="text-charcoal font-medium">Merchant</Label>
            <Input
              id="merchant"
              placeholder="Where did you shop?"
              value={formData.merchant}
              onChange={(e) => setFormData(prev => ({ ...prev, merchant: e.target.value }))}
              className="py-4 rounded-2xl border-champagne focus:border-emerald"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-charcoal font-medium">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="rounded-2xl border-champagne focus:border-emerald resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-emerald-champagne-gradient hover:opacity-90 text-ivory font-semibold py-6 rounded-2xl text-lg shadow-lg mt-8"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Expense
          </Button>
        </form>

        {/* Alternative Option */}
        <div className="mt-6 text-center">
          <p className="text-champagne mb-4">Or try our smart scanning feature</p>
          <Button 
            onClick={() => navigate('/scan-receipt')}
            variant="outline"
            className="border-2 border-emerald text-emerald hover:bg-emerald hover:text-ivory font-semibold py-4 px-8 rounded-2xl"
          >
            <Scan className="w-5 h-5 mr-2" />
            Scan Receipt Instead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
