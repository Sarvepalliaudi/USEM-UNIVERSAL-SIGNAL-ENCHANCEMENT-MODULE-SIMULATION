import React from 'react';
import { X } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-base-dark/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-base-light border border-primary/30 rounded-lg shadow-glow-primary w-full max-w-2xl max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        <header className="p-4 border-b border-primary/20 flex justify-between items-center sticky top-0 bg-base-light z-10">
          <h2 className="text-xl font-bold text-primary">How to Use This Simulation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto space-y-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">This app demonstrates the power of the USEM module. Follow these steps:</h3>
          </div>
          <ol className="list-decimal list-inside space-y-4 text-gray-400">
            <li>
                <span className="font-semibold text-gray-200">Observe the Initial State:</span>
                <p className="mt-1 pl-2">When the app loads, you'll see a weak, unstable signal on the chart (top left). The network metrics for Latency, Download, and Upload will show poor performance. This is the "before" picture.</p>
            </li>
            <li>
                <span className="font-semibold text-gray-200">Activate the USEM Boost:</span>
                <p className="mt-1 pl-2">In the "Control & Status" panel on the right, click the <span className="text-primary font-bold">BOOST SIGNAL</span> button. This simulates turning on the USEM module.</p>
            </li>
            <li>
                <span className="font-semibold text-gray-200">See the Enhanced Results:</span>
                <p className="mt-1 pl-2">Watch the signal strength on the chart jump up and stabilize. The network metrics will dramatically improve, showing a fast and responsive connection. This is the "after" picture, showing the module's effectiveness.</p>
            </li>
            <li>
                <span className="font-semibold text-gray-200">Run an AI Security Analysis:</span>
                <p className="mt-1 pl-2">At the bottom right, click the <span className="text-secondary font-bold">ANALYZE THREATS</span> button. This demonstrates the embedded AI cybersecurity feature, which provides real-time, actionable security tips.</p>
            </li>
            <li>
                <span className="font-semibold text-gray-200">Learn More:</span>
                <p className="mt-1 pl-2">Click the <span className="text-primary font-bold">(i)</span> icon in the header at any time to read the detailed project description and credits.</p>
            </li>
          </ol>
        </main>
      </div>
    </div>
  );
};

export default GuideModal;
