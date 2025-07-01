import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const SignupScreen = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      toast.success('Account created successfully!');
      navigate('/onboarding');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0px 0px 20px rgba(212, 191, 170, 0.5)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#D4BFAA]/20 to-[#FAF9F6] flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('/eco-texture.png')] opacity-10"></div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D4BFAA]/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              scale: [0, 1, 0],
              x: Math.random() * 50 - 25,
              y: Math.random() * 50 - 25
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-6 z-10"
        variants={itemVariants}
      >
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full text-[#1C1C1C] hover:bg-[#D4BFAA]/20"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-[#046307] font-poppins">Sign Up</h1>
        <div className="w-10"></div>
      </motion.div>

      {/* Logo */}
      <motion.div 
        className="text-center py-6 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img 
          src="/lovable-uploads/cd0516f4-b5f7-4e97-b365-3050542eb677.png" 
          alt="FluxPense" 
          className="w-24 h-24 mx-auto mb-4 drop-shadow-xl"
          variants={itemVariants}
        />
        <motion.h2 
          className="text-3xl font-bold text-[#046307] font-poppins tracking-tight"
          variants={itemVariants}
        >
          Create Account
        </motion.h2>
        <motion.p 
          className="text-[#1C1C1C]/80 mt-2 max-w-md mx-auto"
          variants={itemVariants}
        >
          Embark on your journey to smarter, sustainable expense management
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.div 
        className="flex-1 px-6 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="name" className="text-[#1C1C1C] font-medium">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="pl-12 py-6 rounded-2xl border-[#D4BFAA]/30 focus:border-[#D4BFAA] bg-[#FAF9F6] text-[#1C1C1C] shadow-sm"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4BFAA]" />
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="email" className="text-[#1C1C1C] font-medium">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-12 py-6 rounded-2xl border-[#D4BFAA]/30 focus:border-[#D4BFAA] bg-[#FAF9F6] text-[#1C1C1C] shadow-sm"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4BFAA]" />
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="password" className="text-[#1C1C1C] font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pl-12 pr-12 py-6 rounded-2xl border-[#D4BFAA]/30 focus:border-[#D4BFAA] bg-[#FAF9F6] text-[#1C1C1C] shadow-sm"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4BFAA]" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-[#D4BFAA] hover:bg-[#D4BFAA]/10"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-[#1C1C1C]/60">Password must be at least 6 characters</p>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Button 
              type="submit" 
              className="w-full bg-[#D4BFAA] hover:bg-[#D4BFAA]/80 text-[#046307] font-semibold py-6 rounded-2xl text-lg shadow-lg border border-[#D4BFAA]/50"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Bottom link */}
      <motion.div 
        className="p-6 text-center z-10"
        variants={itemVariants}
      >
        <p className="text-[#1C1C1C]/80">
          Already have an account?{' '}
          <Button 
            variant="link" 
            className="text-[#046307] font-semibold p-0 hover:text-[#046307]/80"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupScreen;