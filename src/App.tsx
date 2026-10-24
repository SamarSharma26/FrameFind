/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RESOURCES } from './data/resources';
import { ResourceItem } from './data/types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { LoadingFallback } from './components/LoadingFallback';

// Route-level code-splitting for performance and fast initial load
const HomePage = lazy(() => import('./pages/HomePage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));

// Automatic scroll-to-top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

// Inner App Layout
function AppContent() {
  const navigate = useNavigate();
  const [resources] = useState<ResourceItem[]>(RESOURCES);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('framefind_bookmarks');
      if (saved) {
        return new Set<string>(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
    return new Set<string>();
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('framefind_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // Ignore storage errors
    }
  }, [bookmarkedIds]);

  // Global keydown listeners for quick search (⌘K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds(new Set());
  };

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white">
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar
        onSearchOpen={() => setIsCommandPaletteOpen(true)}
        savedCount={bookmarkedIds.size}
      />

      {/* Main Content with Route Suspense */}
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  resources={resources}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectResource={setSelectedResource}
                  onOpenSearch={() => setIsCommandPaletteOpen(true)}
                />
              }
            />

            <Route
              path="/library"
              element={
                <LibraryPage
                  resources={resources}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectResource={setSelectedResource}
                />
              }
            />

            <Route
              path="/explore"
              element={
                <LibraryPage
                  resources={resources}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectResource={setSelectedResource}
                />
              }
            />

            <Route
              path="/categories"
              element={<CategoriesPage resources={resources} />}
            />

            <Route
              path="/category/:categoryId"
              element={
                <CategoryPage
                  resources={resources}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectResource={setSelectedResource}
                />
              }
            />

            <Route
              path="/saved"
              element={
                <SavedPage
                  resources={resources}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                  onClearAllBookmarks={handleClearAllBookmarks}
                  onSelectResource={setSelectedResource}
                />
              }
            />

            {/* Fallback to Home */}
            <Route
              path="*"
              element={
                <HomePage
                  resources={resources}
                  bookmarkedIds={bookmarkedIds}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectResource={setSelectedResource}
                  onOpenSearch={() => setIsCommandPaletteOpen(true)}
                />
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Fast Resource Detail Inspection Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        isBookmarked={selectedResource ? bookmarkedIds.has(selectedResource.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSelectCategory={handleSelectCategory}
      />

      {/* Keyboard Command Palette (⌘K or /) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        resources={resources}
        onSelectResource={setSelectedResource}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
