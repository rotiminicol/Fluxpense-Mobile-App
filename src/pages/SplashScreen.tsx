import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showContinue, setShowContinue] = useState(false);

  // Show continue button after 2 seconds for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/welcome');
  };

  // Animation variants for the button
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

  // Animation variants for the logo
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1,
        ease: 'easeOut'
      }
    }
  };

  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#046307] via-[#1C1C1C] to-[#046307] flex flex-col items-center justify-between py-12 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('/eco-texture.png')] opacity-10"></div>
      
      {/* Floating particles with Champagne Gold accents */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#D4BFAA]/40 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center flex-col z-10">
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <img 
            src="/lovable-uploads/cd0516f4-b5f7-4e97-b365-3050542eb677.png" 
            alt="FluxPense Logo" 
            className="w-40 h-40 mx-auto mb-6 drop-shadow-2xl"
          />
        </motion.div>
        
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl font-bold text-[#FAF9F6] mb-3 font-poppins tracking-tight"
        >
          FluxPense
        </motion.h1>
        
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-[#D4BFAA] text-xl font-light mb-8 max-w-md text-center"
        >
          Smart Expense Management for a Sustainable Future
        </motion.p>
      </div>

      {/* Continue button at bottom */}
      <div className="pb-8 z-10 w-full max-w-lg px-4">
        <AnimatePresence>
          {showContinue ? (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Button 
                onClick={handleContinue}
                className="w-full bg-[#D4BFAA] hover:bg-[#D4BFAA]/80 text-[#046307] border border-[#D4BFAA]/50 py-4 rounded-full text-lg font-semibold backdrop-blur-md transition-all duration-300"
              >
                Begin Your Journey
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="w-10 h-10 border-3 border-[#D4BFAA]/30 border-t-[#D4BFAA] rounded-full animate-spin mx-auto"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SplashScreen;