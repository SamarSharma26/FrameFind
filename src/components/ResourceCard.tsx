import React from 'react';
import { ExternalLink, Bookmark, ArrowUpRight } from 'lucide-react';
import { ResourceItem } from '../data/types';

interface ResourceCardProps {
  resource: ResourceItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectResource: (resource: ResourceItem) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isBookmarked,
  onToggleBookmark,
  onSelectResource,
}) => {
  const isNoCredit = resource.licenseType === 'free-no-credit';

  return (
    <div
      onClick={() => onSelectResource(resource)}
      className="card-lift group relative flex flex-col justify-between bg-white border border-zinc-200/80 hover:border-zinc-400/90 rounded-2xl p-6 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 h-full select-none"
    >
      <div>
        {/* Unboxed Kicker & Action Buttons */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-zinc-400 uppercase overflow-hidden">
            <span className="font-medium text-zinc-800 truncate">{resource.categoryName}</span>
            <span aria-hidden="true" className="text-zinc-300">/</span>
            <span className="truncate max-w-[130px] text-zinc-500">{resource.provider}</span>
          </div>

          <div className="flex items-center gap-0.5 shrink-0 -mr-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={(e) => onToggleBookmark(resource.id, e)}
              title={isBookmarked ? 'Remove bookmark' : 'Save resource'}
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100/80'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${resource.provider}`}
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Resource Name */}
        <h3 className="font-sans font-semibold text-[17px] text-zinc-900 tracking-[-0.02em] mb-2 leading-snug flex items-center justify-between group-hover:text-black">
          <span className="line-clamp-1">{resource.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all shrink-0 ml-2" />
        </h3>

        {/* Short Description */}
        <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed font-normal mb-6">
          {resource.description}
        </p>
      </div>

      {/* Clean Uncluttered Footer: Generous negative space, no redundant border dividers */}
      <div className="mt-auto flex items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isNoCredit ? 'bg-emerald-600' : 'bg-amber-600'
            }`}
          />
          <span className={isNoCredit ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
            {isNoCredit ? 'Free · No Credit' : 'Attribution'}
          </span>
        </div>

        {resource.compatibility && resource.compatibility.length > 0 && (
          <span className="text-zinc-400 truncate max-w-[130px] text-right font-sans text-[11px]">
            {resource.compatibility.slice(0, 2).join(', ')}
            {resource.compatibility.length > 2 ? ` +${resource.compatibility.length - 2}` : ''}
          </span>
        )}
      </div>
    </div>
  );
};
