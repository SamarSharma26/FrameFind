import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchOpen,
  savedCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full h-[68px] sm:h-[72px] flex items-center transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E8E8EB] shadow-2xs'
          : 'bg-white border-b border-[#E8E8EB]'
      }`}
    >
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* Left: FRAME//FIND Wordmark */}
          <Link
            to="/"
            className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#111111] whitespace-nowrap shrink-0 flex items-center hover:opacity-85 transition-opacity"
          >
            <span>FRAME</span>
            <span className="text-[#FF654F] mx-0.5 font-normal">//</span>
            <span>FIND</span>
          </Link>

          {/* Center: Explore, Categories, Free Resources */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#6B6B72]">
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#111111] font-semibold' : 'hover:text-[#111111]'
                }`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#111111] font-semibold' : 'hover:text-[#111111]'
                }`
              }
            >
              Categories
            </NavLink>
            <Link
              to="/library?license=free-no-credit"
              className="hover:text-[#111111] transition-colors whitespace-nowrap"
            >
              Free Resources
            </Link>
          </nav>

          {/* Right: Search and Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={onSearchOpen}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#F7F7F8] hover:bg-[#EAEAEA] text-[#6B6B72] hover:text-[#111111] border border-[#E8E8EB] transition-colors text-xs font-mono"
            >
              <Search className="w-3.5 h-3.5 text-[#6B6B72]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-[#E8E8EB] rounded text-[#6B6B72]">
                ⌘K
              </kbd>
            </button>

            {/* Saved Bookmarks */}
            <Link
              to="/saved"
              title="View saved resources"
              className="p-2 rounded-lg bg-[#F7F7F8] hover:bg-[#EAEAEA] text-[#6B6B72] hover:text-[#111111] border border-[#E8E8EB] transition-colors relative"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-current text-[#111111]' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#111111] text-white font-mono font-bold text-[8px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Minimal "Browse Library" Action */}
            <Link
              to="/library"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#111111] hover:bg-black transition-all whitespace-nowrap font-mono shadow-xs"
            >
              <span>Browse Library</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#F7F7F8] text-[#6B6B72] hover:text-[#111111] border border-[#E8E8EB]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E8EB] mt-3 py-4 space-y-3 bg-white">
            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#111111] hover:bg-[#F7F7F8] rounded-lg"
            >
              Explore Library
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#111111] hover:bg-[#F7F7F8] rounded-lg"
            >
              All 16 Categories
            </Link>
            <Link
              to="/library?license=free-no-credit"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#111111] hover:bg-[#F7F7F8] rounded-lg"
            >
              Free Resources (No Credit)
            </Link>
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#111111] hover:bg-[#F7F7F8] rounded-lg"
            >
              Saved Bookmarks ({savedCount})
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
