import React, { useState, useMemo } from 'react';
import { 
  MAIN_CATEGORIES, 
  PRODUCTS 
} from './data/categoriesData';
import { 
  MainCategory, 
  Subcategory, 
  Product, 
  FilterState 
} from './types';
import { Breadcrumbs } from './components/Breadcrumbs';
import { CategoryHero } from './components/CategoryHero';
import { SubcategoryGrid } from './components/SubcategoryGrid';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { SubcategoryGuideModal } from './components/SubcategoryGuideModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  List, 
  X, 
  ArrowUpDown, 
  Lightbulb, 
  HelpCircle,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Main Category & Subcategory Selection
  const [currentMainCategoryId, setCurrentMainCategoryId] = useState<string>('elektronik');
  
  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    selectedSubcategory: null,
    selectedChildCategory: null,
    selectedBrands: [],
    minPrice: 0,
    maxPrice: 150000,
    onlyInStock: false,
    onlyDiscounted: false,
    minRating: 0,
    searchQuery: '',
    sortBy: 'recommended'
  });

  // UI States
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Current category data
  const currentCategory = useMemo(() => {
    return MAIN_CATEGORIES.find(c => c.id === currentMainCategoryId) || MAIN_CATEGORIES[0];
  }, [currentMainCategoryId]);

  // Current active subcategory
  const activeSubcategory = useMemo(() => {
    if (!filters.selectedSubcategory) return null;
    return currentCategory.subcategories.find(s => s.id === filters.selectedSubcategory) || null;
  }, [currentCategory, filters.selectedSubcategory]);

  // Child category name if active
  const activeChildCategoryName = useMemo(() => {
    if (!activeSubcategory || !filters.selectedChildCategory) return null;
    const child = activeSubcategory.childCategories.find(c => c.id === filters.selectedChildCategory);
    return child ? child.name : null;
  }, [activeSubcategory, filters.selectedChildCategory]);

  // Available brands in the category
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    PRODUCTS.filter(p => p.mainCategoryId === currentCategory.id).forEach(p => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [currentCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Main category check
      if (prod.mainCategoryId !== currentCategory.id) return false;

      // Subcategory check
      if (filters.selectedSubcategory && prod.subcategoryId !== filters.selectedSubcategory) {
        return false;
      }

      // Child subcategory check
      if (filters.selectedChildCategory && prod.childCategoryId !== filters.selectedChildCategory) {
        return false;
      }

      // Search query (across name, brand, subcategory)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const subcat = currentCategory.subcategories.find(s => s.id === prod.subcategoryId);
        const matchesSubcat = subcat ? subcat.name.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesBrand && !matchesSubcat) return false;
      }

      // Brands
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(prod.brand)) {
        return false;
      }

      // Price
      if (prod.price < filters.minPrice || prod.price > filters.maxPrice) {
        return false;
      }

      // Stock
      if (filters.onlyInStock && !prod.inStock) {
        return false;
      }

      // Discounted
      if (filters.onlyDiscounted && (!prod.originalPrice || prod.originalPrice <= prod.price)) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && prod.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return b.reviewsCount - a.reviewsCount;
        default:
          return 0;
      }
    });
  }, [currentCategory, filters]);

  // Handlers
  const handleSelectSubcategory = (subcatId: string | null) => {
    setFilters(prev => ({
      ...prev,
      selectedSubcategory: subcatId,
      selectedChildCategory: null
    }));
  };

  const handleSelectChildCategory = (subcatId: string, childId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedSubcategory: subcatId,
      selectedChildCategory: childId
    }));
  };

  const handleFilterUpdate = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      selectedSubcategory: null,
      selectedChildCategory: null,
      selectedBrands: [],
      minPrice: 0,
      maxPrice: 150000,
      onlyInStock: false,
      onlyDiscounted: false,
      minRating: 0,
      searchQuery: '',
      sortBy: 'recommended'
    });
  };

  // Active filter count for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.selectedSubcategory) count++;
    if (filters.selectedChildCategory) count++;
    if (filters.selectedBrands.length > 0) count += filters.selectedBrands.length;
    if (filters.minPrice > 0 || filters.maxPrice < 150000) count++;
    if (filters.onlyInStock) count++;
    if (filters.onlyDiscounted) count++;
    if (filters.minRating > 0) count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col text-neutral-900">
      {/* Top Search & Navigation Toolbar */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            currentCategory={currentCategory}
            activeSubcategory={activeSubcategory}
            activeChildCategoryName={activeChildCategoryName}
            onSelectSubcategory={handleSelectSubcategory}
            onSelectChildCategory={(childId) => handleFilterUpdate({ selectedChildCategory: childId })}
          />

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleFilterUpdate({ searchQuery: e.target.value })}
              placeholder="Alt kategori veya ürün ara..."
              className="w-full bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white border border-neutral-200 rounded-lg pl-8 pr-8 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleFilterUpdate({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Category & Subcategory Hero Banner */}
        <CategoryHero
          currentCategory={currentCategory}
          activeSubcategory={activeSubcategory}
          totalProductsCount={PRODUCTS.filter(p => p.mainCategoryId === currentCategory.id).length}
          onSelectSubcategory={handleSelectSubcategory}
          onOpenGuide={() => setIsGuideOpen(true)}
          onToggleFiltersMobile={() => setIsMobileFilterOpen(true)}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Visual Subcategories Showcase (Vitrini) */}
        <SubcategoryGrid
          subcategories={currentCategory.subcategories}
          selectedSubcategoryId={filters.selectedSubcategory}
          onSelectSubcategory={handleSelectSubcategory}
          onSelectChildCategory={handleSelectChildCategory}
        />

        {/* Selected Subcategory Context Strip (if a subcategory is selected) */}
        {activeSubcategory && (
          <div className="mb-8 p-4 sm:p-5 bg-white rounded-xl border border-neutral-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Seçili Alt Kategori:
                </span>
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  {activeSubcategory.name}
                </h3>
              </div>
              {activeSubcategory.buyingGuide && (
                <p className="text-xs text-neutral-600 flex items-start gap-1.5 max-w-3xl">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span><strong>Satın Alma İpucu:</strong> {activeSubcategory.buyingGuide}</span>
                </p>
              )}
            </div>

            {/* Child categories tabs */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleFilterUpdate({ selectedChildCategory: null })}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  filters.selectedChildCategory === null
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Tüm Modeller
              </button>

              {activeSubcategory.childCategories.map(child => (
                <button
                  key={child.id}
                  onClick={() => handleFilterUpdate({
                    selectedChildCategory: filters.selectedChildCategory === child.id ? null : child.id
                  })}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                    filters.selectedChildCategory === child.id
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {child.name} ({child.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Catalog Area with Filter Sidebar */}
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            subcategories={currentCategory.subcategories}
            filters={filters}
            onFilterChange={handleFilterUpdate}
            onResetFilters={handleResetFilters}
            availableBrands={availableBrands}
            maxPossiblePrice={150000}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Product Listing Main Column */}
          <div className="flex-1 min-w-0">
            {/* Top Toolbar: Active Filters, Product Count, View Mode, Sorting */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200/90 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-900 font-heading">
                  {activeSubcategory ? activeSubcategory.name : 'Tüm Ürünler'}
                </span>
                <span className="text-xs text-neutral-400 tabular-nums font-mono">
                  ({filteredProducts.length} model listeleniyor)
                </span>
              </div>

              {/* Controls: Sorting & View Mode */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterUpdate({ sortBy: e.target.value as FilterState['sortBy'] })}
                    className="bg-neutral-100 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 font-medium"
                  >
                    <option value="recommended">Önerilen Sıralama</option>
                    <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                    <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                    <option value="rating-desc">En Yüksek Puanlılar</option>
                    <option value="newest">En Çok İncelenenler</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-100 p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                    title="Izgara Görünümü"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                    title="Liste Görünümü"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Bar */}
            {activeFiltersCount > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-500 text-[11px] font-semibold uppercase tracking-wider">
                  Etkin Filtreler:
                </span>

                {filters.selectedSubcategory && (
                  <button
                    onClick={() => handleSelectSubcategory(null)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium transition-colors"
                  >
                    <span>Alt Kategori: {activeSubcategory?.name}</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                )}

                {filters.selectedChildCategory && (
                  <button
                    onClick={() => handleFilterUpdate({ selectedChildCategory: null })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium transition-colors"
                  >
                    <span>Mikro: {activeChildCategoryName}</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                )}

                {filters.selectedBrands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => handleFilterUpdate({
                      selectedBrands: filters.selectedBrands.filter(b => b !== brand)
                    })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium transition-colors"
                  >
                    <span>{brand}</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                ))}

                {filters.onlyInStock && (
                  <button
                    onClick={() => handleFilterUpdate({ onlyInStock: false })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium transition-colors"
                  >
                    <span>Sadece Stoktakiler</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                )}

                {filters.onlyDiscounted && (
                  <button
                    onClick={() => handleFilterUpdate({ onlyDiscounted: false })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium transition-colors"
                  >
                    <span>İndirimdekiler</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                )}

                {filters.searchQuery && (
                  <button
                    onClick={() => handleFilterUpdate({ searchQuery: '' })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium transition-colors"
                  >
                    <span>Arama: "{filters.searchQuery}"</span>
                    <X className="w-3 h-3 text-neutral-500" />
                  </button>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2 ml-1"
                >
                  Tümünü Temizle
                </button>
              </div>
            )}

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-12 text-center">
                <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-neutral-900 mb-1 font-heading">
                  Eşleşen Ürün Bulunamadı
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-5 leading-relaxed">
                  Seçtiğiniz filtre kriterlerine uygun cihaz bulunamadı. Filtreleri genişleterek veya sıfırlayarak kataloğu inceleyebilirsiniz.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <motion.div layout className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => {
                    const subcat = currentCategory.subcategories.find(s => s.id === product.subcategoryId);
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{
                          layout: { type: 'spring', stiffness: 350, damping: 28 },
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 }
                        }}
                      >
                        <ProductCard
                          product={product}
                          subcategoryName={subcat ? subcat.name : ''}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* List View Mode */
              <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => {
                    const subcat = currentCategory.subcategories.find(s => s.id === product.subcategoryId);
                    const formattedPrice = new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                      maximumFractionDigits: 0
                    }).format(product.price);

                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          layout: { type: 'spring', stiffness: 350, damping: 28 },
                          opacity: { duration: 0.2 }
                        }}
                        className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl border border-neutral-200/90 p-4 hover:border-neutral-300 hover:shadow-sm transition-shadow gap-4"
                      >
                        <div className="w-full sm:w-44 aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                              <span className="font-bold text-neutral-800 text-[11px] uppercase">
                                {product.brand}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{subcat?.name}</span>
                            </div>

                            <h4 className="text-base font-bold text-neutral-900 font-heading">
                              {product.name}
                            </h4>

                            <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                              {product.description}
                            </p>

                            {/* Inline specs */}
                            {product.specs && (
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-neutral-600">
                                {product.specs.slice(0, 3).map((spec, i) => (
                                  <span key={i}>
                                    <strong className="text-neutral-800">{spec.label}:</strong> {spec.value}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-100">
                            <div>
                              <span className="text-lg font-bold text-neutral-900 tabular-nums font-mono">
                                {formattedPrice}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              {product.inStock ? (
                                <span className="text-emerald-700 font-medium flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Stokta</span>
                                </span>
                              ) : (
                                <span className="text-neutral-400">Tükendi</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Guide Modal only */}
      <SubcategoryGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        subcategories={currentCategory.subcategories}
        onSelectSubcategory={handleSelectSubcategory}
      />
    </div>
  );
}
