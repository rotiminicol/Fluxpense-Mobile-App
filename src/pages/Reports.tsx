import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Receipt, PieChart, Calendar } from 'lucide-react';

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      <div className="flex items-center justify-between p-6 bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6">
        <Card className="rounded-2xl border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Reports Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Detailed reports and analytics will be available soon!</p>
          </CardContent>
        </Card>
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
            onClick={() => navigate('/expenses')}
            className="flex-col text-gray-600"
          >
            <Receipt className="w-5 h-5 mb-1" />
            <span className="text-xs">Expenses</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-col text-emerald"
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

export default Reports;
