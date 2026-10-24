import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Copy, Check, Trash2, ArrowRight } from 'lucide-react';
import { ResourceItem } from '../data/types';
import { ResourceCard } from '../components/ResourceCard';

interface SavedPageProps {
  resources: ResourceItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onClearAllBookmarks: () => void;
  onSelectResource: (resource: ResourceItem) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  onClearAllBookmarks,
  onSelectResource,
}) => {
  const [copied, setCopied] = useState(false);

  const savedResources = resources.filter((r) => bookmarkedIds.has(r.id));

  const handleCopyAll = () => {
    if (savedResources.length === 0) return;
    const text = savedResources
      .map((r) => `${r.name} (${r.categoryName}): ${r.url}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 sm:py-20 bg-white min-h-[85vh]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#E8E8EB]">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-2 font-medium">
              SAVED COLLECTION
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight mb-2">
              Your Bookmarks.
            </h1>
            <p className="text-base text-[#6B6B72] font-normal">
              Quick access to your hand-picked tools, sound vaults, and assets.
            </p>
          </div>

          {savedResources.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F7F8] hover:bg-[#E8E8EB] text-[#111111] text-xs font-mono font-medium border border-[#E8E8EB] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Resource URLs'}</span>
              </button>

              <button
                type="button"
                onClick={onClearAllBookmarks}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 text-red-600 text-xs font-mono font-medium border border-red-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Resources Grid or Empty State */}
        {savedResources.length > 0 ? (
          <div>
            <div className="font-mono text-xs text-[#6B6B72] mb-6">
              Saved items (<strong className="text-[#111111]">{savedResources.length}</strong>)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {savedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                  onSelectResource={onSelectResource}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-6 rounded-3xl bg-[#F7F7F8] border border-[#E8E8EB] max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E8E8EB] flex items-center justify-center mx-auto mb-4 text-[#6B6B72]">
              <Bookmark className="w-5 h-5" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#111111] mb-2">
              No saved resources yet
            </h2>
            <p className="text-sm text-[#6B6B72] mb-6 max-w-sm mx-auto leading-relaxed">
              Click the bookmark icon on any resource card across the directory to save it to your personal workbench.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-mono font-medium tracking-tight shadow-xs transition-colors"
            >
              <span>Explore Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
