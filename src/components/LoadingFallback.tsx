import React from 'react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white">
      {/* Sleek Minimal Spinner */}
      <div className="w-8 h-8 rounded-full border-2 border-[#E8E8EB] border-t-[#111111] animate-spin mb-4" />
      <span className="font-mono text-xs text-[#6B6B72] tracking-wider uppercase">Loading resources...</span>
    </div>
  );
};
