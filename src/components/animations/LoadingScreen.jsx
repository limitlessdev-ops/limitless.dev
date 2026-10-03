import { useEffect, useState } from 'react';
import TechText from '../TechText'; // Correct import path based on shadcn installation

const LoadingScreen = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds (faster)
    const fadeTimer = setTimeout(() => setIsFading(true), 2000);
    // Remove from DOM completely after 3 seconds
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-4xl md:text-6xl font-bold tracking-tighter">
         <TechText text="LIMITLESS DEV" color="#ffffff" accentColor="#ffffff" speed={2.5} />
      </div>
    </div>
  );
};

export default LoadingScreen;
