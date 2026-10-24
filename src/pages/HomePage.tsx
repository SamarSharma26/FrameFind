import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResourceItem } from '../data/types';
import { HeroSection } from '../components/HeroSection';
import { CategoryExplorer } from '../components/CategoryExplorer';
import { FeaturedResources } from '../components/FeaturedResources';
import { WorkflowCollections } from '../components/WorkflowCollections';
import { DiscoveryCTA } from '../components/DiscoveryCTA';

interface HomePageProps {
  resources: ResourceItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectResource: (resource: ResourceItem) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  onSelectResource,
  onOpenSearch,
}) => {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/library?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/library');
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleSelectWorkflow = (workflowId: string) => {
    navigate(`/library?workflow=${workflowId}`);
  };

  return (
    <div>
      {/* 1. Large Typography-led Hero, Search & Statistics */}
      <HeroSection
        resources={resources}
        searchQuery={heroSearch}
        onSearchChange={setHeroSearch}
        onSearchSubmit={handleHeroSearchSubmit}
        onExploreClick={() => navigate('/library')}
        onSelectResource={onSelectResource}
      />

      {/* 2. Main Category Card Grid (Signature Feature) */}
      <CategoryExplorer
        resources={resources}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Featured Resources ("Resources worth discovering.") */}
      <FeaturedResources
        resources={resources}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={onToggleBookmark}
        onSelectResource={onSelectResource}
        onViewAllClick={() => navigate('/library')}
      />

      {/* 4. Browse by Editing Workflow */}
      <WorkflowCollections
        resources={resources}
        onSelectWorkflow={handleSelectWorkflow}
      />

      {/* 5. Resource Discovery Call to Action */}
      <DiscoveryCTA
        onExploreClick={() => navigate('/library')}
        onSearchOpen={onOpenSearch}
      />
    </div>
  );
};

export default HomePage;
