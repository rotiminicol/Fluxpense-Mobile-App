
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
        
        <p className="text-white/80 text-lg font-light">
          Smart Expense Management
        </p>
        
        {/* Loading indicator */}
        <div className="mt-12">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
