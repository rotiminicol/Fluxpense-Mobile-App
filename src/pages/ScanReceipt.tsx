import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ScanReceipt = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-ivory shadow-lg rounded-b-3xl">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-champagne/40 transform hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-emerald" />
        </Button>
        <h1 className="text-xl font-semibold text-charcoal">Scan Receipt</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI-Powered Receipt Scanning Card */}
        <Card className="rounded-2xl border-champagne shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-ivory">
          <CardContent className="p-6 text-center">
            <div className="mb-4 animate-pulse-glow">
              <img 
                src="/lovable-uploads/5b103922-ab06-4207-98ab-d9a7e512210f.png" 
                alt="FluxPense Logo" 
                className="w-16 h-16 mx-auto mb-4 animate-bounce-subtle"
              />
            </div>
            <h3 className="text-lg font-semibold text-charcoal mb-2">AI-Powered Receipt Scanning</h3>
            <p className="text-champagne text-sm">
              Take a photo of your receipt and let our AI extract all the details automatically
            </p>
          </CardContent>
        </Card>

        {/* Scan Receipt Instructions */}
        <Card className="rounded-2xl border-champagne shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-ivory">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">How to Scan a Receipt</h3>
            <ul className="list-disc list-inside text-champagne text-sm space-y-2">
              <li>Make sure the receipt is well-lit and the text is clear.</li>
              <li>Place the receipt on a flat surface with a contrasting background.</li>
              <li>Position your camera directly above the receipt.</li>
              <li>Tap the button below to open your camera and take a photo.</li>
            </ul>
            <Button className="w-full bg-emerald hover:bg-emerald/90 text-ivory font-semibold py-3 rounded-2xl shadow-lg">
              Open Camera
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-ivory border-t border-champagne px-6 py-4 shadow-2xl">
        <div className="max-w-sm mx-auto flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-5 h-5 mb-1"><path d="m3 6 9 12 5-3 7 8"/><path d="M3 18h22"/><path d="M18 6v6h6"/></svg>
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/expenses')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt w-5 h-5 mb-1"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2Z"/><path d="M16 8h-6"/><path d="M16 12h-6"/><path d="M16 16h-6"/></svg>
            <span className="text-xs">Expenses</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/reports')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pie-chart w-5 h-5 mb-1"><path d="M21.21 15.89A10 10 0 1 1 8 2.79"/><path d="M22 12A10 10 0 0 0 12 2v10h10z"/></svg>
            <span className="text-xs">Reports</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="flex-col text-champagne hover:text-emerald transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-5 h-5 mb-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScanReceipt;
