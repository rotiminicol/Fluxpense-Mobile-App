
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Settings, LogOut, TrendingUp, Receipt, PieChart } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/welcome');
  };

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
        <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* User Info */}
        <Card className="rounded-2xl border-gray-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-flux-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <span className="inline-block px-3 py-1 bg-flux-gradient/10 text-flux-blue rounded-full text-sm font-medium">
              {user?.account_type} Account
            </span>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          <Button 
            variant="ghost"
            className="w-full justify-start p-6 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50"
            onClick={() => toast.info('Settings coming soon!')}
          >
            <Settings className="w-5 h-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Settings</span>
          </Button>

          <Button 
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start p-6 rounded-2xl border border-gray-200 bg-white hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
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
            onClick={() => navigate('/reports')}
            className="flex-col text-gray-600"
          >
            <PieChart className="w-5 h-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-col text-flux-blue"
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

export default Profile;
