import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { MainCategory, Subcategory } from '../types';

interface BreadcrumbsProps {
  currentCategory: MainCategory;
  activeSubcategory: Subcategory | null;
  activeChildCategoryName: string | null;
  onSelectSubcategory: (subcatId: string | null) => void;
  onSelectChildCategory: (childId: string | null) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentCategory,
  activeSubcategory,
  activeChildCategoryName,
  onSelectSubcategory,
  onSelectChildCategory
}) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-neutral-500 py-3 overflow-x-auto scrollbar-none" aria-label="Ekmek Kırıntısı">
      <button
        onClick={() => {
          onSelectSubcategory(null);
          onSelectChildCategory(null);
        }}
        className="flex items-center hover:text-neutral-900 transition-colors whitespace-nowrap"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Ana Sayfa</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />

      <button
        onClick={() => {
          onSelectSubcategory(null);
          onSelectChildCategory(null);
        }}
        className={`hover:text-neutral-900 transition-colors whitespace-nowrap ${
          !activeSubcategory ? 'font-semibold text-neutral-900' : ''
        }`}
      >
        {currentCategory.name}
      </button>

      {activeSubcategory && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <button
            onClick={() => onSelectChildCategory(null)}
            className={`hover:text-neutral-900 transition-colors whitespace-nowrap ${
              !activeChildCategoryName ? 'font-semibold text-neutral-900' : ''
            }`}
          >
            {activeSubcategory.name}
          </button>
        </>
      )}

      {activeChildCategoryName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="font-semibold text-neutral-900 whitespace-nowrap">
            {activeChildCategoryName}
          </span>
        </>
      )}
    </nav>
  );
};
