
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Sign In</h1>
        <div className="w-10"></div>
      </div>

      {/* Logo */}
      <div className="text-center py-8">
        <img 
          src="/lovable-uploads/ef560c48-a4e6-4cad-8df7-4f7a9a9b36ec.png" 
          alt="FluxPense" 
          className="w-20 h-20 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold flux-gradient-text font-poppins">
          Welcome Back
        </h2>
        <p className="text-gray-600 mt-2">Sign in to continue tracking your expenses</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-12 py-6 rounded-2xl border-gray-200 focus:border-flux-blue"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pl-12 pr-12 py-6 rounded-2xl border-gray-200 focus:border-flux-blue"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-flux-gradient hover:opacity-90 text-white font-semibold py-6 rounded-2xl text-lg shadow-lg mt-8"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center mt-8">
          <Button 
            variant="link" 
            className="text-flux-blue font-medium"
            onClick={() => toast.info('Password reset coming soon!')}
          >
            Forgot Password?
          </Button>
        </div>
      </div>

      {/* Bottom link */}
      <div className="p-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Button 
            variant="link" 
            className="text-flux-blue font-semibold p-0"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
