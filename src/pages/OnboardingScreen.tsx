import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, Scan, BarChart3, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      icon: <Scan className="w-16 h-16 text-[#D4BFAA]" />,
      title: "Smart Receipt Scanning",
      description: "Effortlessly capture receipts by snapping a photo or emailing them to FluxPense. Our AI seamlessly extracts details like amount, merchant, date, and category.",
      image: "/lovable-uploads/bcf41ada-1463-4955-adfb-5c01d7fccd03.png"
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-[#D4BFAA]" />,
      title: "Intelligent Analytics",
      description: "Unlock deep insights into your spending with stunning, actionable charts and reports tailored to empower your financial decisions.",
      image: "/lovable-uploads/56d13fa2-8591-47c0-ae7f-888f32be8e07.png"
    },
    {
      icon: <Shield className="w-16 h-16 text-[#D4BFAA]" />,
      title: "Secure & Private",
      description: "Rest assured with bank-level encryption and secure cloud storage, keeping your financial data safe and private.",
      image: "/lovable-uploads/1b071249-3f59-431d-9d96-a3db71dbf0e1.png"
    },
    {
      icon: <Zap className="w-16 h-16 text-[#D4BFAA]" />,
      title: "Ready to Begin?",
      description: "You're all set to take control of your finances with FluxPense's powerful, elegant features. Start your journey now!",
      image: "/lovable-uploads/5638dd90-8593-4b3e-8cd8-e51eecbcde58.png"
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    updateUser({ onboarding_complete: true });
    toast.success('Welcome to FluxPense!');
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 100);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

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
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-[#046307]' : 'bg-[#D4BFAA]/50'
              }`}
            />
          ))}
        </div>
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-[#1C1C1C] hover:text-[#046307] hover:bg-[#D4BFAA]/20"
        >
          Skip
        </Button>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="flex-1 px-6 py-8 flex flex-col items-center text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          {currentStepData.icon}
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full max-w-sm mb-8"
          variants={itemVariants}
        >
          <img 
            src={currentStepData.image}
            alt={currentStepData.title}
            className="w-full h-56 object-cover rounded-3xl shadow-2xl border border-[#D4BFAA]/30"
          />
        </motion.div>

        {/* Text content */}
        <motion.div 
          className="flex-1 flex flex-col justify-center max-w-md"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-[#046307] mb-4 font-poppins tracking-tight"
            variants={itemVariants}
          >
            {currentStepData.title}
          </motion.h2>
          <motion.p 
            className="text-[#1C1C1C]/80 leading-relaxed text-lg px-4"
            variants={itemVariants}
          >
            {currentStepData.description}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="p-6 z-10"
        variants={buttonVariants}
      >
        <Button 
          onClick={handleNext}
          className="w-full bg-[#D4BFAA] hover:bg-[#D4BFAA]/80 text-[#046307] font-semibold py-6 rounded-2xl text-lg shadow-lg border border-[#D4BFAA]/50 flex items-center justify-center"
        >
          {currentStep < onboardingSteps.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            'Get Started'
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingScreen;