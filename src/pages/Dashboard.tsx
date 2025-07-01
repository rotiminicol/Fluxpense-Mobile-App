import { useState, useEffect } from 'react';
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
import { expenseService } from '@/services/expenseService';
import { budgetService } from '@/services/budgetService';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    monthlyBudget: 0,
    expensesThisMonth: 0,
    lastMonthComparison: 0,
    topCategories: [],
    recentExpenses: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch recent expenses using getAll method
        const expenses = await expenseService.getAll();
        const recentExpenses = Array.isArray(expenses) ? expenses.slice(0, 4) : [];
        
        // Fetch budget data using getAll method
        const budgets = await budgetService.getAll();
        const budgetList = Array.isArray(budgets) ? budgets : [];
        const currentBudget = budgetList.find(b => {
          const budgetMonth = new Date(b.start_date).getMonth();
          const currentMonthNum = new Date().getMonth();
          return budgetMonth === currentMonthNum;
        });
        
        // Calculate totals - ensure we're working with numbers
        const totalExpenses = recentExpenses.reduce((sum, expense) => {
          const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
          return sum + amount;
        }, 0);
        
        const monthlyBudget = currentBudget ? (typeof currentBudget.amount === 'number' ? currentBudget.amount : parseFloat(currentBudget.amount) || 0) : 0;
        
        // Calculate category totals
        const categoryTotals: { [key: string]: number } = {};
        recentExpenses.forEach(expense => {
          const categoryName = expense.category?.name || 'Uncategorized';
          const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
          categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
        });
        
        const topCategories = Object.entries(categoryTotals)
          .map(([name, amount]) => ({
            name,
            amount: typeof amount === 'number' ? amount : 0,
            color: getCategoryColor(name),
            percentage: totalExpenses > 0 ? Math.round((Number(amount) / totalExpenses) * 100) : 0
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 4);
        
        setDashboardData({
          totalExpenses,
          monthlyBudget,
          expensesThisMonth: totalExpenses,
          lastMonthComparison: 0, // You can implement this based on previous month data
          topCategories,
          recentExpenses: recentExpenses.map(expense => ({
            id: expense.id,
            description: expense.description,
            amount: typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0,
            category: expense.category?.name || 'Uncategorized',
            date: new Date(expense.date).toLocaleDateString(),
            color: getCategoryColor(expense.category?.name || 'Uncategorized')
          }))
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
        // Set empty data on error
        setDashboardData({
          totalExpenses: 0,
          monthlyBudget: 0,
          expensesThisMonth: 0,
          lastMonthComparison: 0,
          topCategories: [],
          recentExpenses: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Food & Dining': '#10B981',
      'Transportation': '#06B6D4',
      'Shopping': '#8B5CF6',
      'Entertainment': '#F59E0B',
      'Utilities': '#EF4444',
      'Healthcare': '#EC4899',
      'Other': '#6B7280'
    };
    return colors[categoryName] || '#6B7280';
  };

  const budgetUsedPercentage = dashboardData.monthlyBudget > 0 
    ? (dashboardData.expensesThisMonth / dashboardData.monthlyBudget) * 100 
    : 0;

  const handleScanReceipt = () => {
    navigate('/scan-receipt');
  };

  const handleAddExpense = () => {
    navigate('/add-expense');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-flux-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-flux-gradient p-6 rounded-b-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
              {user?.profile_image ? (
                <img 
                  src={user.profile_image} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-xl object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-white to-white/80 rounded-xl flex items-center justify-center text-flux-blue font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <h1 className="text-white text-xl font-semibold">{user?.name}</h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => toast.info('Notifications coming soon!')}
          >
            <Bell className="w-6 h-6" />
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="glass-card p-6 shadow-xl transform hover:scale-[1.02] transition-all duration-300">
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
              <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-lg">
                <span className="text-white text-sm font-semibold">
                  {Math.round(budgetUsedPercentage)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-white to-white/80 rounded-full h-2 transition-all duration-500 shadow-sm"
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
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-2xl py-6 rounded-2xl flex-col h-auto transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
          >
            <Scan className="w-8 h-8 text-flux-teal mb-2" />
            <span className="font-semibold">Scan Receipt</span>
          </Button>
          <Button 
            onClick={handleAddExpense}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-2xl py-6 rounded-2xl flex-col h-auto transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
          >
            <Plus className="w-8 h-8 text-flux-blue mb-2" />
            <span className="font-semibold">Add Expense</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-2xl border-gray-200 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-flux-green mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                ${dashboardData.totalExpenses.toFixed(2)}
              </h3>
              <p className="text-gray-600 text-sm">Total Expenses</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-gray-200 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-flux-purple mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {dashboardData.recentExpenses.length}
              </h3>
              <p className="text-gray-600 text-sm">Recent Expenses</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Categories */}
      {dashboardData.topCategories.length > 0 && (
        <div className="px-6 mb-6">
          <Card className="rounded-2xl border-gray-200 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-gray-900">Top Categories</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/reports')}
                  className="text-flux-blue hover:bg-flux-blue/10"
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
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-gray-700 font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-semibold">${category.amount.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Expenses */}
      {dashboardData.recentExpenses.length > 0 && (
        <div className="px-6 mb-6">
          <Card className="rounded-2xl border-gray-200 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-gray-900">Recent Expenses</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/expenses')}
                  className="text-flux-blue hover:bg-flux-blue/10"
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full shadow-lg"
                      style={{ backgroundColor: expense.color }}
                    />
                    <div>
                      <p className="text-gray-900 font-medium">{expense.description}</p>
                      <p className="text-gray-500 text-sm">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-semibold">${expense.amount.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">{expense.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-2xl">
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
            className="flex-col text-gray-600 hover:text-flux-blue transition-colors duration-200"
          >
            <Receipt className="w-5 h-5 mb-1" />
            <span className="text-xs">Expenses</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/reports')}
            className="flex-col text-gray-600 hover:text-flux-blue transition-colors duration-200"
          >
            <PieChart className="w-5 h-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="flex-col text-gray-600 hover:text-flux-blue transition-colors duration-200"
          >
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt="Profile" 
                className="w-5 h-5 mb-1 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 mb-1 bg-flux-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
