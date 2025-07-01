
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus,
  Receipt,
  TrendingUp,
  PieChart
} from 'lucide-react';

const ExpenseList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock expenses data
  const expenses = [
    { id: 1, description: 'Starbucks Coffee', amount: 5.75, category: 'Food & Dining', date: '2024-01-07', color: '#10B981', merchant: 'Starbucks' },
    { id: 2, description: 'Uber Ride', amount: 12.50, category: 'Transportation', date: '2024-01-07', color: '#06B6D4', merchant: 'Uber' },
    { id: 3, description: 'Amazon Purchase', amount: 89.99, category: 'Shopping', date: '2024-01-06', color: '#8B5CF6', merchant: 'Amazon' },
    { id: 4, description: 'Movie Tickets', amount: 24.00, category: 'Entertainment', date: '2024-01-06', color: '#F59E0B', merchant: 'AMC Theaters' },
    { id: 5, description: 'Grocery Shopping', amount: 67.45, category: 'Food & Dining', date: '2024-01-05', color: '#10B981', merchant: 'Whole Foods' },
    { id: 6, description: 'Gas Station', amount: 45.20, category: 'Transportation', date: '2024-01-05', color: '#06B6D4', merchant: 'Shell' },
    { id: 7, description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-01', color: '#F59E0B', merchant: 'Netflix' },
    { id: 8, description: 'Pharmacy', amount: 23.75, category: 'Healthcare', date: '2024-01-04', color: '#EF4444', merchant: 'CVS Pharmacy' }
  ];

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Expenses</h1>
          <Button 
            size="icon"
            onClick={() => navigate('/add-expense')}
            className="bg-flux-gradient hover:opacity-90 text-white rounded-full"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-2xl border-gray-200 focus:border-flux-blue"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="p-6">
        <Card className="rounded-2xl border-gray-200 shadow-lg mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              ${totalAmount.toFixed(2)}
            </h2>
            <p className="text-gray-600">
              {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} found
            </p>
          </CardContent>
        </Card>

        {/* Expense List */}
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <Card key={expense.id} className="expense-card">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: expense.color }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{expense.description}</h3>
                      <p className="text-gray-500 text-sm">{expense.merchant}</p>
                      <p className="text-gray-400 text-xs">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">
                      ${expense.amount.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No expenses found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first expense'}
            </p>
            <Button 
              onClick={() => navigate('/scan-receipt')}
              className="bg-flux-gradient hover:opacity-90 text-white px-6 py-3 rounded-2xl"
            >
              Scan Receipt
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-sm mx-auto flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="flex-col text-gray-600"
          >
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-col text-flux-blue"
          >
            <Receipt className="w-5 h-5 mb-1" />
            <span className="text-xs">Expenses</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/reports')}
            className="flex-col text-gray-600"
          >
            <PieChart className="w-5 h-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="flex-col text-gray-600"
          >
            <img 
              src="/lovable-uploads/ef560c48-a4e6-4cad-8df7-4f7a9a9b36ec.png" 
              alt="Profile" 
              className="w-5 h-5 mb-1"
            />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
