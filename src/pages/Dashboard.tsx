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
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching dashboard data...');
        setIsLoading(true);
        
        // Fetch expenses with timeout
        const expensesPromise = Promise.race([
          expenseService.getAll(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Expenses request timeout')), 10000)
          )
        ]);

        // Fetch budgets with timeout  
        const budgetsPromise = Promise.race([
          budgetService.getAll(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Budgets request timeout')), 10000)
          )
        ]);

        const [expenses, budgets] = await Promise.allSettled([expensesPromise, budgetsPromise]);
        
        console.log('API responses:', { expenses, budgets });

        // Handle expenses
        let recentExpenses = [];
        if (expenses.status === 'fulfilled' && Array.isArray(expenses.value)) {
          recentExpenses = expenses.value.slice(0, 4);
        } else {
          console.warn('Failed to fetch expenses:', expenses.status === 'rejected' ? expenses.reason : 'Invalid response');
        }

        // Handle budgets
        let budgetList = [];
        if (budgets.status === 'fulfilled' && Array.isArray(budgets.value)) {
          budgetList = budgets.value;
        } else {
          console.warn('Failed to fetch budgets:', budgets.status === 'rejected' ? budgets.reason : 'Invalid response');
        }

        const currentBudget = budgetList.find(b => {
          const budgetMonth = new Date(b.start_date).getMonth();
          const currentMonthNum = new Date().getMonth();
          return budgetMonth === currentMonthNum;
        });
        
        // Calculate totals with proper number handling
        const totalExpenses = recentExpenses.reduce((sum, expense) => {
          const amount = Number(expense.amount) || 0;
          return sum + amount;
        }, 0);
        
        const monthlyBudget = currentBudget ? (Number(currentBudget.amount) || 0) : 0;
        
        // Calculate category totals
        const categoryTotals: { [key: string]: number } = {};
        recentExpenses.forEach(expense => {
          const categoryName = expense.category?.name || 'Uncategorized';
          const amount = Number(expense.amount) || 0;
          categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
        });
        
        const topCategories = Object.entries(categoryTotals)
          .map(([name, amount]) => ({
            name,
            amount: Number(amount) || 0,
            color: getCategoryColor(name),
            percentage: totalExpenses > 0 ? Math.round((Number(amount) / totalExpenses) * 100) : 0
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 4);
        
        setDashboardData({
          totalExpenses,
          monthlyBudget,
          expensesThisMonth: totalExpenses,
          lastMonthComparison: 0,
          topCategories,
          recentExpenses: recentExpenses.map(expense => ({
            id: expense.id,
            description: expense.description,
            amount: Number(expense.amount) || 0,
            category: expense.category?.name || 'Uncategorized',
            date: new Date(expense.date).toLocaleDateString(),
            color: getCategoryColor(expense.category?.name || 'Uncategorized')
          }))
        });

        console.log('Dashboard data set successfully');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
        // Set empty data on error to ensure UI still renders
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
        console.log('Dashboard loading completed');
      }
    };

    fetchDashboardData();
  }, [user]);

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Food & Dining': '#046307', // Emerald
      'Shopping': '#D4BFAA', // Champagne
      'Utilities': '#1C1C1C', // Charcoal
      'Other': '#FAF9F6', // Ivory
    };
    return colors[categoryName] || '#046307'; // Default to Emerald
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
      <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald mx-auto mb-4"></div>
          <p className="text-champagne">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne pb-20">
      {/* Header */}
      <div className="bg-emerald-champagne-gradient p-6 rounded-b-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-champagne/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
              {user?.profile_image ? (
                <img 
                  src={user.profile_image} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-xl object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-ivory to-champagne rounded-xl flex items-center justify-center text-emerald font-bold text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-champagne text-sm">Welcome</p>
              <h1 className="text-ivory text-xl font-semibold">{user?.email}</h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-ivory hover:bg-champagne/20 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => toast.info('Notifications coming soon!')}
          >
            <Bell className="w-6 h-6" />
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="glass-card p-6 shadow-xl transform hover:scale-[1.02] transition-all duration-300 bg-charcoal/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-champagne text-sm">{currentMonth} Budget</p>
              <h2 className="text-emerald text-2xl font-bold">
                ${dashboardData.expensesThisMonth.toFixed(2)}
              </h2>
              <p className="text-champagne text-sm">
                of ${dashboardData.monthlyBudget.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-champagne text-sm mb-1">
                {dashboardData.lastMonthComparison > 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(dashboardData.lastMonthComparison)}% vs last month
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-champagne/30 flex items-center justify-center bg-champagne/10 backdrop-blur-sm shadow-lg">
                <span className="text-emerald text-sm font-semibold">
                  {Math.round(budgetUsedPercentage)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-champagne/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald to-champagne rounded-full h-2 transition-all duration-500 shadow-sm"
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
            className="bg-ivory hover:bg-champagne text-charcoal border border-champagne shadow-2xl py-6 rounded-2xl flex-col h-auto transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
          >
            <Scan className="w-8 h-8 text-emerald mb-2" />
            <span className="font-semibold">Scan Receipt</span>
          </Button>
          <Button 
            onClick={handleAddExpense}
            className="bg-ivory hover:bg-champagne text-charcoal border border-champagne shadow-2xl py-6 rounded-2xl flex-col h-auto transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
          >
            <Plus className="w-8 h-8 text-champagne mb-2" />
            <span className="font-semibold">Add Expense</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-2xl border-champagne shadow-2xl transform hover:scale-105 transition-all duration-300 bg-ivory">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-emerald mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-charcoal">
                ${dashboardData.totalExpenses.toFixed(2)}
              </h3>
              <p className="text-champagne text-sm">Total Expenses</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-champagne shadow-2xl transform hover:scale-105 transition-all duration-300 bg-ivory">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-champagne mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-charcoal">
                {dashboardData.recentExpenses.length}
              </h3>
              <p className="text-champagne text-sm">Recent Expenses</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Categories */}
      {dashboardData.topCategories.length > 0 && (
        <div className="px-6 mb-6">
          <Card className="rounded-2xl border-champagne shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-ivory">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-charcoal">Top Categories</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/reports')}
                  className="text-emerald hover:bg-emerald/10"
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
                    <span className="text-charcoal font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-charcoal font-semibold">${category.amount.toFixed(2)}</p>
                    <p className="text-champagne text-sm">{category.percentage}%</p>
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
          <Card className="rounded-2xl border-champagne shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-ivory">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-charcoal">Recent Expenses</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/expenses')}
                  className="text-emerald hover:bg-emerald/10"
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between py-2 hover:bg-champagne/20 rounded-lg px-2 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full shadow-lg"
                      style={{ backgroundColor: expense.color }}
                    />
                    <div>
                      <p className="text-charcoal font-medium">{expense.description}</p>
                      <p className="text-champagne text-sm">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-charcoal font-semibold">${expense.amount.toFixed(2)}</p>
                    <p className="text-champagne text-sm">{expense.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {dashboardData.totalExpenses === 0 && (
        <div className="px-6 mb-6">
          <Card className="rounded-2xl border-champagne shadow-2xl bg-ivory">
            <CardContent className="p-8 text-center">
              <Receipt className="w-16 h-16 text-champagne mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">No expenses yet</h3>
              <p className="text-champagne mb-6">Start tracking your expenses by adding your first one or scanning a receipt.</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleAddExpense} className="bg-emerald-champagne-gradient text-ivory">
                  Add Expense
                </Button>
                <Button onClick={handleScanReceipt} variant="outline" className="border-emerald text-emerald">
                  Scan Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-ivory border-t border-champagne px-6 py-4 shadow-2xl">
        <div className="max-w-sm mx-auto flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-col text-emerald"
          >
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/expenses')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            <Receipt className="w-5 h-5 mb-1" />
            <span className="text-xs">Expenses</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/reports')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            <PieChart className="w-5 h-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt="Profile" 
                className="w-5 h-5 mb-1 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 mb-1 bg-emerald rounded-full flex items-center justify-center text-ivory text-xs font-bold">
                {user?.email?.charAt(0).toUpperCase()}
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
