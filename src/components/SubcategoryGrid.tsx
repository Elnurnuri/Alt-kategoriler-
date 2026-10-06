import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Subcategory } from '../types';

interface SubcategoryGridProps {
  subcategories: Subcategory[];
  selectedSubcategoryId: string | null;
  onSelectSubcategory: (id: string | null) => void;
  onSelectChildCategory: (subcatId: string, childId: string) => void;
}

export const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({
  subcategories,
  selectedSubcategoryId,
  onSelectSubcategory,
  onSelectChildCategory
}) => {
  return (
    <section className="mb-10 sm:mb-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 tracking-tight font-heading">
            Alt Kategorileri Keşfedin
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 sm:mt-1">
            İhtiyacınıza uygun teknoloji grubunu seçerek modelleri ve özellikleri filtreleyin.
          </p>
        </div>

        {selectedSubcategoryId && (
          <button
            onClick={() => onSelectSubcategory(null)}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline underline-offset-4 transition-colors whitespace-nowrap ml-2"
          >
            Tümünü Göster
          </button>
        )}
      </div>

      {/* Grid of Subcategories: 2 columns on mobile, up to 4 on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
        {subcategories.map((subcat) => {
          const isSelected = selectedSubcategoryId === subcat.id;

          return (
            <div
              key={subcat.id}
              className={`group flex flex-col rounded-xl overflow-hidden bg-white border transition-all duration-200 ${
                isSelected
                  ? 'border-neutral-900 ring-2 ring-neutral-900 shadow-md'
                  : 'border-neutral-200/90 hover:border-neutral-300 hover:shadow-sm'
              }`}
            >
              {/* Image Container (4:3 ratio) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={subcat.image}
                  alt={subcat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Count Tag */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-neutral-950/80 backdrop-blur-xs text-white px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium font-mono tabular-nums">
                  {subcat.itemCount} Ürün
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white text-neutral-950 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="hidden sm:inline">Seçili</span>
                  </div>
                )}
              </div>

              {/* Subcategory Details */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-base font-bold text-neutral-900 group-hover:text-neutral-800 transition-colors font-heading line-clamp-1 sm:line-clamp-none">
                    {subcat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed hidden sm:block">
                    {subcat.description}
                  </p>

                  {/* Micro child categories pills/links */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-neutral-100">
                    <div className="flex flex-wrap gap-1">
                      {subcat.childCategories.slice(0, 2).map((child) => (
                        <button
                          key={child.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectChildCategory(subcat.id, child.id);
                          }}
                          className="text-[10px] sm:text-[11px] text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 px-1.5 py-0.5 rounded transition-colors text-left truncate max-w-full"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Popular Brands and Selection Action */}
                <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 truncate max-w-[80px] sm:max-w-[120px]">
                    {subcat.popularBrands.slice(0, 2).join(', ')}
                  </span>

                  <button
                    onClick={() => onSelectSubcategory(isSelected ? null : subcat.id)}
                    className={`inline-flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs font-semibold transition-colors py-1 px-2 sm:px-2.5 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    <span>{isSelected ? 'Kaldır' : 'İncele'}</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
