import React from 'react';
import { ArrowRight, Search } from 'lucide-react';

interface DiscoveryCTAProps {
  onExploreClick: () => void;
  onSearchOpen: () => void;
}

export const DiscoveryCTA: React.FC<DiscoveryCTAProps> = ({
  onExploreClick,
  onSearchOpen,
}) => {
  return (
    <section className="py-20 sm:py-28 border-t border-[#E8E8EB] bg-[#F7F7F8]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-3 font-semibold">
            LESS SEARCHING · MORE CREATING
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#111111] tracking-tight leading-[1.05] mb-4">
            Everything your edits need.
          </h2>
          <p className="text-base sm:text-lg text-[#6B6B72] leading-relaxed mb-8">
            Browse 190+ verified sound effects, cinematic LUTs, overlays, transitions, and editing tools without paywalls.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-black text-white font-mono text-xs font-semibold tracking-tight transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Browse Full Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onSearchOpen}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#111111] font-mono text-xs font-medium tracking-tight transition-all border border-[#E8E8EB] shadow-xs flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-[#6B6B72]" />
              <span>Search by Keyword</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
