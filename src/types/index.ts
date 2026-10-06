export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
  featured?: boolean;
  childCategories: {
    id: string;
    name: string;
    count: number;
  }[];
  popularBrands: string[];
  bannerHighlight?: string;
  buyingGuide?: string;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  iconName: string;
  heroImage: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  mainCategoryId: string;
  subcategoryId: string;
  childCategoryId?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badge?: string;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  description: string;
  warranty: string;
}

export interface FilterState {
  selectedSubcategory: string | null;
  selectedChildCategory: string | null;
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  onlyDiscounted: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';
}

export interface CartItem {
  product: Product;
  quantity: number;
}
