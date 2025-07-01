import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scan, BarChart3, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Scan className="w-8 h-8 text-[#D4BFAA]" />,
      title: "Smart Receipt Scanning",
      description: "Effortlessly capture receipts by snapping a photo or forwarding an email—our AI extracts every detail seamlessly."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#D4BFAA]" />,
      title: "Intelligent Reports",
      description: "Gain deep insights into your spending with visually stunning, actionable reports tailored to your needs."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#D4BFAA]" />,
      title: "Mobile-First Design",
      description: "Manage expenses anywhere with our sleek, intuitive mobile interface designed for your convenience."
    }
  ];

  // Animation variants for elements
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

      {/* Header with logo */}
      <motion.div 
        className="text-center pt-16 pb-8 z-10"
        variants={itemVariants}
      >
        <motion.img 
          src="/lovable-uploads/5b103922-ab06-4207-98ab-d9a7e512210f.png" 
          alt="FluxPense" 
          className="w-28 h-28 mx-auto mb-4 drop-shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.h1 
          className="text-4xl font-bold text-[#046307] font-poppins mb-2 tracking-tight"
          variants={itemVariants}
        >
          Welcome to FluxPense
        </motion.h1>
        <motion.p 
          className="text-[#1C1C1C] text-lg px-6 max-w-md mx-auto"
          variants={itemVariants}
        >
          The smartest way to manage your expenses with elegance
        </motion.p>
      </motion.div>

      {/* Hero image */}
      <motion.div 
        className="flex-1 px-6 py-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-[#FAF9F6] rounded-3xl p-6 shadow-2xl mb-8 border border-[#D4BFAA]/30"
          variants={itemVariants}
        >
          <img 
            src="/lovable-uploads/7d707674-b0bd-4941-beb5-73f881edfaae.png" 
            alt="Mobile expense tracking" 
            className="w-full h-56 object-cover rounded-2xl"
          />
        </motion.div>

        {/* Features */}
        <motion.div 
          className="space-y-6 mb-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-start space-x-4"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#FAF9F6] rounded-2xl flex items-center justify-center shadow-lg border border-[#D4BFAA]/20">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1C1C1C] mb-1 text-lg">{feature.title}</h3>
                <p className="text-[#1C1C1C]/80 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="p-6 space-y-4 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={buttonVariants}>
          <Button 
            onClick={() => navigate('/signup')}
            className="w-full bg-[#D4BFAA] hover:bg-[#D4BFAA]/80 text-[#046307] font-semibold py-4 rounded-2xl text-lg shadow-lg border border-[#D4BFAA]/50"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
        <motion.div variants={buttonVariants}>
          <Button 
            onClick={() => navigate('/login')}
            variant="ghost" 
            className="w-full text-[#1C1C1C] font-medium py-4 rounded-2xl text-lg hover:bg-[#D4BFAA]/10"
          >
            Already have an account? Sign In
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;