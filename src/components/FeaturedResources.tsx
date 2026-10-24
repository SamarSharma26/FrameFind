import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ResourceItem } from '../data/types';
import { ResourceCard } from './ResourceCard';

interface FeaturedResourcesProps {
  resources: ResourceItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectResource: (resource: ResourceItem) => void;
  onViewAllClick: () => void;
}

export const FeaturedResources: React.FC<FeaturedResourcesProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  onSelectResource,
  onViewAllClick,
}) => {
  const featuredList = resources.filter((r) => r.isFeatured).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 border-t border-[#E8E8EB] bg-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header Left-Aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-2 font-medium">
              CURATED SELECTION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111111] tracking-tight leading-[1.08] mb-2">
              Resources worth discovering.
            </h2>
            <p className="text-base text-[#6B6B72] max-w-lg font-normal">
              High-utility assets and tools handpicked for modern video editing pipelines.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#111111] hover:underline underline-offset-4 group shrink-0"
          >
            <span>View all resources</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Column Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featuredList.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isBookmarked={bookmarkedIds.has(resource.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectResource={onSelectResource}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
