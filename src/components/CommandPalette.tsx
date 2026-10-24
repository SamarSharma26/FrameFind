import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { ResourceItem } from '../data/types';
import { CATEGORIES } from '../data/categories';
import { LicenseBadge } from './LicenseBadge';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  resources,
  onSelectResource,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  const matchingCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(trimmedQuery) ||
      c.whatsInside.toLowerCase().includes(trimmedQuery)
  ).slice(0, 4);

  const matchingResources = trimmedQuery
    ? resources
        .filter(
          (r) =>
            r.name.toLowerCase().includes(trimmedQuery) ||
            r.provider.toLowerCase().includes(trimmedQuery) ||
            r.categoryName.toLowerCase().includes(trimmedQuery) ||
            r.tags.some((t) => t.toLowerCase().includes(trimmedQuery)) ||
            r.description.toLowerCase().includes(trimmedQuery)
        )
        .slice(0, 6)
    : resources.filter((r) => r.isFeatured).slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick Search"
        className="relative w-full max-w-2xl bg-white border border-[#E8E8EB] rounded-2xl shadow-2xl overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8E8EB]">
          <Search className="w-4 h-4 text-[#6B6B72] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources, categories, tools, LUTs, foley..."
            className="w-full bg-transparent text-[#111111] placeholder-[#6B6B72] text-sm outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#6B6B72] hover:text-[#111111]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="ml-2 px-2 py-0.5 text-[10px] font-mono text-[#6B6B72] bg-[#F7F7F8] border border-[#E8E8EB] rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {matchingCategories.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B72] mb-2 px-2 font-semibold">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {matchingCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F7F8] hover:bg-[#EEEEEF] border border-[#E8E8EB] text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#111111]">
                        {cat.number}. {cat.name}
                      </div>
                      <div className="text-[11px] text-[#6B6B72] truncate">
                        {cat.whatsInside}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B6B72] group-hover:text-[#111111] shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B72] mb-2 px-2 font-semibold">
              {trimmedQuery ? 'Matching Resources' : 'Featured Resources'}
            </div>
            {matchingResources.length > 0 ? (
              <div className="space-y-1">
                {matchingResources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      onSelectResource(res);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F7F7F8] transition-colors cursor-pointer group border border-transparent hover:border-[#E8E8EB]"
                  >
                    <div className="pr-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-display font-semibold text-sm text-[#111111]">
                          {res.name}
                        </span>
                        <span className="text-xs text-[#6B6B72]">· {res.provider}</span>
                      </div>
                      <p className="text-xs text-[#6B6B72] line-clamp-1 font-normal">
                        {res.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <LicenseBadge type={res.licenseType} label={res.licenseLabel} />
                      <ArrowRight className="w-3.5 h-3.5 text-[#6B6B72] group-hover:text-[#111111] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#6B6B72]">
                No matching results found for "{query}".
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F7F8] border-t border-[#E8E8EB] flex items-center justify-between text-[11px] font-mono text-[#6B6B72]">
          <span>Tip: Filter by extensions like .cube, .wav, or .mogrt</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
