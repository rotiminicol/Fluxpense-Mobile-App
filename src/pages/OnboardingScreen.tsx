
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, Scan, BarChart3, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      icon: <Scan className="w-16 h-16 text-flux-teal" />,
      title: "Smart Receipt Scanning",
      description: "Simply take a photo of your receipt or email it to FluxPense. Our AI will automatically extract all the details including amount, merchant, date, and category.",
      image: "/lovable-uploads/bcf41ada-1463-4955-adfb-5c01d7fccd03.png"
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-flux-green" />,
      title: "Intelligent Analytics",
      description: "Get detailed insights into your spending patterns with beautiful charts and reports. Track your progress and make informed financial decisions.",
      image: "/lovable-uploads/56d13fa2-8591-47c0-ae7f-888f32be8e07.png"
    },
    {
      icon: <Shield className="w-16 h-16 text-flux-purple" />,
      title: "Secure & Private",
      description: "Your financial data is protected with bank-level security. All data is encrypted and stored securely in the cloud.",
      image: "/lovable-uploads/1b071249-3f59-431d-9d96-a3db71dbf0e1.png"
    },
    {
      icon: <Zap className="w-16 h-16 text-flux-blue" />,
      title: "Ready to Get Started?",
      description: "You're all set! Start tracking your expenses and take control of your finances with FluxPense's powerful features.",
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
    navigate('/dashboard');
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-flux-blue' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-gray-500"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-8 animate-fade-in">
          {currentStepData.icon}
        </div>

        {/* Image */}
        <div className="w-full max-w-xs mb-8 animate-slide-up">
          <img 
            src={currentStepData.image}
            alt={currentStepData.title}
            className="w-full h-48 object-cover rounded-3xl shadow-xl"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 flex flex-col justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg px-4">
            {currentStepData.description}
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6">
        <Button 
          onClick={handleNext}
          className="w-full bg-flux-gradient hover:opacity-90 text-white font-semibold py-6 rounded-2xl text-lg shadow-lg flex items-center justify-center"
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
      </div>
    </div>
  );
};

export default OnboardingScreen;
