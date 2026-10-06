import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  subcategoryName: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  subcategoryName
}) => {
  const [imageError, setImageError] = React.useState(false);

  const formattedPrice = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        maximumFractionDigits: 0
      }).format(product.originalPrice)
    : null;

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-neutral-200/90 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200 h-full">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-neutral-100 text-neutral-400">
            <span className="text-xs font-medium">{product.brand}</span>
          </div>
        )}

        {/* Subtle Tag */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-neutral-900/90 text-white text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded backdrop-blur-xs">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory Line */}
          <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
            <span className="font-semibold text-neutral-700 uppercase tracking-wider text-[10px] sm:text-[11px]">
              {product.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate text-[10px] sm:text-[11px]">{subcategoryName}</span>
          </div>

          {/* Product Title */}
          <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug group-hover:text-neutral-800 transition-colors">
            {product.name}
          </h4>

          {/* Technical Specs Summary (visible on sm screens for clean mobile cards) */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-2 pt-2 border-t border-neutral-100 hidden sm:block space-y-1">
              {product.specs.slice(0, 2).map((spec, i) => (
                <div key={i} className="text-[11px] flex justify-between text-neutral-500">
                  <span className="truncate">{spec.label}:</span>
                  <span className="font-medium text-neutral-800 text-right truncate ml-1">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Rating & Stock Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-2 text-[10px] sm:text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
              <span className="font-semibold text-neutral-800 tabular-nums font-mono">
                {product.rating}
              </span>
              <span className="text-neutral-400 ml-0.5">
                ({product.reviewsCount})
              </span>
            </div>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            {product.inStock ? (
              <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 inline shrink-0" />
                <span>Stokta</span>
              </span>
            ) : (
              <span className="text-neutral-400">Tükendi</span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div className="flex flex-col">
            {formattedOriginalPrice && (
              <span className="text-[10px] text-neutral-400 line-through tabular-nums font-mono">
                {formattedOriginalPrice}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-neutral-900 tabular-nums font-mono">
              {formattedPrice}
            </span>
          </div>

          <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium truncate">
            {product.warranty.replace(' Türkiye Garantili', '')}
          </span>
        </div>
      </div>
    </div>
  );
};
