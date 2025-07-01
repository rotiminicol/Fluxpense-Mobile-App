
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showContinue, setShowContinue] = useState(false);

  // Show continue button after 2 seconds for better UX
  useState(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const handleContinue = () => {
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-flux-gradient flex items-center justify-center relative overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 bg-cosmic opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main logo */}
      <div className="text-center z-10 animate-fade-in">
        <div className="mb-8 animate-logo-float">
          <img 
            src="/lovable-uploads/cd0516f4-b5f7-4e97-b365-3050542eb677.png" 
            alt="FluxPense Logo" 
            className="w-32 h-32 mx-auto mb-4 drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 font-poppins">
          FluxPense
        </h1>
        
        <p className="text-white/80 text-lg font-light mb-8">
          Smart Expense Management
        </p>
        
        {/* Continue button or loading indicator */}
        <div className="mt-12">
          {showContinue ? (
            <Button 
              onClick={handleContinue}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Continue
            </Button>
          ) : (
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
