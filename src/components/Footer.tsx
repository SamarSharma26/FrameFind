import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E8E8EB] pt-16 pb-12">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="font-display font-bold text-xl tracking-tight text-[#111111] flex items-center">
              <span>FRAME</span>
              <span className="text-[#FF654F] mx-0.5 font-normal">//</span>
              <span>FIND</span>
            </Link>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72]">
              THE EDITOR'S RESOURCE INDEX
            </div>
            <p className="text-xs sm:text-sm text-[#6B6B72] max-w-sm leading-relaxed font-normal">
              A curated directory for modern video editors, motion designers, and content creators. High-utility audio, footage, color LUTs, motion assets, and tools.
            </p>
          </div>

          {/* Categories Column 1 */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Audio & Visuals
            </div>
            <ul className="space-y-2 text-xs text-[#6B6B72]">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="hover:text-[#111111] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Motion & Presets
            </div>
            <ul className="space-y-2 text-xs text-[#6B6B72]">
              {CATEGORIES.slice(5, 11).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="hover:text-[#111111] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111111]">
              Quick Access
            </div>
            <ul className="space-y-2 text-xs text-[#6B6B72]">
              <li>
                <Link to="/library" className="hover:text-[#111111] transition-colors">
                  Complete Directory
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#111111] transition-colors">
                  All 16 Categories
                </Link>
              </li>
              <li>
                <Link to="/library?license=free-no-credit" className="hover:text-[#111111] transition-colors">
                  Free · No Credit Vault
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[#111111] transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#E8E8EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B72]">
          <p className="leading-relaxed text-center sm:text-left font-normal">
            Licensing terms may change. Always review the original provider's current license before using in commercial projects.
          </p>
          <div className="font-mono text-[11px] whitespace-nowrap">
            © {new Date().getFullYear()} FRAME//FIND. Built for creators.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
