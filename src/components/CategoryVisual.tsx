import React from 'react';

interface CategoryVisualProps {
  categoryId: string;
  accentColor: string;
  bgTint: string;
  textColor?: string;
  className?: string;
}

export const CategoryVisual: React.FC<CategoryVisualProps> = ({
  categoryId,
  accentColor,
  bgTint,
  textColor = '#FFFFFF',
  className = 'w-full h-36',
}) => {
  switch (categoryId) {
    case 'sfx':
      // Sound Effects: Coral background with high-contrast audio waveform
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>96kHz / 24-BIT</span>
            <span>SFX MASTER</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 h-16 w-full px-1">
            {[15, 30, 55, 85, 50, 95, 100, 75, 45, 90, 65, 35, 80, 48, 25, 60, 90, 40, 20].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full transition-transform duration-200 group-hover:scale-y-110"
                style={{
                  height: `${h}%`,
                  backgroundColor: i === 6 || i === 9 ? accentColor : '#111111',
                  opacity: i === 6 || i === 9 ? 1 : 0.75,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>-12 dBFS</span>
            <span>STEREO WAV</span>
          </div>
        </div>
      );

    case 'music':
      // Music: Electric Blue background with dynamic audio sine curves
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>120 BPM</span>
            <span>KEY A-MIN</span>
          </div>

          <div className="h-16 flex items-center justify-center relative">
            <svg viewBox="0 0 200 50" className="w-full h-full">
              <path
                d="M 5 25 Q 30 5, 55 25 T 105 25 T 155 10 T 195 25"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
              />
              <path
                d="M 5 25 Q 40 45, 75 25 T 145 38 T 195 25"
                fill="none"
                stroke="#111111"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="opacity-40"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>CONTENT ID SAFE</span>
            <span>NO STRIKES</span>
          </div>
        </div>
      );

    case 'stock-video':
      // Stock Video: Lime tint with 2.39:1 widescreen cinema viewfinder
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold text-[#111111]">
            <span>4K CINEMA B-ROLL</span>
            <span>2.39:1 RATIO</span>
          </div>

          <div className="w-full h-16 rounded-lg border border-[#111111]/20 bg-white flex items-center justify-center relative overflow-hidden shadow-xs">
            {/* Viewfinder corner guides */}
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-[#111111] absolute top-1.5 left-1.5" />
            <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-[#111111] absolute top-1.5 right-1.5" />
            <div className="w-2.5 h-2.5 border-b-2 border-l-2 border-[#111111] absolute bottom-1.5 left-1.5" />
            <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-[#111111] absolute bottom-1.5 right-1.5" />
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#111111] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#FF654F] animate-pulse" />
              <span>3840×1607 · 23.98 FPS</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>NO WATERMARK</span>
            <span>PRORES / H.264</span>
          </div>
        </div>
      );

    case 'stock-photos':
      // Stock Photos: Pink background with camera lens diaphragm iris
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>PUBLIC DOMAIN & CC0</span>
            <span>RAW STILLS</span>
          </div>

          <div className="h-16 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-[#FF79B7] flex items-center justify-center relative bg-white shadow-xs">
              <div className="w-8 h-8 rounded-full border border-dashed border-[#111111]/30 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF79B7] group-hover:scale-125 transition-transform" />
              </div>
              <span className="absolute -top-2 font-mono text-[8px] font-bold text-[#111111] bg-white px-1 border border-[#FF79B7]/40 rounded">
                ƒ/1.4
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>SMITHSONIAN · RAWPIXEL</span>
            <span>6000×4000</span>
          </div>
        </div>
      );

    case 'luts-color':
      // LUTs & Color: Violet tint with 3D color grade chips
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>COLOR SCIENCE</span>
            <span>.CUBE 33³</span>
          </div>

          <div className="grid grid-cols-6 h-14 rounded-lg overflow-hidden border border-black/10 shadow-xs my-auto">
            <div className="bg-[#1C2833]" />
            <div className="bg-[#2E4053]" />
            <div className="bg-[#117A65]" />
            <div className="bg-[#D35400]" />
            <div className="bg-[#E67E22]" />
            <div className="bg-[#F4D03F]" />
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>KODAK 2383 PRINT</span>
            <span>LOG TO REC.709</span>
          </div>
        </div>
      );

    case 'transitions':
      // Transitions: Warm Yellow with kinetic split wipe
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold text-[#111111]">
            <span>SEAMLESS PRESETS</span>
            <span>CAMERA WHIP</span>
          </div>

          <div className="w-full h-14 relative rounded-lg border border-black/10 overflow-hidden flex my-auto bg-white shadow-xs">
            <div className="w-1/2 h-full bg-[#FFD65A] border-r border-[#111111] flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1.5">
              <span className="font-mono text-[9px] font-bold text-[#111111]">CLIP A</span>
            </div>
            <div className="w-1/2 h-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5">
              <span className="font-mono text-[9px] font-bold text-[#111111]">CLIP B</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>PREMIERE & DAVINCI</span>
            <span>NO PLUGINS</span>
          </div>
        </div>
      );

    case 'motion-templates':
      // Motion Templates: Electric Blue with lower third rigs
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>.MOGRT + .AEP</span>
            <span>ESSENTIAL GRAPHICS</span>
          </div>

          <div className="space-y-2 my-auto bg-white p-2.5 rounded-lg border border-black/10 shadow-xs">
            <div className="h-2 rounded bg-gray-100 relative overflow-hidden">
              <div className="h-full rounded bg-[#4D83FF]" style={{ width: '70%' }} />
            </div>
            <div className="h-2 rounded bg-gray-100 relative overflow-hidden">
              <div className="h-full rounded bg-[#FF654F]" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>LOWER THIRDS</span>
            <span>TITLE PACKS</span>
          </div>
        </div>
      );

    case 'fonts':
      // Fonts: Coral with oversized "Aa" typography
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>COMMERCIAL TYPE</span>
            <span>OFL LICENSE</span>
          </div>

          <div className="flex items-baseline justify-between my-auto px-1">
            <span className="font-display text-5xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#FF654F] transition-colors">
              Aa
            </span>
            <span className="font-mono text-xs text-[#6B6B72] tracking-wider uppercase font-medium">
              Bold · Regular · Light
            </span>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>FONTSHARE · GOOGLE</span>
            <span>OTF / TTF</span>
          </div>
        </div>
      );

    case 'graphics-icons':
      // Graphics & Icons: Pink with clean vector nodes
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>VECTOR SVGS</span>
            <span>SHAPE LAYERS</span>
          </div>

          <div className="h-16 flex items-center justify-center my-auto">
            <svg viewBox="0 0 140 40" className="w-32 h-10">
              <path
                d="M 10 30 C 40 5, 100 5, 130 30"
                fill="none"
                stroke="#111111"
                strokeWidth="2"
              />
              <circle cx="10" cy="30" r="3" fill="#111111" />
              <circle cx="130" cy="30" r="3" fill="#111111" />
              <circle cx="70" cy="11" r="4" fill="#FF79B7" />
              <line x1="40" y1="5" x2="100" y2="5" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>LUCIDE · TABLER</span>
            <span>5,000+ ICONS</span>
          </div>
        </div>
      );

    case 'overlays':
      // Overlays: Violet with 35mm optical light leak
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>35MM LIGHT LEAKS</span>
            <span>DUST & GRAIN</span>
          </div>

          <div className="h-16 relative flex items-center justify-center overflow-hidden my-auto rounded-lg bg-black/5">
            <div
              className="w-24 h-12 rounded-full blur-lg opacity-80"
              style={{
                background: 'radial-gradient(circle, #9B7BFF 0%, #FF654F 60%, transparent 80%)',
              }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>SCREEN / ADD BLEND</span>
            <span>4K PRORES</span>
          </div>
        </div>
      );

    case 'textures':
      // Textures: Warm Yellow with tactile halftone pattern
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold text-[#111111]">
            <span>6K DISPLACEMENT</span>
            <span>PAPER & INK</span>
          </div>

          <div className="w-full h-14 rounded-lg border border-black/10 bg-white relative overflow-hidden my-auto flex items-center justify-center shadow-xs">
            <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:6px_6px] opacity-25" />
            <span className="font-mono text-[9px] font-bold text-[#111111] bg-white px-2 py-0.5 rounded border border-black/10 z-10">
              HALFTONE MATRIX
            </span>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>TEXTURELABS</span>
            <span>PNG & EXR</span>
          </div>
        </div>
      );

    case 'scripts-plugins':
      // Scripts & Plugins: Lime tint with AE script syntax
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold text-[#111111]">
            <span>AE SCRIPTS & TOOLS</span>
            <span>EASING CURVES</span>
          </div>

          <div className="font-mono text-[10px] text-[#111111] bg-white p-2.5 rounded-lg border border-black/10 shadow-xs my-auto leading-relaxed">
            <div>
              <span className="text-[#FF654F] font-bold">ease</span>(time, 0, 1, 0, 100);
            </div>
            <div>
              <span className="text-[#4D83FF] font-bold">loopOut</span>(<span className="text-[#111111]">"cycle"</span>);
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>MISTER HORSE · DUIK</span>
            <span>ONE-CLICK AUTOMATE</span>
          </div>
        </div>
      );

    case 'color-palettes':
      // Color Palettes: Violet with 5-band harmonic spectrum
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>FILM PALETTES</span>
            <span>FILM-GRAB</span>
          </div>

          <div className="grid grid-cols-5 h-14 rounded-lg overflow-hidden border border-black/10 shadow-xs my-auto">
            <div className="bg-[#0B132B]" />
            <div className="bg-[#1C2541]" />
            <div className="bg-[#4D83FF]" />
            <div className="bg-[#D4FF54]" />
            <div className="bg-[#FF654F]" />
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>ASE SWATCH EXPORT</span>
            <span>HEX CODES</span>
          </div>
        </div>
      );

    case 'creative-tools':
      // Creative Tools: Electric Blue with media compressor gauge
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>VIDEO UTILITIES</span>
            <span>LOSSLESS CUT</span>
          </div>

          <div className="space-y-1.5 my-auto bg-white p-2.5 rounded-lg border border-black/10 shadow-xs">
            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-[#111111]">
              <span>CONSTANT FRAME RATE</span>
              <span className="text-[#4D83FF]">PRORES 422</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
              <div className="h-full bg-[#4D83FF] rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>HANDBRAKE · DAVINCI</span>
            <span>FREE & OPEN SOURCE</span>
          </div>
        </div>
      );

    case '3d-hdri':
      // 3D & HDRI: Coral with 16K HDR wireframe cube
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: accentColor }}>
            <span>16K HDR ENVIRONMENT</span>
            <span>CC0 TEXTURES</span>
          </div>

          <div className="h-16 flex items-center justify-center my-auto">
            <svg viewBox="0 0 60 60" className="w-12 h-12 stroke-current">
              <polygon points="30,8 52,20 30,32 8,20" fill="none" stroke="#FF654F" strokeWidth="2" />
              <polygon points="8,20 30,32 30,52 8,40" fill="none" stroke="#111111" strokeWidth="1.5" />
              <polygon points="52,20 30,32 30,52 52,40" fill="none" stroke="#888888" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>POLY HAVEN · BLENDER</span>
            <span>EXR & GLTF</span>
          </div>
        </div>
      );

    case 'inspiration':
      // Inspiration: Warm Yellow with golden ratio spiral
      return (
        <div
          className={`relative overflow-hidden rounded-xl flex flex-col justify-between p-4 ${className}`}
          style={{ backgroundColor: bgTint }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider font-semibold text-[#111111]">
            <span>VISUAL TECHNIQUES</span>
            <span>EYECANDY ARCHIVE</span>
          </div>

          <div className="h-16 flex items-center justify-center my-auto">
            <svg viewBox="0 0 60 40" className="w-16 h-11">
              <rect x="2" y="2" width="56" height="36" fill="none" stroke="#111111" strokeWidth="1.5" />
              <path
                d="M 58 38 A 36 36 0 0 0 22 2 A 22 22 0 0 0 2 24 A 14 14 0 0 0 16 38 A 8 8 0 0 0 24 30"
                fill="none"
                stroke="#FF654F"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-[#6B6B72]">
            <span>MATCH CUTS · VERTIGO</span>
            <span>DIRECTOR BREAKDOWNS</span>
          </div>
        </div>
      );

    default:
      return (
        <div className={`rounded-xl flex items-center justify-center p-4 ${className}`} style={{ backgroundColor: bgTint }}>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      );
  }
};
