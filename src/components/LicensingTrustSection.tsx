import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const LicensingTrustSection: React.FC = () => {
  const tiers = [
    {
      icon: CheckCircle2,
      tier: 'Free · No Credit',
      color: '#C6FF3D',
      summary: 'Public Domain, CC0, or platform-cleared commercial licenses with zero attribution requirement.',
      details: 'Permitted in monetized YouTube videos, client projects, broadcast commercials, and social reels without crediting the author.',
      examples: 'Poly Haven (CC0), Pexels, FreshLUTs, Mixkit Free License',
    },
    {
      icon: AlertTriangle,
      tier: 'Credit / Account / Cap',
      color: '#FF7043',
      summary: 'Creative Commons Attribution (CC-BY), free tiers with daily download caps, or free accounts.',
      details: 'You must provide exact author credit in your video description or comply with monthly free allowances.',
      examples: 'Incompetech (CC-BY), FootageCrate (5/day), Uppbeat (10 tracks/mo)',
    },
  ];

  return (
    <section id="licensing-guide" className="py-24 sm:py-32 border-t border-white/10 bg-[#0B0B0D]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-[#A1A1AA] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6FF3D]" />
            <span>COMMERCIAL USE & COMPLIANCE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-bold text-[#F5F5F7] tracking-tight leading-[1.08] mb-4">
            Protect your edits & client deliveries.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-normal">
            Every resource in FRAME//FIND is categorized according to its legal usage model so you can edit with confidence.
          </p>
        </div>

        {/* 2 Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {tiers.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#151518] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-4 h-4" style={{ color: t.color }} />
                    <span
                      className="font-mono text-xs font-semibold uppercase tracking-wider"
                      style={{ color: t.color }}
                    >
                      {t.tier}
                    </span>
                  </div>

                  <p className="text-sm text-[#F5F5F7] font-medium leading-relaxed mb-3">
                    {t.summary}
                  </p>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6 font-normal">
                    {t.details}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/10 mt-auto">
                  <div className="text-[10px] font-mono text-[#71717A] uppercase mb-1">
                    Examples
                  </div>
                  <div className="text-xs text-[#D4D4D8] font-mono">
                    {t.examples}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Disclaimer */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#151518] border border-white/10 flex items-start gap-3.5 max-w-4xl">
          <Info className="w-4 h-4 text-[#C6FF3D] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            <strong className="text-[#F5F5F7] font-medium">Important Licensing Notice: </strong>
            Licensing terms may change. Always review the original provider's current license before using a resource in commercial or client projects. FRAME//FIND does not host assets directly or provide formal legal counsel.
          </div>
        </div>
      </div>
    </section>
  );
};
