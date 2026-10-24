import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, Bookmark, RotateCcw, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ResourceItem } from '../data/types';
import { CATEGORIES, WORKFLOWS } from '../data/categories';
import { ResourceCard } from '../components/ResourceCard';

interface LibraryPageProps {
  resources: ResourceItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectResource: (resource: ResourceItem) => void;
}

type SortOption = 'free-first' | 'alphabetical-asc' | 'alphabetical-desc' | 'category';

export const LibraryPage: React.FC<LibraryPageProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  onSelectResource,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category');
  const selectedWorkflow = searchParams.get('workflow');
  const selectedLicense = searchParams.get('license') || 'all';
  const selectedSoftware = searchParams.get('software') || 'all';
  const showBookmarksOnly = searchParams.get('saved') === 'true';

  const [sortBy, setSortBy] = useState<SortOption>('free-first');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Reset visibleCount when any filter changes
  useEffect(() => {
    setVisibleCount(24);
  }, [searchQuery, selectedCategory, selectedWorkflow, selectedLicense, selectedSoftware, showBookmarksOnly, sortBy]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'false') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const softwareOptions = [
    'All Software',
    'Premiere Pro',
    'DaVinci Resolve',
    'After Effects',
    'Final Cut Pro',
    'Blender',
    'Photoshop',
    'Web / In-Browser',
  ];

  // Filtering & Sorting
  const filteredResources = useMemo(() => {
    return resources
      .filter((item) => {
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesProvider = item.provider.toLowerCase().includes(query);
          const matchesDesc = item.description.toLowerCase().includes(query);
          const matchesFullDesc = item.fullDescription?.toLowerCase().includes(query);
          const matchesCategory = item.categoryName.toLowerCase().includes(query);
          const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
          const matchesFormats = item.fileFormats?.some((f) => f.toLowerCase().includes(query));
          const matchesCompat = item.compatibility.some((c) => c.toLowerCase().includes(query));

          if (!matchesName && !matchesProvider && !matchesDesc && !matchesFullDesc && !matchesCategory && !matchesTags && !matchesFormats && !matchesCompat) {
            return false;
          }
        }

        if (selectedCategory && item.category !== selectedCategory) {
          return false;
        }

        if (selectedWorkflow && !item.workflows.includes(selectedWorkflow)) {
          return false;
        }

        if (selectedLicense !== 'all' && item.licenseType !== selectedLicense) {
          return false;
        }

        if (selectedSoftware !== 'all') {
          const matchesSoftware = item.compatibility.some((comp) =>
            comp.toLowerCase().includes(selectedSoftware.toLowerCase())
          );
          if (!matchesSoftware) return false;
        }

        if (showBookmarksOnly && !bookmarkedIds.has(item.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'alphabetical-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'alphabetical-desc') {
          return b.name.localeCompare(a.name);
        }
        if (sortBy === 'category') {
          return a.categoryName.localeCompare(b.categoryName);
        }
        if (sortBy === 'free-first') {
          const aFree = a.licenseType === 'free-no-credit' ? 0 : 1;
          const bFree = b.licenseType === 'free-no-credit' ? 0 : 1;
          return aFree - bFree || a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [
    resources,
    searchQuery,
    selectedCategory,
    selectedWorkflow,
    selectedLicense,
    selectedSoftware,
    showBookmarksOnly,
    bookmarkedIds,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedWorkflow ? 1 : 0) +
    (selectedLicense !== 'all' ? 1 : 0) +
    (selectedSoftware !== 'all' ? 1 : 0) +
    (showBookmarksOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const currentCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);
  const currentWorkflowInfo = WORKFLOWS.find((w) => w.id === selectedWorkflow);

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[80vh]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-2 font-medium">
              EXPLORE DIRECTORY
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111111] tracking-tight leading-[1.08] mb-2">
              Resource Library.
            </h1>
            <p className="text-base text-[#6B6B72] max-w-lg font-normal">
              Search, filter, and inspect verified creative assets across all 16 categories.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#6B6B72] tabular-nums">
              Showing <strong className="text-[#111111] font-bold">{Math.min(visibleCount, filteredResources.length)}</strong> of{' '}
              {filteredResources.length}
            </span>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#111111] hover:bg-[#F7F7F8] bg-white border border-[#E8E8EB] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Context Banner */}
        {(currentCategoryInfo || currentWorkflowInfo) && (
          <div className="p-4 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB] flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF654F]" />
              <div>
                <div className="text-sm font-semibold text-[#111111]">
                  {currentCategoryInfo ? `Category: ${currentCategoryInfo.name}` : `Workflow: ${currentWorkflowInfo?.title}`}
                </div>
                <div className="text-xs text-[#6B6B72]">
                  {currentCategoryInfo ? currentCategoryInfo.whatsInside : currentWorkflowInfo?.description}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                updateParam('category', null);
                updateParam('workflow', null);
              }}
              className="text-xs font-mono text-[#6B6B72] hover:text-[#111111] flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E8E8EB]"
            >
              <span>Clear Filter</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Controls Strip */}
        <div className="space-y-3 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Live Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B72]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateParam('q', e.target.value)}
                placeholder="Search resources, providers, file extensions (.cube, .wav, .mogrt)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB] focus:border-[#111111] text-[#111111] placeholder-[#6B6B72] text-sm outline-none transition-colors focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => updateParam('q', null)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B72] hover:text-[#111111]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Saved Bookmarks Toggle */}
            <button
              type="button"
              onClick={() => updateParam('saved', showBookmarksOnly ? null : 'true')}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono border transition-colors shrink-0 ${
                showBookmarksOnly
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#6B6B72] hover:text-[#111111] border-[#E8E8EB]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span>Saved ({bookmarkedIds.size})</span>
            </button>

            {/* Sort Selector */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none w-full md:w-auto pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-[#E8E8EB] text-xs font-mono text-[#111111] focus:border-[#111111] outline-none cursor-pointer"
              >
                <option value="free-first">Sort: Free First</option>
                <option value="alphabetical-asc">Sort: A to Z</option>
                <option value="alphabetical-desc">Sort: Z to A</option>
                <option value="category">Sort: Category</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6B72] pointer-events-none" />
            </div>
          </div>

          {/* Category Filter Chips Horizontal Strip */}
          <div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              <button
                type="button"
                onClick={() => updateParam('category', null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  !selectedCategory
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'bg-[#F7F7F8] text-[#6B6B72] hover:text-[#111111] border border-[#E8E8EB]'
                }`}
              >
                All Categories ({resources.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = resources.filter((r) => r.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => updateParam('category', isSelected ? null : cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#111111] text-white font-semibold shadow-xs'
                        : 'bg-[#F7F7F8] text-[#6B6B72] hover:text-[#111111] border border-[#E8E8EB]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-white/70' : 'text-[#6B6B72]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* License & Software Secondary Filter Row (Only Free Tiers) */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="flex items-center gap-1 p-1 bg-[#F7F7F8] border border-[#E8E8EB] rounded-lg">
              {[
                { id: 'all', label: 'All Free Licenses' },
                { id: 'free-no-credit', label: 'Free · No Credit' },
                { id: 'credit-required', label: 'Credit / Cap' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => updateParam('license', tier.id === 'all' ? null : tier.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                    selectedLicense === tier.id || (tier.id === 'all' && !searchParams.get('license'))
                      ? 'bg-white text-[#111111] font-bold shadow-xs border border-[#E8E8EB]'
                      : 'text-[#6B6B72] hover:text-[#111111]'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={selectedSoftware}
                onChange={(e) => updateParam('software', e.target.value === 'all' ? null : e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-lg bg-[#F7F7F8] border border-[#E8E8EB] text-xs font-mono text-[#6B6B72] hover:text-[#111111] focus:border-[#111111] outline-none cursor-pointer"
              >
                {softwareOptions.map((opt) => (
                  <option key={opt} value={opt === 'All Software' ? 'all' : opt}>
                    Software: {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6B72] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Resources Grid with Progressive Loading */}
        {filteredResources.length > 0 ? (
          <div className="space-y-10">
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

            {/* Progressive Loading Action */}
            {visibleCount < filteredResources.length && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-[#E8E8EB]">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredResources.length))}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#111111] hover:bg-black text-white font-medium text-xs font-mono tracking-tight transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Load 24 More</span>
                  <span className="text-white/60">
                    ({visibleCount} of {filteredResources.length})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredResources.length)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#F7F7F8] hover:bg-[#E8E8EB] text-[#111111] font-medium text-xs font-mono tracking-tight transition-colors"
                >
                  Show All ({filteredResources.length})
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-6 rounded-2xl bg-[#F7F7F8] border border-[#E8E8EB] max-w-xl mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E8E8EB] flex items-center justify-center mx-auto mb-4 text-[#6B6B72]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#111111] mb-2">
              No matching resources found
            </h3>
            <p className="text-sm text-[#6B6B72] mb-6 max-w-sm mx-auto leading-relaxed">
              We couldn't find any resources matching your current filters. Try loosening your search query or reset your filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-white font-semibold text-xs font-mono tracking-tight transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
