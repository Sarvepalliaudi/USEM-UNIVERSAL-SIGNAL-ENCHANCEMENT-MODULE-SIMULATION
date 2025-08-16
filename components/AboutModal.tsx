import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-base-dark/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-base-light border border-primary/30 rounded-lg shadow-glow-primary w-full max-w-3xl max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        <header className="p-4 border-b border-primary/20 flex justify-between items-center sticky top-0 bg-base-light z-10">
          <h2 className="text-xl font-bold text-primary">About USEM Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto space-y-4 text-gray-300">
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">1. Title of Innovation</h3>
            <p className="text-gray-400">USEM: Universal Signal Enhancement Module for Cyber Defense and Secure Communication in MSME Ecosystems</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">2. Concept and Objective</h3>
            <p className="text-gray-400">USEM aims to provide MSMEs with a compact, cost-effective hardware module that enhances mobile and wireless signals while embedding cybersecurity features. It enables secure, real-time communication and internet reliability in remote or low-signal environments. The module incorporates AI for adaptive signal correction and threat detection, making it ideal for defense, surveillance, and field operations. The core objective is to boost signal integrity and security for digitally evolving MSMEs.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">3. Coverage of Innovation</h3>
            <p className="text-gray-400">The innovation covers the domains of telecommunication enhancement, cyber threat mitigation, and AI-enabled signal management. USEM can be integrated into laptops, desktops, and IoT devices, supporting secure communications in various sectors such as defense, smart agriculture, disaster recovery, and remote healthcare. It bridges the gap between communication reliability and cybersecurity using a unified module.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">4. Uniqueness</h3>
            <p className="text-gray-400">USEM uniquely combines signal enhancement hardware with embedded cybersecurity protocols and AI-based optimization in a single unit. Unlike existing boosters or VPN devices, USEM is compact, printable, and universally compatible. Its ability to function in remote, high-risk, or infrastructure-deficient areas makes it particularly suitable for MSMEs and field units requiring mobile digital resilience.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">5. Potential Areas of Application</h3>
            <p className="text-gray-400">Cybersecurity field operations, surveillance infrastructure, MSME digital tools, remote education, smart farming, emergency disaster services, telemedicine in rural zones, drone/UAV communications, and real-time industrial data transfers.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">6. Market Potential</h3>
            <p className="text-gray-400">With over 63 million MSMEs in India and increasing global demand for secure digital transformation, USEM has high market potential. It caters to a niche where secure communication and signal reliability intersect. Its affordability and ease of deployment offer mass adoption potential, especially in emerging markets.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">7. Prototype and Technology Stack</h3>
            <p className="text-gray-400">The prototype is developed using Python and simulates signal strength monitoring, anomaly detection, and VPN tunnel initiation. It can be extended using microcontrollers like ESP32 or Raspberry Pi with a PCB layout for antenna array and signal processing. The software stack includes Python for simulation, Tkinter (optional GUI), PySerial for hardware integration, and Scapy for packet analysis.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-primary mb-1">8. Outcome as Student</h3>
            <p className="text-gray-400">This being my second hackathon, I was moved from idea-based participation to real-time simulation. The project reflects my growth in handling end-to-end development, from concept to prototype. As students from cybersecurity and AI backgrounds, this project allowed me to apply interdisciplinary skills, making us more confident in developing deployable solutions for real-world challenges.</p>
          </section>
        </main>
        <footer className="p-4 border-t border-primary/20 text-center text-sm text-gray-500 mt-auto sticky bottom-0 bg-base-light z-10">
            <p className="font-semibold">Project by: AUDI SIVA BHANUVARDHAN SARVEPALLI</p>
            <p>DHANALAKSHMI SRINIVASAN UNIVERSITY, TRICHY, 621112</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutModal;
