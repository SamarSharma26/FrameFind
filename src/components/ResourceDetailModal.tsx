import React, { useEffect } from 'react';
import { X, ExternalLink, Bookmark, ShieldCheck, Tag, Layers, FileCode, Info } from 'lucide-react';
import { ResourceItem } from '../data/types';
import { LicenseBadge } from './LicenseBadge';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectCategory,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-resource-title"
        className="relative w-full max-w-2xl bg-white border border-[#E8E8EB] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => {
              onSelectCategory(resource.category);
              onClose();
            }}
            className="text-xs font-mono uppercase tracking-wider text-[#6B6B72] hover:text-[#111111] transition-colors flex items-center gap-1.5 font-medium"
          >
            <span>{resource.categoryName}</span>
            <span className="text-gray-400">→ View Category</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => onToggleBookmark(resource.id, e)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                isBookmarked
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-[#F7F7F8] text-[#6B6B72] hover:text-[#111111] border-[#E8E8EB]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 rounded-lg bg-[#F7F7F8] text-[#6B6B72] hover:text-[#111111] border border-[#E8E8EB] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Provider */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B6B72] mb-1.5">
            <span>By {resource.provider}</span>
            <span aria-hidden="true">·</span>
            <span>{resource.pricingTier}</span>
          </div>

          <h2 id="modal-resource-title" className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            {resource.name}
          </h2>
        </div>

        {/* Description & Editor Note */}
        <div className="mb-6 space-y-4">
          <p className="text-sm sm:text-[15px] text-[#44444A] leading-relaxed font-normal">
            {resource.fullDescription || resource.description}
          </p>

          {resource.usageNotes && (
            <div className="p-3.5 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB] flex items-start gap-3 text-xs text-[#6B6B72] leading-relaxed">
              <Info className="w-4 h-4 text-[#FF654F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111] font-semibold">Editor Note: </strong>
                {resource.usageNotes}
              </div>
            </div>
          )}
        </div>

        {/* Licensing & Formats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-[#F7F7F8] border border-[#E8E8EB]">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#6B6B72] tracking-wider block font-semibold">
              Licensing Status
            </span>
            <div className="flex items-center gap-2">
              <LicenseBadge type={resource.licenseType} label={resource.licenseLabel} size="md" />
            </div>
            <div className="text-xs text-[#6B6B72] flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
              <span>Commercial: <strong className="text-[#111111] font-medium">{resource.commercialUse}</strong></span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#6B6B72] tracking-wider block font-semibold">
              Compatibility & Formats
            </span>
            <div className="text-xs text-[#111111] flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-[#4D83FF] shrink-0" />
              <span>{resource.compatibility.join(', ')}</span>
            </div>
            {resource.fileFormats && resource.fileFormats.length > 0 && (
              <div className="text-xs text-[#6B6B72] flex items-center gap-1.5 pt-1">
                <FileCode className="w-3.5 h-3.5 text-[#FF654F] shrink-0" />
                <span className="font-mono text-[11px]">{resource.fileFormats.join(' · ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <Tag className="w-3.5 h-3.5 text-[#6B6B72] shrink-0" />
            <div className="flex flex-wrap gap-2 text-xs text-[#6B6B72]">
              {resource.tags.map((tag, idx) => (
                <span key={idx} className="font-mono text-[11px] text-[#6B6B72] bg-[#F7F7F8] px-2 py-0.5 rounded border border-[#E8E8EB]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button & Disclaimer */}
        <div className="pt-4 border-t border-[#E8E8EB] space-y-3">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-medium text-sm text-white bg-[#111111] hover:bg-black transition-colors shadow-xs font-display tracking-tight"
          >
            <span>Visit Original Resource</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <p className="text-[11px] text-[#6B6B72] text-center leading-relaxed">
            Licensing terms may change. Always review the original provider's current license before using in commercial projects.
          </p>
        </div>
      </div>
    </div>
  );
};
