import React, { useState, useEffect, useCallback } from 'react';
import { SignalChart } from './components/SignalChart';
import { MetricCard } from './components/MetricCard';
import { WifiIcon, ShieldIcon, ZapIcon, BrainCircuitIcon } from './components/icons';
import type { SignalDataPoint, NetworkMetrics } from './types';
import { SecurityStatus } from './types';
import { getSecurityAnalysis } from './services/geminiService';
import { BarChart, ArrowDown, ArrowUp, Info, HelpCircle } from 'lucide-react';
import AboutModal from './components/AboutModal';
import GuideModal from './components/GuideModal';

const MAX_DATA_POINTS = 50;

const App: React.FC = () => {
  const [signalData, setSignalData] = useState<SignalDataPoint[]>([]);
  const [isBoosted, setIsBoosted] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [metrics, setMetrics] = useState<NetworkMetrics>({ latency: 0, download: 0, upload: 0 });
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>(SecurityStatus.SECURE);
  const [securityAnalysis, setSecurityAnalysis] = useState<string>('');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const generateRandomValue = (base: number, range: number) => base + (Math.random() - 0.5) * range;

  const updateSignal = useCallback(() => {
    const baseStrength = isBoosted ? -45 : -80;
    const strengthRange = isBoosted ? 10 : 25;
    const newStrength = generateRandomValue(baseStrength, strengthRange);

    const newPoint: SignalDataPoint = {
      time: Date.now(),
      strength: parseFloat(newStrength.toFixed(2)),
    };

    setSignalData(prevData => {
      const newData = [...prevData, newPoint];
      return newData.length > MAX_DATA_POINTS ? newData.slice(newData.length - MAX_DATA_POINTS) : newData;
    });

    const baseLatency = isBoosted ? 20 : 150;
    const latencyRange = isBoosted ? 15 : 80;
    const newLatency = generateRandomValue(baseLatency, latencyRange);

    const baseDownload = isBoosted ? 150 : 20;
    const downloadRange = isBoosted ? 50 : 15;
    const newDownload = generateRandomValue(baseDownload, downloadRange);

    const baseUpload = isBoosted ? 50 : 5;
    const uploadRange = isBoosted ? 20 : 4;
    const newUpload = generateRandomValue(baseUpload, uploadRange);

    setMetrics({
      latency: Math.max(5, parseFloat(newLatency.toFixed(0))),
      download: Math.max(1, parseFloat(newDownload.toFixed(1))),
      upload: Math.max(0.5, parseFloat(newUpload.toFixed(1))),
    });

  }, [isBoosted]);

  useEffect(() => {
    const interval = setInterval(updateSignal, 1500);
    return () => clearInterval(interval);
  }, [updateSignal]);

  const handleBoost = () => {
    if (isBoosted || isBoosting) return;
    setIsBoosting(true);
    setTimeout(() => {
      setIsBoosted(true);
      setIsBoosting(false);
    }, 3000);
  };
  
  const handleAnalyzeThreats = async () => {
    setSecurityStatus(SecurityStatus.ANALYZING);
    setSecurityAnalysis('Fetching AI-powered threat analysis...');
    const analysis = await getSecurityAnalysis();
    setSecurityAnalysis(analysis);
    setSecurityStatus(SecurityStatus.SECURE); 
  };
  
  const getSecurityUI = () => {
    switch (securityStatus) {
        case SecurityStatus.SECURE:
            return { color: 'text-accent-green', shadow: 'shadow-glow-green', text: 'SYSTEM SECURE' };
        case SecurityStatus.SCANNING:
            return { color: 'text-secondary', shadow: 'shadow-glow-primary', text: 'SCANNING...' };
        case SecurityStatus.ANALYZING:
            return { color: 'text-secondary', shadow: 'shadow-glow-primary', text: 'ANALYZING...' };
        case SecurityStatus.VULNERABLE:
            return { color: 'text-accent-red', shadow: 'shadow-glow-red', text: 'VULNERABLE' };
        default:
            return { color: 'text-gray-400', shadow: '', text: 'UNKNOWN' };
    }
  };

  const securityUI = getSecurityUI();

  return (
    <div className="min-h-screen bg-base-dark bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,255,0.3),rgba(255,255,255,0))] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <ZapIcon className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-white">
              U S E M
            </h1>
            <div className="flex items-center space-x-2 border-l border-primary/20 pl-4">
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="About this project"
              >
                <Info className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsGuideModalOpen(true)}
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="How to use"
              >
                <HelpCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-sm font-light text-primary tracking-widest">UNIVERSAL SIGNAL ENHANCEMENT MODULE</h2>
            <p className="text-xs text-gray-400">Cyber Defense & Secure Communication Interface</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SignalChart data={signalData} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard label="Latency" value={String(metrics.latency)} unit="ms">
                <BarChart className="w-8 h-8" />
              </MetricCard>
               <MetricCard label="Download" value={String(metrics.download)} unit="Mbps">
                <ArrowDown className="w-8 h-8" />
              </MetricCard>
               <MetricCard label="Upload" value={String(metrics.upload)} unit="Mbps">
                <ArrowUp className="w-8 h-8" />
              </MetricCard>
            </div>
          </div>

          <div className="lg:col-span-1 bg-base-light/50 p-6 rounded-lg border border-primary/20 backdrop-blur-sm flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Control & Status</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg flex items-center justify-between border ${securityUI.shadow} transition-all duration-300 border-primary/30`}>
                  <div className="flex items-center space-x-3">
                    <ShieldIcon className={`w-6 h-6 ${securityUI.color}`} />
                    <span className={`font-bold text-lg tracking-wider ${securityUI.color}`}>{securityUI.text}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleBoost}
                  disabled={isBoosted || isBoosting}
                  className="w-full flex items-center justify-center space-x-3 text-lg font-bold p-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-base-dark hover:bg-white enabled:hover:shadow-glow-primary"
                >
                  <ZapIcon className="w-6 h-6"/>
                  <span>
                    {isBoosting ? 'OPTIMIZING...' : (isBoosted ? 'ENHANCEMENT ACTIVE' : 'BOOST SIGNAL')}
                  </span>
                </button>
                 {isBoosting && (
                    <div className="w-full bg-primary/20 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]" style={{ width: '100%', animationName: 'progress' }}></div>
                      <style>{`
                        @keyframes progress {
                          0% { width: 0%; }
                          100% { width: 100%; }
                        }
                      `}</style>
                    </div>
                 )}
              </div>
            </div>
            
            <div className="bg-base-dark/50 p-4 rounded-lg border border-primary/10">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <BrainCircuitIcon className="w-6 h-6 text-primary"/>
                    <span>AI Threat Analysis</span>
                </h4>
                <div className="text-sm text-gray-300 whitespace-pre-wrap font-mono h-48 overflow-y-auto pr-2">
                  {securityAnalysis || 'Click "Analyze Threats" to get an AI-powered security briefing.'}
                </div>
                <button
                    onClick={handleAnalyzeThreats}
                    disabled={securityStatus === SecurityStatus.ANALYZING}
                    className="w-full mt-4 text-sm font-semibold p-2 rounded-lg transition-all duration-300 disabled:opacity-50 bg-secondary/80 text-white hover:bg-secondary enabled:hover:shadow-glow-primary"
                >
                    {securityStatus === SecurityStatus.ANALYZING ? 'ANALYZING...' : 'ANALYZE THREATS'}
                </button>
            </div>
          </div>
        </main>
      </div>
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
    </div>
  );
};

export default App;
