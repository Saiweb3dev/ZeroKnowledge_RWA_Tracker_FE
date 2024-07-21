import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button'; // Adjust the import path as necessary

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationCompleteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const triggerConfetti = () => {
        const end = Date.now() + 2 * 1000; // 3 seconds
        const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

        const frame = () => {
          if (Date.now() > end) return;

          // Left side confetti
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });

          // Right side confetti
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });

          requestAnimationFrame(frame);
        };

        frame();
      };

      triggerConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative bg-white p-6 rounded-lg space-y-4 animate-fadeIn z-10">
        <div className="checkmark-container w-20 h-20 mx-auto">
          <svg className="checkmark w-full h-full" viewBox="0 0 64 64">
            <polyline points="16 34 32 52 56 26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="stroke-current text-green-500"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-center">Verification Complete!</h2>
        <Button onClick={onClose} className="w-full">
          Go to Results
        </Button>
      </div>
    </div>
  );
};

export default VerificationCompleteModal;