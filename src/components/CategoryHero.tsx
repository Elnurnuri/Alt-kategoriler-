import React from 'react';
import { Layers, SlidersHorizontal, BookOpen, Check } from 'lucide-react';
import { MainCategory, Subcategory } from '../types';

interface CategoryHeroProps {
  currentCategory: MainCategory;
  activeSubcategory: Subcategory | null;
  totalProductsCount: number;
  onSelectSubcategory: (id: string | null) => void;
  onOpenGuide: () => void;
  onToggleFiltersMobile: () => void;
  activeFiltersCount: number;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  currentCategory,
  activeSubcategory,
  totalProductsCount,
  onSelectSubcategory,
  onOpenGuide,
  onToggleFiltersMobile,
  activeFiltersCount
}) => {
  const currentImage = activeSubcategory ? activeSubcategory.image : currentCategory.heroImage;
  const currentTitle = activeSubcategory ? activeSubcategory.name : currentCategory.name;
  const currentDesc = activeSubcategory ? activeSubcategory.description : currentCategory.tagline;

  return (
    <div className="relative overflow-hidden rounded-xl bg-neutral-900 text-white mb-6 shadow-xs">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentImage}
          alt={currentTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-neutral-950/45" />
      </div>

      {/* Content Container (Compact Padding) */}
      <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-5 max-w-4xl">
        {/* Editorial Eyebrow & Metadata */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-300 mb-1.5 tracking-wide uppercase">
          <span>{currentCategory.name}</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>{currentCategory.subcategories.length} Alt Kategori</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span className="tabular-nums font-mono">{totalProductsCount} Ürün</span>
        </div>

        {/* Headline */}
        <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1 font-heading">
          {currentTitle}
        </h1>

        {/* Description (Compact line clamp) */}
        <p className="text-xs sm:text-sm text-neutral-200/90 max-w-2xl leading-relaxed mb-3 line-clamp-1 sm:line-clamp-2">
          {currentDesc}
        </p>

        {/* Quick Subcategory Switcher Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
          <span className="text-[11px] text-neutral-400 font-medium mr-0.5 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Hızlı Geçiş:
          </span>

          <button
            onClick={() => onSelectSubcategory(null)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeSubcategory === null
                ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Tümü ({currentCategory.subcategories.length})
          </button>

          {currentCategory.subcategories.map((subcat) => {
            const isSelected = activeSubcategory?.id === subcat.id;
            return (
              <button
                key={subcat.id}
                onClick={() => onSelectSubcategory(subcat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 text-emerald-600" />}
                <span>{subcat.name}</span>
                <span className={`text-[9px] tabular-nums font-mono opacity-80 ${isSelected ? 'text-neutral-500' : 'text-neutral-300'}`}>
                  {subcat.itemCount}
                </span>
              </button>
            );
          })}

          {/* Guide Trigger Button */}
          <button
            onClick={onOpenGuide}
            className="ml-auto hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-medium transition-colors border border-emerald-500/30"
          >
            <BookOpen className="w-3 h-3" />
            <span>Kategori Rehberi</span>
          </button>
        </div>

        {/* Mobile Filter Button */}
        <div className="mt-2.5 flex sm:hidden items-center justify-between gap-1.5">
          <button
            onClick={onToggleFiltersMobile}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-white text-neutral-900 rounded-md text-xs font-semibold"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filtrele {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
          </button>
          <button
            onClick={onOpenGuide}
            className="py-1.5 px-2.5 bg-white/20 text-white rounded-md text-xs font-medium"
          >
            Rehber
          </button>
        </div>
      </div>
    </div>
  );
};
