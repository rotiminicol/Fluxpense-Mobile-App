
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Scan, BarChart3, Smartphone } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Scan className="w-8 h-8 text-flux-teal" />,
      title: "Smart Receipt Scanning",
      description: "Just snap a photo or email your receipts - we'll extract all the details automatically"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-flux-green" />,
      title: "Intelligent Reports",
      description: "Get insights into your spending patterns with beautiful, actionable reports"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-flux-purple" />,
      title: "Mobile-First Design",
      description: "Track expenses on the go with our intuitive mobile interface"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header with logo */}
      <div className="text-center pt-16 pb-8">
        <img 
          src="/lovable-uploads/5b103922-ab06-4207-98ab-d9a7e512210f.png" 
          alt="FluxPense" 
          className="w-24 h-24 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold flux-gradient-text font-poppins mb-2">
          Welcome to FluxPense
        </h1>
        <p className="text-gray-600 text-lg px-6">
          The smartest way to manage your expenses
        </p>
      </div>

      {/* Hero image */}
      <div className="flex-1 px-6 py-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-8">
          <img 
            src="/lovable-uploads/7d707674-b0bd-4941-beb5-73f881edfaae.png" 
            alt="Mobile expense tracking" 
            className="w-full h-48 object-cover rounded-2xl"
          />
        </div>

        {/* Features */}
        <div className="space-y-6 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 space-y-4">
        <Button 
          onClick={() => navigate('/signup')}
          className="w-full bg-flux-gradient hover:opacity-90 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        
        <Button 
          onClick={() => navigate('/login')}
          variant="ghost" 
          className="w-full text-gray-600 font-medium py-4 rounded-2xl text-lg"
        >
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
