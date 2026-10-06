import React from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  Check, 
  Star 
} from 'lucide-react';
import { Subcategory, FilterState } from '../types';

interface FilterSidebarProps {
  subcategories: Subcategory[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableBrands: string[];
  maxPossiblePrice: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  subcategories,
  filters,
  onFilterChange,
  onResetFilters,
  availableBrands,
  maxPossiblePrice,
  isOpenMobile,
  onCloseMobile
}) => {
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    'bilgisayar-laptop': true,
    'ses-kulaklik': true,
    'akilli-saat': true,
    'fotograf-kamera': true
  });

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBrand = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const newBrands = isSelected
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    onFilterChange({ selectedBrands: newBrands });
  };

  const handleSubcategoryClick = (subcatId: string) => {
    if (filters.selectedSubcategory === subcatId) {
      onFilterChange({ selectedSubcategory: null, selectedChildCategory: null });
    } else {
      onFilterChange({ selectedSubcategory: subcatId, selectedChildCategory: null });
    }
  };

  const handleChildCategoryClick = (subcatId: string, childId: string) => {
    if (filters.selectedChildCategory === childId) {
      onFilterChange({ selectedChildCategory: null });
    } else {
      onFilterChange({ selectedSubcategory: subcatId, selectedChildCategory: childId });
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
          <h3 className="text-sm font-bold text-neutral-900 font-heading">Filtreler</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
          title="Filtreleri Temizle"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* 1. Hiyerarşik Kategori & Alt Kategori Ağacı */}
      <div>
        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
          Alt Kategori Ağacı
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ selectedSubcategory: null, selectedChildCategory: null })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              filters.selectedSubcategory === null
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>Tüm Alt Kategoriler</span>
            <span className={`text-[10px] tabular-nums font-mono ${filters.selectedSubcategory === null ? 'text-neutral-300' : 'text-neutral-400'}`}>
              Hepsi
            </span>
          </button>

          {subcategories.map((subcat) => {
            const isSubSelected = filters.selectedSubcategory === subcat.id;
            const isExpanded = !!expandedCategories[subcat.id];

            return (
              <div key={subcat.id} className="pt-1">
                <div
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    isSubSelected && !filters.selectedChildCategory
                      ? 'bg-neutral-100 font-semibold text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <button
                    onClick={() => handleSubcategoryClick(subcat.id)}
                    className="flex-1 text-left truncate flex items-center gap-1.5"
                  >
                    <span className="truncate">{subcat.name}</span>
                    <span className="text-[10px] text-neutral-400 tabular-nums font-mono shrink-0">
                      ({subcat.itemCount})
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategoryExpand(subcat.id);
                    }}
                    className="p-1 text-neutral-400 hover:text-neutral-900"
                    aria-label="Genişlet"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Level 3 Micro Categories */}
                {isExpanded && (
                  <div className="ml-3 pl-2.5 my-1 space-y-0.5 border-l border-neutral-200">
                    {subcat.childCategories.map((child) => {
                      const isChildSelected = filters.selectedChildCategory === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => handleChildCategoryClick(subcat.id, child.id)}
                          className={`w-full text-left px-2 py-1 rounded text-[11px] transition-colors flex items-center justify-between ${
                            isChildSelected
                              ? 'bg-neutral-900 text-white font-medium'
                              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                          }`}
                        >
                          <span className="truncate">{child.name}</span>
                          <span className={`text-[10px] tabular-nums font-mono ${isChildSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {child.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Fiyat Aralığı */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
          Fiyat Aralığı (₺)
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <span className="text-[10px] text-neutral-400 block mb-0.5">En Az</span>
              <input
                type="number"
                min={0}
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: Math.max(0, Number(e.target.value)) })}
                className="w-full text-xs px-2.5 py-1.5 bg-neutral-100 border border-neutral-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums font-mono"
              />
            </div>
            <span className="text-neutral-400 mt-3">-</span>
            <div className="flex-1">
              <span className="text-[10px] text-neutral-400 block mb-0.5">En Çok</span>
              <input
                type="number"
                min={filters.minPrice}
                max={maxPossiblePrice}
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Math.min(maxPossiblePrice, Number(e.target.value)) })}
                className="w-full text-xs px-2.5 py-1.5 bg-neutral-100 border border-neutral-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums font-mono"
              />
            </div>
          </div>

          {/* Quick preset price buttons */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ minPrice: 0, maxPrice: 30000 })}
              className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            >
              &lt; 30.000 ₺
            </button>
            <button
              onClick={() => onFilterChange({ minPrice: 30000, maxPrice: 80000 })}
              className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            >
              30K - 80K ₺
            </button>
            <button
              onClick={() => onFilterChange({ minPrice: 80000, maxPrice: maxPossiblePrice })}
              className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            >
              80K+ ₺
            </button>
          </div>
        </div>
      </div>

      {/* 3. Marka Seçimi */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
          Markalar
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center justify-between text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer py-0.5 select-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => toggleBrand(brand)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-neutral-900 border-neutral-900 text-white'
                        : 'border-neutral-300 bg-white hover:border-neutral-400'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span onClick={() => toggleBrand(brand)}>{brand}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Durum & Kampanya Seçenekleri */}
      <div className="pt-4 border-t border-neutral-200 space-y-2.5">
        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
          Stok & Avantaj
        </h4>

        <label className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer select-none">
          <span>Yalnızca Stoktakiler</span>
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onFilterChange({ onlyInStock: e.target.checked })}
            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer select-none">
          <span>İndirimli Fırsatlar</span>
          <input
            type="checkbox"
            checked={filters.onlyDiscounted}
            onChange={(e) => onFilterChange({ onlyDiscounted: e.target.checked })}
            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-4 h-4"
          />
        </label>
      </div>

      {/* 5. Müşteri Puanı */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
          Minimum Puan
        </h4>
        <div className="flex items-center gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              onClick={() => onFilterChange({ minRating: rating })}
              className={`flex-1 py-1 px-1 rounded text-xs font-medium text-center transition-colors flex items-center justify-center gap-0.5 ${
                filters.minRating === rating
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {rating === 0 ? (
                'Tümü'
              ) : (
                <>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                  <span>{rating}+</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-5 rounded-xl border border-neutral-200/90 shadow-xs self-start sticky top-20">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
              <h3 className="font-bold text-neutral-900 font-heading">Katalog Filtreleri</h3>
              <button
                onClick={onCloseMobile}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <button
                onClick={onCloseMobile}
                className="w-full py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Sonuçları Uygula
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
