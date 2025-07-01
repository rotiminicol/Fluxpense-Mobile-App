import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Settings, LogOut, TrendingUp, Receipt, PieChart, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/welcome');
  };

  const handleAvatarClick = () => {
    toast.info('Avatar upload coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      <div className="flex items-center justify-between p-6 bg-white shadow-lg rounded-b-3xl">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* User Info */}
        <Card className="rounded-2xl border-gray-200 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-20 h-20 mx-auto shadow-xl">
                <AvatarImage src={user?.profile_image} alt={user?.name} />
                <AvatarFallback className="bg-emerald-champagne-gradient text-ivory text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                onClick={handleAvatarClick}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald hover:bg-emerald/90 shadow-lg transform hover:scale-110 transition-all duration-300"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <span className="inline-block px-3 py-1 bg-emerald-champagne-gradient/10 text-emerald rounded-full text-sm font-medium shadow-lg">
              {user?.account_type} Account
            </span>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          <Button 
            variant="ghost"
            className="w-full justify-start p-6 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            onClick={() => toast.info('Settings coming soon!')}
          >
            <Settings className="w-5 h-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Settings</span>
          </Button>

          <Button 
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start p-6 rounded-2xl border border-gray-200 bg-white hover:bg-red-50 text-red-600 shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-2xl">
        <div className="max-w-sm mx-auto flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
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
            className="flex-col text-emerald"
          >
            <Avatar className="w-5 h-5 mb-1">
              <AvatarImage src={user?.profile_image} alt={user?.name} />
              <AvatarFallback className="bg-emerald text-ivory text-xs">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
