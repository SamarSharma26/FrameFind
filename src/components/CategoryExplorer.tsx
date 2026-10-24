import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from './CategoryCard';
import { ResourceItem } from '../data/types';

interface CategoryExplorerProps {
  resources: ResourceItem[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  resources,
  onSelectCategory,
}) => {
  const getResourceCount = (catId: string) => {
    return resources.filter((r) => r.category === catId).length;
  };

  const getCat = (id: string) => CATEGORIES.find((c) => c.id === id)!;

  return (
    <section id="categories" className="py-20 sm:py-28 border-t border-[#E8E8EB] bg-[#F7F7F8]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header Left-Aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-2 font-medium">
              THE 16 EDITING DISCIPLINES
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111111] tracking-tight leading-[1.08] mb-2">
              Explore the library.
            </h2>
            <p className="text-base text-[#6B6B72] max-w-lg font-normal">
              Everything you need for the next frame.
            </p>
          </div>

          <a
            href="#library"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#111111] hover:underline underline-offset-4 group shrink-0"
          >
            <span>View all categories</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 12-Column Grid with Deliberate Variation */}
        <div className="grid grid-cols-12 gap-5 sm:gap-6">
          {/* Row 1: 6-Col Featured Cards (SFX & LUTs) */}
          <div className="col-span-12 lg:col-span-6">
            <CategoryCard
              category={getCat('sfx')}
              resourceCount={getResourceCount('sfx')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <CategoryCard
              category={getCat('luts-color')}
              resourceCount={getResourceCount('luts-color')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>

          {/* Row 2: Trio 4-Col Cards (Stock Video, Fonts, Music) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('stock-video')}
              resourceCount={getResourceCount('stock-video')}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('fonts')}
              resourceCount={getResourceCount('fonts')}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('music')}
              resourceCount={getResourceCount('music')}
              onSelectCategory={onSelectCategory}
            />
          </div>

          {/* Row 3: 6-Col Cards (Motion Templates & Scripts) */}
          <div className="col-span-12 lg:col-span-6">
            <CategoryCard
              category={getCat('motion-templates')}
              resourceCount={getResourceCount('motion-templates')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <CategoryCard
              category={getCat('scripts-plugins')}
              resourceCount={getResourceCount('scripts-plugins')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>

          {/* Row 4: Trio 4-Col Cards (Transitions, Overlays, Textures) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('transitions')}
              resourceCount={getResourceCount('transitions')}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('overlays')}
              resourceCount={getResourceCount('overlays')}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('textures')}
              resourceCount={getResourceCount('textures')}
              onSelectCategory={onSelectCategory}
            />
          </div>

          {/* Row 5: 6-Col Cards (3D & HDRI, Creative Tools) */}
          <div className="col-span-12 lg:col-span-6">
            <CategoryCard
              category={getCat('3d-hdri')}
              resourceCount={getResourceCount('3d-hdri')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <CategoryCard
              category={getCat('creative-tools')}
              resourceCount={getResourceCount('creative-tools')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>

          {/* Row 6: Trio 4-Col Cards (Stock Photos, Graphics & Icons, Color Palettes) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('stock-photos')}
              resourceCount={getResourceCount('stock-photos')}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('graphics-icons')}
              resourceCount={getResourceCount('graphics-icons')}
              onSelectCategory={onSelectCategory}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <CategoryCard
              category={getCat('color-palettes')}
              resourceCount={getResourceCount('color-palettes')}
              onSelectCategory={onSelectCategory}
            />
          </div>

          {/* Row 7: 12-Col Full-Width Card (Inspiration) */}
          <div className="col-span-12">
            <CategoryCard
              category={getCat('inspiration')}
              resourceCount={getResourceCount('inspiration')}
              onSelectCategory={onSelectCategory}
              isWide={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
