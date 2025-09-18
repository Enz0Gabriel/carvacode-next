import dynamic from 'next/dynamic';
import React from 'react';

// Dinamically load the client component to ensure SSR is disabled
const ThreeDemoClient = dynamic(() => import('./ThreeDemo.client'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-transparent" />
    </div>
  ),
});

const ThreeDemoWrapper: React.FC<{ className?: string }> = ({ className }) => {
  return <ThreeDemoClient className={className} />;
};

export default ThreeDemoWrapper;