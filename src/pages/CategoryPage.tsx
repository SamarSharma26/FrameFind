import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, ChevronDown, Layers, ArrowUpRight } from 'lucide-react';
import { ResourceItem } from '../data/types';
import { CATEGORIES } from '../data/categories';
import { ResourceCard } from '../components/ResourceCard';
import { CategoryVisual } from '../components/CategoryVisual';

interface CategoryPageProps {
  resources: ResourceItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectResource: (resource: ResourceItem) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  onSelectResource,
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState('all');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const category = CATEGORIES.find((c) => c.id === categoryId);

  // If category not found, show friendly not-found screen
  if (!category) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-5">
        <h2 className="font-display text-2xl font-bold mb-2">Category Not Found</h2>
        <p className="text-sm text-[#6B6B72] mb-6">
          The requested category could not be located in our index.
        </p>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Browse all categories</span>
        </Link>
      </div>
    );
  }

  const categoryResources = useMemo(() => {
    return resources.filter((r) => r.category === category.id);
  }, [resources, category.id]);

  const filteredResources = useMemo(() => {
    return categoryResources.filter((item) => {
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesProvider = item.provider.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesProvider && !matchesDesc && !matchesTags) return false;
      }
      if (selectedSoftware !== 'all') {
        const matchesCompat = item.compatibility.some((c) =>
          c.toLowerCase().includes(selectedSoftware.toLowerCase())
        );
        if (!matchesCompat) return false;
      }
      if (selectedLicense !== 'all' && item.licenseType !== selectedLicense) {
        return false;
      }
      return true;
    });
  }, [categoryResources, search, selectedSoftware, selectedLicense]);

  const softwareOptions = [
    'All Software',
    'Premiere Pro',
    'DaVinci Resolve',
    'After Effects',
    'Final Cut Pro',
    'Blender',
    'Photoshop',
  ];

  // Related categories (next 4)
  const currentIndex = CATEGORIES.findIndex((c) => c.id === category.id);
  const relatedCategories = [
    CATEGORIES[(currentIndex + 1) % CATEGORIES.length],
    CATEGORIES[(currentIndex + 2) % CATEGORIES.length],
    CATEGORIES[(currentIndex + 3) % CATEGORIES.length],
  ];

  return (
    <div className="py-10 sm:py-16 bg-white min-h-[85vh]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B6B72] mb-8">
          <Link to="/" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/categories" className="hover:text-[#111111] transition-colors">
            Categories
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#111111] font-semibold">{category.name}</span>
        </div>

        {/* Category Header Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#F7F7F8] border border-[#E8E8EB] mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                Category {category.number}
              </span>
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span className="font-mono text-xs text-[#6B6B72]">
                {category.whatsInside}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight mb-4">
              {category.name}
            </h1>

            <p className="text-sm sm:text-base text-[#6B6B72] leading-relaxed mb-6 font-normal">
              {category.description}
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <span className="text-zinc-900 font-semibold">{categoryResources.length} verified resources</span>
              <span aria-hidden="true">·</span>
              <span>100% Free / Creator cleared</span>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="w-full md:w-72 shrink-0">
            <CategoryVisual
              categoryId={category.id}
              accentColor={category.accentColor}
              bgTint={category.bgTint}
              className="w-full h-44 rounded-2xl shadow-xs"
            />
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B72]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search within ${category.name}...`}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB] focus:border-[#111111] text-sm text-[#111111] placeholder-[#6B6B72] outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B72] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedSoftware}
                onChange={(e) => setSelectedSoftware(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB] text-xs font-mono text-[#6B6B72] focus:border-[#111111] outline-none cursor-pointer"
              >
                {softwareOptions.map((opt) => (
                  <option key={opt} value={opt === 'All Software' ? 'all' : opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6B72] pointer-events-none" />
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#F7F7F8] border border-[#E8E8EB] rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedLicense('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLicense === 'all'
                    ? 'bg-white text-[#111111] font-semibold shadow-2xs'
                    : 'text-[#6B6B72] hover:text-[#111111]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedLicense('free-no-credit')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLicense === 'free-no-credit'
                    ? 'bg-white text-[#111111] font-semibold shadow-2xs'
                    : 'text-[#6B6B72] hover:text-[#111111]'
                }`}
              >
                No Credit
              </button>
              <button
                type="button"
                onClick={() => setSelectedLicense('credit-required')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLicense === 'credit-required'
                    ? 'bg-white text-[#111111] font-semibold shadow-2xs'
                    : 'text-[#6B6B72] hover:text-[#111111]'
                }`}
              >
                Credit / Cap
              </button>
            </div>
          </div>
        </div>

        {/* Resources Grid with Progressive Loading */}
        {filteredResources.length > 0 ? (
          <div className="space-y-10 mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredResources.slice(0, visibleCount).map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isBookmarked={bookmarkedIds.has(resource.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelectResource={onSelectResource}
                />
              ))}
            </div>

            {visibleCount < filteredResources.length && (
              <div className="text-center pt-6 border-t border-[#E8E8EB]">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredResources.length))}
                  className="px-6 py-3 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-mono font-medium tracking-tight shadow-xs transition-colors"
                >
                  Load 24 More ({visibleCount} of {filteredResources.length})
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-2xl bg-[#F7F7F8] border border-[#E8E8EB] max-w-md mx-auto mb-20">
            <p className="text-sm text-[#6B6B72] mb-4">
              No resources found matching the selected filters in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedSoftware('all');
                setSelectedLicense('all');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#111111] text-white text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Related Categories Navigation Strip */}
        <div className="pt-12 border-t border-[#E8E8EB]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#6B6B72]">
                KEEP EXPLORING
              </div>
              <h3 className="font-display font-bold text-xl text-[#111111] tracking-tight">
                Related Categories
              </h3>
            </div>
            <Link
              to="/categories"
              className="text-xs font-mono text-[#111111] hover:underline underline-offset-4 flex items-center gap-1"
            >
              <span>View all 16 categories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCategories.map((relCat) => (
              <Link
                key={relCat.id}
                to={`/category/${relCat.id}`}
                className="card-lift p-4 rounded-xl border border-[#E8E8EB] hover:border-[#111111] bg-white transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#6B6B72] block">
                    {relCat.number} · {relCat.whatsInside}
                  </span>
                  <h4 className="font-display font-bold text-base text-[#111111] group-hover:text-black">
                    {relCat.name}
                  </h4>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6B6B72] group-hover:text-[#111111] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
