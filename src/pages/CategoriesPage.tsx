import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { ResourceItem } from '../data/types';

interface CategoriesPageProps {
  resources: ResourceItem[];
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ resources }) => {
  return (
    <div className="py-12 sm:py-20 bg-white min-h-[85vh]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-2 font-medium">
            INDEX DIRECTORY
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111111] tracking-tight mb-3">
            All 16 Categories.
          </h1>
          <p className="text-base text-[#6B6B72] leading-relaxed font-normal">
            Every resource is categorized according to its creative discipline and editing pipeline stage.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((category) => {
            const count = resources.filter((r) => r.category === category.id).length;
            return (
              <Link key={category.id} to={`/category/${category.id}`} className="block h-full">
                <CategoryCard
                  category={category}
                  resourceCount={count}
                  onSelectCategory={() => {}}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
