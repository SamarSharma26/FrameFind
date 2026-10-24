import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryInfo } from '../data/types';
import { CategoryVisual } from './CategoryVisual';

interface CategoryCardProps {
  category: CategoryInfo & { bgTint?: string; textColor?: string; badgeBg?: string };
  resourceCount: number;
  onSelectCategory?: (categoryId: string) => void;
  isWide?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  resourceCount,
  onSelectCategory,
  isWide = false,
}) => {
  const bgTint = category.bgTint || '#F7F7F8';
  const accentColor = category.accentColor || '#111111';

  const handleClick = () => {
    if (onSelectCategory) {
      onSelectCategory(category.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="card-lift group relative flex flex-col justify-between bg-white border border-zinc-200/80 hover:border-zinc-400/90 rounded-2xl p-6 sm:p-7 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 h-full min-h-[320px] select-none"
    >
      {/* Top Zone: Visual Preview Area (~50% of card) */}
      <div className="w-full mb-6">
        <CategoryVisual
          categoryId={category.id}
          accentColor={accentColor}
          bgTint={bgTint}
          className={`w-full ${isWide ? 'h-40 sm:h-44' : 'h-36 sm:h-40'}`}
        />
      </div>

      {/* Bottom Zone: Metadata, Title, Description & Action */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Header Row: Number and Dynamic Arrow */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <span className="font-mono text-[11px] font-medium tracking-wider text-zinc-400 uppercase">
              {category.number} <span className="text-zinc-300">/</span> {category.whatsInside}
            </span>

            <div className="text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-sans font-semibold text-xl sm:text-[22px] text-zinc-950 tracking-[-0.025em] mb-2 leading-tight">
            {category.name}
          </h3>

          {/* Concise Description */}
          <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed font-normal mb-6">
            {category.description}
          </p>
        </div>

        {/* Footer: Exact Resource Count & Browse Action — No redundant dividing borders */}
        <div className="mt-auto flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono">
            <strong className="text-zinc-900 font-semibold">{resourceCount}</strong> resources
          </span>
          <span className="font-medium text-zinc-900 group-hover:underline underline-offset-4 text-[12px] flex items-center gap-1">
            Browse
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
