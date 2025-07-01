import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  Scan, 
  Receipt, 
  TrendingUp, 
  PieChart, 
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));

  // Mock data for demo
  const [dashboardData] = useState({
    totalExpenses: 2847.50,
    monthlyBudget: 3500.00,
    expensesThisMonth: 1923.75,
    lastMonthComparison: 12.5,
    topCategories: [
      { name: 'Food & Dining', amount: 542.30, color: '#10B981', percentage: 28 },
      { name: 'Transportation', amount: 387.50, color: '#06B6D4', percentage: 20 },
      { name: 'Shopping', amount: 298.75, color: '#8B5CF6', percentage: 16 },
      { name: 'Entertainment', amount: 195.20, color: '#F59E0B', percentage: 10 }
    ],
    recentExpenses: [
      { id: 1, description: 'Starbucks Coffee', amount: 5.75, category: 'Food & Dining', date: '2024-01-07', color: '#10B981' },
      { id: 2, description: 'Uber Ride', amount: 12.50, category: 'Transportation', date: '2024-01-07', color: '#06B6D4' },
      { id: 3, description: 'Amazon Purchase', amount: 89.99, category: 'Shopping', date: '2024-01-06', color: '#8B5CF6' },
      { id: 4, description: 'Movie Tickets', amount: 24.00, category: 'Entertainment', date: '2024-01-06', color: '#F59E0B' }
    ]
  });

  const budgetUsedPercentage = (dashboardData.expensesThisMonth / dashboardData.monthlyBudget) * 100;

  const handleScanReceipt = () => {
    navigate('/scan-receipt');
  };

  const handleAddExpense = () => {
    navigate('/add-expense');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-flux-gradient p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <img 
                src="/lovable-uploads/ef560c48-a4e6-4cad-8df7-4f7a9a9b36ec.png" 
                alt="Profile" 
                className="w-8 h-8"
              />
            </div>
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <h1 className="text-white text-xl font-semibold">{user?.name}</h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20 rounded-2xl"
            onClick={() => toast.info('Notifications coming soon!')}
          >
            <Bell className="w-6 h-6" />
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">{currentMonth} Budget</p>
              <h2 className="text-white text-2xl font-bold">
                ${dashboardData.expensesThisMonth.toFixed(2)}
              </h2>
              <p className="text-white/80 text-sm">
                of ${dashboardData.monthlyBudget.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-white/80 text-sm mb-1">
                {dashboardData.lastMonthComparison > 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(dashboardData.lastMonthComparison)}% vs last month
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {Math.round(budgetUsedPercentage)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={handleScanReceipt}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-lg py-6 rounded-2xl flex-col h-auto"
          >
            <Scan className="w-8 h-8 text-flux-teal mb-2" />
            <span className="font-semibold">Scan Receipt</span>
          </Button>
          <Button 
            onClick={handleAddExpense}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-lg py-6 rounded-2xl flex-col h-auto"
          >
            <Plus className="w-8 h-8 text-flux-blue mb-2" />
            <span className="font-semibold">Add Expense</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-2xl border-gray-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-flux-green mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                ${dashboardData.totalExpenses.toFixed(2)}
              </h3>
              <p className="text-gray-600 text-sm">Total Expenses</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-gray-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-flux-purple mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {dashboardData.recentExpenses.length}
              </h3>
              <p className="text-gray-600 text-sm">This Week</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Categories */}
      <div className="px-6 mb-6">
        <Card className="rounded-2xl border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-gray-900">Top Categories</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/reports')}
                className="text-flux-blue"
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-700 font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">${category.amount}</p>
                  <p className="text-gray-500 text-sm">{category.percentage}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <div className="px-6 mb-6">
        <Card className="rounded-2xl border-gray-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-gray-900">Recent Expenses</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/expenses')}
                className="text-flux-blue"
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardData.recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: expense.color }}
                  />
                  <div>
                    <p className="text-gray-900 font-medium">{expense.description}</p>
                    <p className="text-gray-500 text-sm">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">${expense.amount}</p>
                  <p className="text-gray-500 text-sm">{expense.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-sm mx-auto flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-col text-flux-blue"
          >
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/expenses')}
            className="flex-col text-gray-600"
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

export default Dashboard;
