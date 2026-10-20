'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={handleClick}
      className={`fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-bg-deep-start/75 text-white/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-blue/50 hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/60 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};

export default BackToTop;
