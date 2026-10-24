import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { LicenseType } from '../data/types';

interface LicenseBadgeProps {
  type: LicenseType;
  label?: string;
  size?: 'sm' | 'md';
}

export const LicenseBadge: React.FC<LicenseBadgeProps> = ({ type, label, size = 'sm' }) => {
  const isSm = size === 'sm';
  
  switch (type) {
    case 'free-no-credit':
      return (
        <span
          className={`inline-flex items-center gap-1 font-mono font-medium rounded-md tracking-tight ${
            isSm ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
          } bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]`}
        >
          <CheckCircle2 className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>{label || 'FREE · NO CREDIT'}</span>
        </span>
      );
    case 'credit-required':
      return (
        <span
          className={`inline-flex items-center gap-1 font-mono font-medium rounded-md tracking-tight ${
            isSm ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
          } bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]`}
        >
          <AlertTriangle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>{label || 'CREDIT / CAP'}</span>
        </span>
      );
    default:
      return null;
  }
};
