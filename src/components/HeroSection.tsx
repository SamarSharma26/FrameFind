import React from 'react';
import { Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ResourceItem } from '../data/types';

interface HeroSectionProps {
  resources: ResourceItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onExploreClick: () => void;
  onSelectResource: (resource: ResourceItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  resources,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onExploreClick,
}) => {
  const totalCount = resources.length;
  const categoriesCount = 16;
  const freeCount = resources.filter(
    (r) => r.licenseType === 'free-no-credit' || r.pricingTier.toLowerCase().includes('free')
  ).length;

  return (
    <section className="pt-16 pb-16 sm:pt-24 sm:pb-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow Kicker */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF654F]" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400">
              The Creative Resource Directory
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[76px] font-bold text-[#111111] tracking-[-0.03em] leading-[0.98] mb-6 text-balance">
            Your next great edit starts here.
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#6B6B72] max-w-2xl leading-relaxed mb-8 font-normal">
            Discover the sounds, footage, presets, tools, and inspiration behind better videos.
          </p>

          {/* Search Field */}
          <form
            onSubmit={onSearchSubmit}
            className="w-full max-w-xl relative mb-4"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#6B6B72] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search resources, categories, tools..."
                className="w-full pl-11 pr-24 py-3.5 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB] focus:border-[#111111] text-[#111111] placeholder-[#6B6B72] text-sm outline-none transition-all shadow-xs focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 rounded-lg bg-[#111111] hover:bg-black text-white font-mono text-xs font-semibold tracking-tight transition-colors shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Secondary Action Link */}
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#111111] hover:underline underline-offset-4 transition-colors group mt-2"
          >
            <span>Explore all resources</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Compact Resource Statistics Strip */}
        <div className="mt-14 pt-8 border-t border-[#E8E8EB] grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs text-[#6B6B72]">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums font-display tracking-tight mb-0.5">
              {totalCount}+
            </div>
            <span className="uppercase tracking-wider text-[11px]">Resources</span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#FF654F] tabular-nums font-display tracking-tight mb-0.5">
              {categoriesCount}
            </div>
            <span className="uppercase tracking-wider text-[11px]">Categories</span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#4D83FF] tabular-nums font-display tracking-tight mb-0.5">
              {freeCount}+
            </div>
            <span className="uppercase tracking-wider text-[11px]">Free & CC0</span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums font-display tracking-tight mb-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-6 h-6 text-[#111111]" />
              <span>100%</span>
            </div>
            <span className="uppercase tracking-wider text-[11px]">License-Checked</span>
          </div>
        </div>
      </div>
    </section>
  );
};
